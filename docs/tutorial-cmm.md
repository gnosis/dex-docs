---
id: tutorial-cmm
title: Set up the custom market maker
sidebar_label: Overview
---

Before getting started, make sure you have familiarized yourself with the Gnosis Protocol [introduction](https://docs.gnosis.io/protocol/docs/introduction1).

This tutorial explains how to use the Custom Market Maker (CMM), which allows you to set multiple limit orders at custom price brackets and passively provide liquidity on Gnosis Protocol. For more background on the CMM and frequently asked questions, please consult the [custom market maker introduction](/protocol/docs/intro-cmm).

The CMM deploys several "brackets" (Gnosis Safe contracts), which hold and trade two tokens `(token_1, token_2)` against each other on Gnosis Protocol. They are called brackets, as their orders are opening and closing like brackets: one order is selling `token_1` for `token_2` for a certain price, while the second order is buying `token_1` for `token_2` at a slightly lower rate. If the price moves such that both orders are traded one after the other, the CMM liquidity provider earns the spread of their orders.

This concept is well explained in the introductory documentation for the [custom market maker](/protocol/docs/intro-cmm). As mentioned above, please have read this introduction before proceeding with this tutorial.

This tutorial will cover the following steps:

1. Prerequisites
2. Setting up a MASTER_SAFE
3. Liquidity provision
4. Withdrawing liquidity

If you have any questions, don't hesitate to join our [Gnosis Discord community chat](https://chat.gnosis.io/).

_This tutorial is for informational purposes only. It is not a risk assessment, nor investment advice! It is not intended to substitute for the advice of licensed professionals. Gnosis believes that the information is accurate as of the date of publication. No warranty of accuracy is given, and no liability for any error or omission is accepted by Gnosis Ltd. and/or its affiliates._

## Prerequisites

This tutorial uses mainly two tools: the normal Truffle scripts to build sophisticated and bundled Ethereum transactions and the Gnosis Safe Multisig interface to sign most of these transactions. Using the Gnosis Safe Multisig, we will generate a MASTER_SAFE, which will own all other accounts required for the CMM and have full control over the funds involved in the CMM strategy.

The prerequisites to this tutorial are:

1.  Have a _proposer-account_: You should generate a new Ethereum account via your preferred tool (e.g. MetaMask) and fund this account with a small amount of ether. 0.2 ETH should suffice.
    This account will be used for two tasks: firstly to deploy new proxy-contracts and secondly, to propose transactions to the Gnosis Safe interface.

2.  Have a _signer-account_: You should have one designated signer Ethereum account. This account can be an already existing account; most people would likely prefer to use their usual MetaMask account. This signer-account will be added as an owner to your MASTER_SAFE and you will sign and execute transactions with it.

3.  Tokens: You should have the tokens you would like to deposit into the CMM strategy ready.

4.  Token listing: Once you have decided for a token pair for which to provide liquidity, you need to make sure that both tokens are already listed on the exchange. For Mainnet, an overview of the currently listed tokens is provided on the [Dune Analytics dashboard](https://explore.duneanalytics.com/public/dashboards/ZGPuC2oB9yainys924GW6G280Pmaq0HBB7sk7ABP) in the table "Listed tokens." For Rinkeby, take a look at the section below [Getting the index of tokens](###Getting-the-index-of-your-tokens). Gnosis Protocol token listing is a permissionless process, and there is a tutorial available to learn how to list tokens [here](https://docs.gnosis.io/protocol/docs/addtoken1/).

5.  Install [git](https://git-scm.com/), [yarn](https://yarnpkg.com/), [npm](https://www.npmjs.com/) and [node](https://nodejs.org/en/).

## Setting up a MASTER_SAFE

In the upcoming sections, all scripts are executed on Rinkeby only.

In order to perform the same steps on Mainnet, you need to do some simple modifications. For example, you would want to go to [https://gnosis-safe.io/](https://gnosis-safe.io/) instead of [https://rinkeby.gnosis-safe.io/](https://rinkeby.gnosis-safe.io/).

First, we will setup a new Gnosis Safe Multisig account. This account is needed to bundle a lot of Ethereum transactions into two, in order to simplify the whole setup process and save gas costs.

1. Visit: https://rinkeby.gnosis-safe.io/ and sign into MetaMask with your "signer account."

![Gnosis Safe interface landing page](assets/tutorial_bracket_strategy-safe-start-page.png)

2. Create a new Gnosis Safe Multisig by following the steps on the display:

- Give your Safe Multisig a name: `MASTER_SAFE`
- Add a second owner, the "proposer-account"
- Set the threshold for executing transactions to 2

![Owners and confirmation](assets/tutorial_bracket_strategy_safe-setup.png)

3. Finish the setup process by signing the MetaMask transaction.

4. Now, you should see your brand new Gnosis Safe Multisig. Congrats! Send the funds you want to deposit into the CMM strategy to the Safe Multisig address.

## Liquidity Provision

Get the code of Github repo: https://github.com/gnosis/dex-liquidity-provision by running:

```ssh
cd <your preferred directory>
git clone git@github.com:gnosis/dex-liquidity-provision.git
cd dex-liquidity-provision
yarn install
yarn compile
yarn run networks-inject
```

`yarn install` will install all dependencies needed and `yarn compile` will compile the necessary contracts.
`yarn run networks-inject` ensures you are working with the correct contracts. It will inject the network addresses into your truffle builds.

You can find the core script that places orders for the basic liquidity provision strategy in the folder `scripts/complete_liquidity_provision.js`.

Before running this script, you will need to export some environment variables and prepare the parameters.

### Environment Variables

Run the following commands in your console:

```ssh
export NETWORK_NAME=rinkeby
export GAS_PRICE_GWEI=<gas price>
export MASTER_SAFE=<your safe address>
export PK=<private key of the proposer-account>
```

- The `NETWORK_NAME` should be set to "mainnet" or "rinkeby". The gas price should be set in a way that your transaction is mined in a reasonable amount of time. Check out current gas prices on [ethgasstation](https://ethgasstation.info/).
- The `MASTER_SAFE` is the Safe address from the Safe Multisig created in the previous section.
- The `PK` is the private key of your proposer account used as an owner in the Safe Multisig.
- Note that in our current setup, the proposer account's private key is not handled safely, since it's available as an environment variable and in the command line history.
- **Important: due to the above, it would be unwise to transfer more ETH than required for deployment into this account.**

### Script parameters

The script `complete_liquidity_provision` takes the following non-optional parameters:

- _masterSafe_: This is the `MASTER_SAFE` you generated and exported in the previous step. You should set the value to \$MASTER_SAFE.
- _numBrackets_: The fleet size determines how many brackets you want to deploy. This number must be less than or equal to 20.
- _baseTokenId_: You are specifying two tokens you would like to provide liquidity for, the base token and the quote token, via their indices. This is the id of the first token you want to trade. In order to determine the index, see the [following section](####-Getting-the-index-of-your-tokens).
- _quoteTokenId_: This specifies the second token you want to trade via its index. In order to determine the index, see the [following section](####-Getting-the-index-of-your-tokens).
- _depositBaseToken_: This is the cumulative sum of all baseTokens you want to deposit into all brackets.
- _depositQuoteToken_: This is the cumulative sum of all quoteTokens you want to deposit into all brackets.
- _currentPrice_: Please provide the current market price of the trading pair: [ baseToken ] / [ quoteToken ]. Your input will be checked for plausibility by the script via the price listed on dex.ag.
- _lowestLimit_: The liquidity provided will be split over the a price range of [lowestLimit, highestLimit]. Hence, the lowestLimit specifies the lowest price any bracket should trade.
- _highestLimit_: The liquidity provided will be split over the a price range of [lowestLimit, highestLimit]. Hence, the highestLimit specifies the highest price any bracket should trade.

### Getting the index of your tokens

All tokens that have been added to the Gnosis Protocol are assigned a unique index number. In order to retrieve the index number, visit the [Etherscan GP contract (Rinkeby)](https://rinkeby.etherscan.io/address/0xc576ea7bd102f7e476368a5e98fa455d1ea34de2#code) or for Mainnet, the [Etherscan GP contract (Mainnet)](https://etherscan.io/address/0x6f400810b62df8e13fded51be75ff5393eaa841f). Then, click on the tab: _Contract_ and the button "Read Contract":

![Read Etherscan contract](assets/tutorial_bracket_strategy-etherscan-read.png)

Then, go down to the 27th function: `tokenAddressToIdMap` and paste the token address of your token into the parameter field and run the query. In the following image, we used the WETH address in Rinkeby, which happens to have the index 1.

![Read tokenAddressToIdMap](assets/tutorial_bracket_strategy-tokenAddressToIdMap.png)

If your tokens have not yet been added to Gnosis Protocol, please follow this [tutorial](https://docs.gnosis.io/protocol/docs/addtoken1/) to list tokens on the protocol.

### Run the script and place your first CMM strategy

The following script will place liquidity orders for the token pair DAI-WETH on a price range [150,260] on Rinkeby. You will deposit 1000 [DAI](https://rinkeby.etherscan.io/address/0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa) and 5 [WETH](https://rinkeby.etherscan.io/address/0xc778417E063141139Fce010982780140Aa0cD5Ab).

```ssh
export NETWORK_NAME=rinkeby
export GAS_PRICE_GWEI=1
export MASTER_SAFE=<your master safe>
export PK=<the private key of the proposer account>
```

```ssh
cd dex-liquidity-provision
yarn install
yarn compile
yarn run networks-inject
npx truffle exec scripts/complete_liquidity_provision.js --baseTokenId=1 --quoteTokenId=7 --lowestLimit=150 --highestLimit=260 --currentPrice=200 --masterSafe=$MASTER_SAFE --depositBaseToken=5 --depositQuoteToken=1000 --numBrackets=20 --network=$NETWORK_NAME
```

The script will first make some plausibility checks, such as the price check mentioned above, as well as that the boundaries set (highestLimit and lowerLimit) are reasonably set for the current price.

It will then create a transaction deploying new Gnosis Safe contracts: one new Safe for each bracket. All new deployed Safe addresses will be printed on the screen.

Afterwards, the transaction containing all of the orders is built. All of the order placements are bundled into one transaction, appearing first on the Safe Multisig interface. Before you sign the transaction, make sure to check the the displayed orders from the script's output are correct.

The transaction transferring the DAI and WETH into the brackets and depositing, on their behalf, into the Gnosis Protocol trading contract is built in parallel. This is the second transaction sent to the interface.

If everything goes smoothly, you should see the two transaction initiations confirmed as such:

```ssh

==> Sending the order placing transaction to gnosis-safe interface.
    Attention: This transaction MUST be executed first!

Signing and posting multi-send transaction 0x007ecc58f9dc222c26215b260abc363e0308dfec539d7eeabb8a2c9f09397157 from proposer account 0x740a98F8f4fAe0986FB3264Fe4aaCf94ac1EE96f
Transaction awaiting execution in the interface https://rinkeby.gnosis-safe.io/app/#/safes/$MASTER_SAFE/transactions

==> Sending the funds transferring transaction, please execute this transaction second

Signing and posting multi-send transaction 0x09cb78a5a49f10305a2f108d45e8fa059e4231ebf219315c56409d67419d65fb from proposer account 0x740a98F8f4fAe0986FB3264Fe4aaCf94ac1EE96f
Transaction awaiting execution in the interface https://rinkeby.gnosis-safe.io/app/#/safes/$MASTER_SAFE/transactions
```

Now, you should just follow the link, and sign and execute the transaction with the lower transaction ID first. It should look like this:

![Read tokenAddressToIdMap](assets/tutorial_bracket_strategy_signing.png)

For executing, just press the button _confirm_.

Once this first transaction is mined, execute the second one.

Congrats! You just provided liquidity using the custom market maker, and now you have a chance to earn some passive income if the prices are moving and returning back to your initial `currentPrice`.

## Withdrawing liquidity

Withdrawing from Gnosis Protocol is always done in two steps: Requesting and Claiming.

### Withdraw request

Withdrawal requests can be made with the following command:

```ssh
npx truffle exec scripts/request_withdraw.js --masterSafe=$MASTER_SAFE --brackets=[comma-separated brackets]  --tokenIds=[comma-separated indices] --network=$NETWORK_NAME
```

The indices of the tokens that you want to withdraw from the brackets need to be specified via the flag `--tokenIds=[comma-separated indices]`. Do **not** write the square brackets into the command. Under normal usage, these are the exact same indices that were provided when setting up the CMM.
The flag `--brackets=[comma separated brackets]` must contain the brackets that the CMM deployed. Please provide these addresses separated by commas, without any spaces, and without any square brackets.

In case you don't remember them, you can run the following command:

```ssh
npx truffle exec scripts/get_deployed_brackets.js --masterSafe=$MASTER_SAFE --network=$NETWORK_NAME
```

This will display all of your previously written brackets and generate a CSV listing the brackets with more information.

By running the withdraw request script, you have generated a transaction within your Safe Multisig interface. Execute this transaction and wait (for a maximum of 5 minutes after the transaction gets mined) until Gnosis Protocol closes the current auction batch. In the next batch, you will be able to claim your funds.

### Withdrawing funds

The actual withdrawal transaction transferring the tokens back into the MASTER_SAFE from Gnosis Protocol can be initiated with the following command.

```ssh
npx truffle exec scripts/claim_withdraw.js --masterSafe=$MASTER_SAFE --brackets=[comma-separated-brackets]  --tokenIds=[indices] --network=$NETWORK_NAME
```

The parameters are the same as for the requesting withdrawal script above.
The script `claim_withdraw.js` will not withdraw any funds if run before requesting a withdrawal.

## Useful links

- [Readme of scripts](https://github.com/gnosis/dex-liquidity-provision/blob/master/scripts/README.md)
- [Etherscan verified Mainnet OWL token contract](https://etherscan.io/token/0x1a5f9352af8af974bfc03399e3767df6370d82e4)
