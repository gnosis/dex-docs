---
id: smartcontracts
title: Smart Contracts
sidebar_label: Smart Contracts
---

Gnosis Protocol v2 is a collection of smart contracts that settle user orders on-chain while leveraging other sources of liquidity. The goal of the protocol is bundling multiple user orders together to minimize fees deriving from using external liquidity sources and stave off miner-extractable value.

User orders are collected off-chain and settled at a later step by a solver. A solver is any of the addresses authorized to settle user orders together in GPv2. They are in charge of monitoring on-chain sources of liquidity and providing users the best on-chain prices in the case where the order cannot be matched perfectly with each other.

A settlement is a list of orders traded together, their prices, and the on-chain interactions necessary to retrieve external liquidity.

The protocol uses three smart contracts:

-   **Settlement contract:**  The entry point of GPv2. Collects and verifies user orders, interacts with on-chain liquidity, stores information on the state of the orders.

-   **Allow-list authentication contract:** Determines which addresses are solvers.

-   **Vault relayer contract:** The target of user allowances. It is called by the settlement contract to receive the funds of the orders. It is also closely integrated with the Balancer protocol and can use funds from Balancer.

Each contract is described in more detail in its own section.

## Allow-list authenticator

The allow-list authenticator contract determines which addresses are solvers. Before executing any operation which is access-restricted to a solver, the settlement contract queries this contract to determine if the caller is a solver.

The allow-list authenticator is the only contract that is deployed as a proxy.

Eventually, we plan to deploy a new proxy implementation with the goal of making the choice of who is a solver more decentralized.

For example, we might introduce the option of becoming a solver for addresses that are willing to stake some funds as collateral.

The smart contract allows a manager to add or remove solvers with an on-chain transaction. The manager can be replaced in a transaction by the proxy owner or itself. Any of these actions emit the corresponding event.

### Guarantees
   

1.  **No user funds can be touched except for settling an order that was authorized by the user**

Users allow the vault relayer to trade their tokens. However, the settlement contract can only access user funds in the process of settling an order. An order is considered valid only if the user has explicitly authorized that order. (See [how to sign an order](signature-schemes) for details on how an order is authorized for trading.)

2.  **A user cannot get a settlement price that is worse than the limit price specified in the order**

When an order is traded, users always receive at least the amount of output tokens that they would receive if they had traded at the order limit price.

3.  **Once an order is fulfilled, it cannot be traded again**

The smart contract keeps track of the filled amount of each order. If an order was traded, the filled amount is recorded. If a solver tried to settle the same order again, it would only be able to trade the amount that wasn't filled before.

## Settlement Contract
  

### Settlement

A settlement comprises a list of traded tokens with their corresponding price in the batch, a list of trades to execute, and a list of interactions.

A solver monitors the on-chain liquidity and the orders that are available for being matched for then determining the clearing prices of the settlement, which orders will be included, and which extra liquidity is necessary from the blockchain.

Normally, all orders in a settlement are settled with uniform clearing prices, which means that every user receives the same price for the same token.

If the transaction does not revert, each order will be executed during a settlement and the user will receive the desired token after the settlement.

1.  **Interactions**

Interactions allow solvers to execute arbitrary calls to any on-chain contract.

Normally, they are used to interact with other on-chain liquidity providers, for example, to make a swap call to Uniswap.

They can also be used for other purposes: for example, an interaction can be used to approve Uniswap for trading with the tokens stored in the settlement contract, as well as withdrawing the accumulating fee from the contracts when the amount becomes too large.

2.  **Trades**

Trades contain a description of the users' orders, a signature for verifying its validity, and the executed amount (for partially fillable orders).

The contract decodes the [order parameters](order-struct) from the trade.

The parameters of the order are verified for validity:

-   The signature for the order matches the user's address
-   The order is not expired
-   The order was not previously filled
-   The current prices are equal to or better than what is specified in the order

3.  **Order struct**

Here is a complete list of the parameters of a GPv2 order and the corresponding type. This is the object that a user signs to validate its order.

-   **Sell Token:** the address of the token that is sold
-   **Buy Token:** the address of the token that is bought
-   **Receiver:** the address of the address that will receive the proceedings of the trade. If this field is zero, then the user who signed the trade is going to receive the funds
-   **Sell Amount:** the amount of `sellToken` that is sold in wei
-   **Buy Amount:** the amount of `buyToken` that is bought in wei
-   **Valid To:** the timestamp (in seconds) until which the order is valid
-   **App Data:** extra information about the order. It is ignored by the smart contract outside of signature verification, but may be used offchain for information on the order's origin or for referrals
-   **Fee Amount:** the amount of fees paid in `sellToken` wei
-   **Kind:** either `sell` or `buy`
-   **Partially Fillable:** whether the order is partially fillable or fill-or-kill
-   **Sell Token Balance:** from where the sell token balance is withdrawn. It can be `erc20` (directly from the user's ERC-20 balance), `external` (from the user's ERC-20 balancer through Balancer's vault), or  `internal` (from the user's Balancer internal balance)
-   **Buy Token Balance:** to where the buy token is deposited. It can be `erc20` (directly to the user's ERC-20 balance) or  `internal` (to the user's Balancer internal balance)

### Signature Schemes

Gnosis Protocol v2 handles user orders that are provided off-chain. To verify that an order was approved by a user, the smart contract requires the user to provide a valid signature for that order.

The protocol supports four different signing methods:

**1\. EOA signatures with the [eth_sign rpc call]**(https://eth.wiki/json-rpc/API#eth_sign).

**2\. EOA signatures with [EIP-712 typed data]**(https://eips.ethereum.org/EIPS/eip-712).

**3\. Smart-contract [EIP-1271 signatures]**(https://eips.ethereum.org/EIPS/eip-1271).

**4\. Pre-signing the order with an onchain transaction from the owner of the order.**

Except for pre-authorization, all signing schemes involve signing an _order digest_ that is based on the message structure of EIP-712.

The next section describes how to build the order digest, while the following sections describe each of the four signing schemes in detail.

1.  **The domain separator**

The domain separator is a byte string that uniquely represents a single deployment of the GPv2 contracts in a particular chain.

The domain separator is different in each of the chains where GPv2 is supported. This is done to make signatures for one network (e.g., Rinkeby) invalid in different networks (e.g., mainnet), so as to avoid network replay attacks. The same is the case for different deployments of the settlement contract in the same chain.

The domain separator is defined as prescribed by the [EIP-712 standard](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator) with the following parameters:

```json

{

  name: "Gnosis Protocol",

  version: "v2",

  chainId: /* chain ID for the current network: 1 for mainnet, 4 for Rinkeby, 100 for xDai */,

  verifyingContract: /* address of the settlement contract */

}

```

The actual domain separator is the result of hashing the previous struct with [EIP-712's `hashStruct`](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct).

You can retrieve the domain separator from the contract by calling the `domainSeparator()` readonly function.

2.  **Computing the order digest**

Signatures built with the `eth_sign`, EIP-712, and EIP-1271 schemes are created based on an order digest.

The order digest is a sequence of 32 bytes that uniquely describes the parameters of an order.

It is generated by encoding all information on the user order into a single struct and hashing the result as it is described in the [EIP-712 standard](https://eips.ethereum.org/EIPS/eip-712#specification).

It can be explicitly computed as:

```

orderDigest = keccak256("\x19\x01" ‖ domainSeparator ‖ hashStruct(orderStruct))

```

The components are:

- `keccak256`, the standard unpadded Ethereum hashing function

- `"\x19\x01"`, two bytes

- `‖`, the byte-concatenation function

- `domainSeparator`, the [domain separator](the-domain-separator)

- `hashStruct`, the [identically named function in the EIP-712 standard](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct)

- `orderStruct`, the [order struct](the-order-struct)

The `hashOrder` function exported by the Node package `@gnosis.pm/gp-v2-contracts` can be used to compute the order digest without deriving each of the building blocks.

3.  **eth_sign signatures**

This signature type is the most commonly supported signing mechanism for EOAs.

The signature of an order is computed as:

```

signature = ethSign(orderDigest)

```

The components are:

- `ethSign`, using the user's private key to ECDSA-sign a message prefixed with `"\x19Ethereum signed message:\n"` and its length

- `orderDigest`, the [order digest](the-order-digest)

Most Ethereum libraries support `ethSign` signatures ([web3](https://web3py.readthedocs.io/en/stable/web3.eth.html?highlight=sign#web3.eth.Eth.sign), [ethers.io](https://docs.ethers.io/v5/api/signer/#Signer-signMessage)).

4.  **EIP-712 signatures**

This signing method, also known as typed structured data signing, is the recommended signing method for EOAs, since the user will be able to see the full order data that is being signed in most wallet implementations (notably Metamask).

The signature is computed as:

```

signature = ecdsaSign(orderDigest)

```

The components are:

- `ecdsaSign`, using the user's private key to ECDSA-sign the message

- `orderDigest`, the [order digest](the-order-digest)

Many Ethereum libraries have some degree of support for sign typed data without building the order digest by hand (for example, [web3](https://web3py.readthedocs.io/en/stable/web3.eth.html?highlight=sign_typed_data#web3.eth.Eth.sign_typed_data) and [ethers.io](<https://docs.ethers.io/v5/api/signer/#Signer-signTypedData>)).

In case, you may want to read about the [domain separator](the-domain-separator) and the [order struct](the-order-struct).

5.  **EIP-1271 signatures**

This signing mechanism is the only option that provides offline signatures to orders originating from smart contracts.

In order to support smart-contract orders, the trading smart contract must implement the [EIP-1271 interface](https://eips.ethereum.org/EIPS/eip-1271#specification).

```

signature = traderAddress ‖ eip1271Signature

```

The components are:

- `traderAddress`, the address of the smart contract that signs the order

- `‖`, the byte-concatenation function

- `eip1271Signature`, any bitstring that is a valid signature for the contract for the order

For an order to be accepted, the EIP-1271 signature must be valid for the `orderDigest` message, that is in Solidity:

```solidity

isValidSignature(orderDigest, eip1271Signature) == MAGICVALUE

```

You can see [here](order-digest) how the order digest is defined.

6. **Pre-sign**

This is the only signing method that supports both EOA and smart-contract traders.

The signature is simply the 20-bit address of the trader:

```

signature = traderAddress

```

In order for a signature to be valid, the user must have pre-approved the order on-chain.

To do that, the trader must be the sender of an on-chain call to the settlement-contract function `setPreSignature` on input the order uid of the order that needs to be signed. See here for information on how to compute the [order uid](order-uid).

Note that if an order was already filled, then presigning it does _not_ make it tradable again.

## Vault relayer

The Vault relayer contract is an important component used to protect user funds from malicious solvers. As previously mentioned, the settlement contract allows using arbitrary on-chain liquidity through interactions (such as performing a swap on Balancer V2, or performing a Paraswap trade). If Vault and ERC20 allowances were made directly to a settlement contract, a malicious solver could drain user funds through the interaction mechanism. However, since these allowances are made to the Vault relayer contract and interactions to the contract are strictly forbidden, malicious solvers have no direct access to user funds. The settlement contract uses the vault relayer to withdraw user tokens only as part of the trade, which contains strong guarantees that the user's signed order parameters are respected.

The Vault relayer has access to user balancers through 3 mechanisms:

1.  Balancer External Balances

2.  Balancer Internal Balances

3.  Fallback ERC20 Allowances

Let's explore each way more deeply

### Balancer External Balances

The first mechanism that the Vault relayer contract can use to withdraw user ERC20 tokens is through Vault external balances. This works by having an ERC20 allowance for the Balancer Vault, and a relayer approval for the Vault relayer contract.

This allowance and approval combination allows the Vault relayer contract to transfer ERC20 tokens through the Vault. Roughly speaking, the process works in the following way:

1.  Vault relayer request to the Balancer Vault an ERC20 transfer from the user account to the Settlement contract

2.  The Balancer Vault verifies that the vault relayer contract is:

	a.  Authorized by Balancer governance to act as a relayer

	b.  The user has set an approval for that specific relayer

4.  The Balancer Vault issues an ERC20 transfer from the user account to the Settlement contract using the Vault's existing ERC20 allowance

This system for withdrawing user funds has several advantages such as :

-   It can reuse existing Vault ERC20 allowances and doesn't require new ones specific for Gnosis Protocol v2.

-   Upgrades to the Gnosis Protocol v2 contract would only require a single relayer approval for all tokens instead of individual ERC20 approvals for each token being traded.

-   The Vault relayer approval can be revoked by a single transaction to the Vault instead of multiple transactions to each ERC20 token for which the user wants to remove the approval.

Orders with the sell token balance flag set to "external" will withdraw using this process.

###  Balancer Internal Balances

The second mechanism is to use balances internal to the Vault. The Balancer V2 vault can accrue ERC20 token balances and keep track of them internally in order to allow extremely gas-efficient transfers and swaps. The Gnosis Protocol v2 contracts can make use of this in order to decrease the gas cost of settling a user order on-chain. In order for this to work, the user must approve the Vault relayer contract and have internal Vault balances available.

Internal balances can be withdrawn from the Vault at any time for their ERC20 equivalent amounts.

Orders with the sell token balance flag set to "internal" will withdraw using this process. The buy token balance flag can also be set to "internal" in order to receive trade proceeds in internal balances instead of ER20 token balances.

### Fallback ERC20 Allowances


The third and final method of approving tokens for Gnosis Protocol is to use direct ERC20 allowances to the Vault relayer. This works like most other trading protocols, where for each token you want to sell, an allowance must first be approved for the Vault relayer contract.

Orders with the sell token balance flag set to "erc20" will withdraw using this process. The buy token balance flag can also be set to "erc20" in order to receive trade proceeds directly in ERC20 amounts.
