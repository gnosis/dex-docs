---
id: frontend
title: Front End
sidebar_label: Front End
---

Gnosis Protocol v2 can have different front ends, depending on the dapp you are interacting with. CowSwap is the first trading interface built on top of the protocol, followed by a soon to be launched Balancer UI.

While the front end might look familiar, the trading process is quite different from other DeFi DEXes, starting with the fact that users don’t execute a trade transaction, but rather sign an off-chain message with an intent of trading.

## Gnosis Protocol Explorer
Gnosis Protocol Explorer (GPE) is an "Etherscan" like interface for the Gnosis Protocol v2 (GPv2). Given that GPv2 leverages meta transactions, aka signed/offchain orders, the transactions submitted by the users are completely offline/off-chain and are therefore not visible on-chain until they have been fully executed. Because of it, GPE exists to help users find their orders, and be informed about the order details and their state.

Although at the moment GPE only shows single order details, in a future version it will have a bigger scope to present more information to the user, such as diverse GPV2 protocol information, markets traded, trade history, graphs, and so on.

<img src="/protocol/docs/assets/FrontEnd.png">

1.  **Order ID:**ID given to each submitted order.
2.  **From:** Ethereum address that is selling the tokens.
3.  **To:** Ethereum address that is receiving the tokens.
4. 	**Transaction Hash:** Transaction hash of the order (Note that this parameter will only be shown once the order status is "Filled".
5.  **Status:** State in which the order is at. 
6.  **Submission Time:** Time in which the order was submitted. 
7.  **Expiration Time:** Time in which the order will expire and no longer be valid.
8. 	**Type:** Type of order placed.
9.  **Amount:** Specific Amounts that are to be traded.
10. **Limit Price:** Minimum price that the protocol guarantees the user.
11. **Execution price:** Price at which the order has been executed. This value can not be lower than the limit price. 
12. **Filled:** Percentage of the order that the protocol has been able to execute. 
13. **Order Surplus:** In the event of the protocol finding a better price than the user's limit price, order surplus quantifies in percentage and tokens how much more the user got above the asked amount. 
14. **Fees:** Amount of fees that have been paid by the user.

### States


As GPE is meant to help users visualize meta transactions (signed orders), a critical parameter to show is the State of the signed order. This parameter has the following status:

-   **Open** (pending)**:** State for a standing order. Orders in this state are being considered by the solvers. It is the entry state for all orders, the default from the moment the order is placed. From here the order can transition to all other states

-   **Filled:** State for an executed/settled order. Orders in this state have been executed and the corresponding funds transferred to the target account. Orders in this state will have available a link to the corresponding Etherscan settlement transaction. This settlement transaction would contain your order's execution and any other orders that are part of the same batch.

-   **Expired:** State for orders that have not been executed. Orders in this state have not been executed during the defined expiration time (20 min by default).

-   **Cancelled:** State for orders that have been cancelled. Orders in this state have been cancelled as per user request.

### Surplus


All the Orders placed on GPv2 are limit orders behind the scenes. When a user signs an order to trade it accepts the following:

- the sell and buy tokens they want to trade,
- the minimum price they are willing to receive,
- the slippage tolerance they have,
- the fee that is taken by the protocol and,
- how long is the order valid for.

Through Batch Auctions and CoWs (Coincidence of Wants), the protocol can improve on the minimum price that has been shown to the user. That improvement is called *"Surplus"*, and it measures how much better your actual trade price was as opposed to your original limit order price.

###  Prices

As mentioned before, Gnosis Protocol v2 has the capability of offering users a better price than the limit price that they signed their orders with. Therefore, Gnosis Protocol has two different prices to take into account, these are:

-   **Limit price:** The price set when the order was placed (minus the slippage) & signed. This is the minimum price that you will receive. 
-   **Execution price:** The actual price the order was executed at. This parameter can only be equal to or better than the limit price.

### Search

In order to facilitate users searching their orders, the explorer has search functionality that allows the user to search for an order by the order id.

GPE is capable of detecting which network the order belongs to, redirecting and loading the order details for the appropriate network, given that it exists.


## CowSwap

CowSwap is the first trading interface built on top of Gnosis Protocol v2. It allows you to buy and sell tokens using gas-less orders that are settled p2p.

###  Differences between CowSwap & UniSwap


CowSwap's interface may look very familiar to the average DeFi user, as it's based on the Open Source code used for building the Uniswap front end. Although it looks similar, there are huge differences between the two products, which are:

-   Uniswap uses only Uniswap pools; CowSwap can settle orders on Uniswap, Sushiswap, 1inch, Paraswap and more to come (Matcha, Balancer...) giving users the best price

-   CowSwap enables users to trade directly with other users without going through any pools when there is Coincidence of Wants (CoWs), removing the need to pay Liquidity Provider fees.

-   Orders on CowSwap are signed messages and therefore gasless, costing nothing to submit. In case of price movements against your order, in the worst case, the order will expire and you won't spend gas on failed transactions, while on Uniswap you would still spend it.

### Providing liquidity


CowSwap does not have liquidity providers. Instead, it connects to all on-chain liquidity that is provided across different protocols. Since orders only incur a cost if traded, active market makers can observe the order book and place counter orders (creating a CoW) to prevent settling trades via external liquidity.

### Cancelling orders


CowSwap allows you to cancel your orders without any cost. As a user, you simply sign the order cancellation - similar to how the order placement was done - and if the solution has not been mined yet, the order will not be executed, and therefore cancelled.

### Supported wallets


CowSwap uses offline signatures to offer gasless orders, aka signed orders. The currently supported wallets by CowSwap can be grouped in the following way:

-   **EOA wallets:** Most of the most popular EOA wallets are supported. Metamask or any injected wallet (Mobile Wallet app browser) as well as wallets through WalletConnect.\
    If you have a wallet that's not working, let us know.

-   **Smart Contract wallets**: Currently, Smart Contract (SC) wallets such as Gnosis Safe, Argent or Pillar are not supported because it would require signing an on-chain transaction to place the order, making it no longer gasless. We are working to make this a possibility and support will be added soon.\
    Nevertheless, even if your wallet is not a SC wallet, it might be unsupported in some cases. Not all wallets implement the necessary signing methods from the EIP-712 standard. If that is the case for you, reach out to your wallet developers and ask for it.

### Interactions encountered when using Cowswap


Cowswap has different types of interactions that a user is capable of executing. These interactions can be separated into internal & external operations. The following table clarifies the reasons for each interaction

Internal CowSwap Operations

<img src="/protocol/docs/assets/cowswap.png">

### FAQ

Want to know more about CowSwap and how it works. Head over to its [FAQ section](https://cowswap.exchange/#/faq).
