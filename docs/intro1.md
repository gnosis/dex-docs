---
id: introduction1
title: An excursion into the dƒusion trading protocol
sidebar_label: An excursion into the dƒusion trading protocol
---
Dƒusion is a protocol which introduces a new, decentralized trading mechanism for ERC20 tokens. A core goal is to have a global permissionless liquidity pool and a fair matching engine that does not require a trusted operator while still maximizing trader welfare. This is realized through batch auctions with multi-dimensional order books and uniform clearing prices in every batch. 

In order to more closely understand how the Dƒusion protocol works, let’s take a deeper lookr into the different mechanisms and concepts involved. 

## Trades
 Let’s start with the basics. 

Dƒusion is a trading protocol for ERC20 tokens. The protocol is compatible with any ERC20 token, but only registered tokens can be traded. Token registration is permissionless and can be done by anyone. However, a spam protection fee of 10 OWL is required to register new tokens. Learn more about how to register tokens in this [tutorial](href={docUrl("introduction1")}).

To trade on dƒusion, a user can simply place an order for one token in exchange for another. An order is an instruction as to what token a user wants to sell under a given price condition, thereby defining  a limit price within the order, which indicates the absolute worst price a user will receive.  The protocol levies a fee of 0.1% on a trade, which incurs on only on executed orders/ volume. It’s important to note that fee costs are calculated as part of and already included in an order’s limit price.

In a perfect, Dfusive world, traders would place sell orders that exactly match available buy orders and vice versa. This, however, is usually not the case. Imagine we have four parties selling one token for another token: Alice wants to exchange DAI for OWL, Bob and Cary both want to exchange USDC for DAI, and Daniel OWL for USDC. Using a conventional exchange, those trades wouldn’t be filled or would likely need to go through one dominant token. In such a case, Daniel would need to make an additional trade, turning OWL into DAI, which will then enable him to trade DAI for USDC. 

<img src="/img/orders.png">

Dƒusion’s order book, however, has multiple buy and sell dimensions (hence the term multidimensional order book). The trades outlined above can be executed directly, without requiring an intermediary trade, using dƒusion. 

This means, firstly, all the sell order tokens are collected. Next, the most optimal way to satisfy all buy and sell orders will be calculated, in order to fulfill all orders (e.g. DAI to OWL, OWL to USDC, and USDC to DAI), while providing uniform clearing prices across all token pairs.   

<img src="/img/ringtrade.png">

## Trading Cycles
Let’s take a closer look at the recurring process of trading cycles.

A full trading cycle on dƒusion consists of three user actions: deposit, order, and withdrawal.  Users’ orders are matched in batches. Batches run deterministically and consecutively in 5 minute intervals. At any time, userstraders can place limit sell orders on-chain, which will to be included in the next batch(es)

### Solvers
For each batch, proposals can be submitted for settling orders in a collected batch. In Dfusion, those who submit proposals for order settlement are referred to as solvers. Anyone can become a solver by submitting a proposal for order settlement, although significant technical and computational capacity would be required for it to be in their economic interest.

Solvers’ proposals compete to provide the best order settlement for a given batch, with the term “best” meaning it satisfies pre-defined optimization criteria. As a simple overview, it can be said the best solving proposals maximize the trading volume and individual traders’ profit.

Solvers can submit valid order settlements within the first 4 minutes of every batch (each batch has 5 minute total runtime). Solvers can include any valid orders with available deposits in a batch’s order settlement. Solvers may match not only countertrades (A for B with B for A), but also ring trades such as A for B, B for C, and C for A. The more orders and tokens involved in a batch’s order settlement, the greater the calculation’s difficulty becomes. A solution contains a list of orders that should be executed and a list of clearing prices. A single solution is only allowed to settle up to 25 orders. This is because higher numbers of orders would make it significantly harder for such a transaction to be mined within the 4 minute timeframe for submitting solutions.

<img src="/img/tradingcycle.png">

## Benefits

One of the main benefits of the dfusion protocol is the interchangeability between tokens. Trading of  any token for any other token is possible and any asset can be exchanged for any other asset without the need to go through (W)ETH or another specific token. 
Another advantage is the fairer price finding in respect to other comparable DEXs. The fairer prices are due to both: greatly diminished price discrimination and significantly increased volume facilitaed by  the multi-dimensional orderbook. 
Additionally, the user experiences no further costs as the fee is already included in the limit price and no gas costs for the user for executing trades occur. 


In conclusion, the dƒusion protocol proposes a new decentralized trading mechanism which can lead to fairer prices due to both: greatly diminished price discrimination and significantly increased volume facilitaed by the multi-dimensional orderbook. Any asset can be exchanged for any other asset without the need to go through (W)ETH or another specific token. It is fully smart contract compatible, which means that other protocols can use and integrate the system.

For a more mathematical description of the dƒusion protocol please refer to following document: https://github.com/gnosis/dex-research/blob/master/dFusion/dfusion.v1.pdf



