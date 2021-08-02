---
id: intro-batches
title: Batch Auctions
sidebar_label: Batch Auctions
---
On Gnosis Protocol v2, orders are placed off-chain and are not immediately executed, but rather collected and aggregated to be settled in batches. Gnosis Protocol v2 replaces a central operator by solvers in an open competition for order matching, with the term solver referring to anyone who submits an order settlement solution for a batch. As soon as a batch is "closed for orders", meaning that it does not consider any new orders, these solvers can compete to provide optimized solutions matching the orders in this closed batch.

But, why use batch auctions as a price finding mechanism for a DEX?

The two main reasons behind our development of batch auctions for a trading mechanism are to: 

1.  Give the DeFi space in Ethereum a chance to establish the same price of any token pair in the same block. 

2.  Improve the DEX trading price offering by combining new economic mechanisms together, such as combining Uniform Clearing Prices and Coincidence of Wants. 

Even though Ethereum transactions are executed atomically all at the same time within the same block, because of AMMs’ design, trading the same tokens on the same block will not result in identical trades getting the same price. This is because the design of Constant Function Market Makers (CFMM) does not allow for trading to occur simultaneously in a block. In order for CFMM to work, it needs to process transactions in a sequential order, so that it knows what ratio of tokens are in the pool and can then execute trades with prices accordingly. Even though the block will have multiple trades of the same token pairs, each trade will obtain a different price depending on the order in which they trade against the pool. Because of this, the ordering of transactions becomes highly important, and as a consequence we have seen the rise of MEV (Miner Extractable Value) where the miners freely decide in what order the trades arrive at the pool. Therefore favoring some trades in comparison to others, and ignoring the truthful order of arrival. Batch Auctions allow trades within a batch to have the same uniform clearing price, and therefore there's no point in miners reordering the trades. With Gnosis Protocol v2 leveraging Batch Auctions, traders in Ethereum can now get the same price for the same token pairs they trade at the exact same block. 

Besides being able to establish a uniform clearing price across the trades that happen within a batch (and block), Gnosis Protocol v2 Batch Auction price finding mechanism is also designed to offer a better price that no other CFMM can offer. Liquidity fragmentation is a big problem within the DeFi space that forces users to be constantly checking what pools can give the best prices for their trades. Batch Auctions are one way to solve the liquidity fragmentation problem as they allow Gnosis Protocol v2 to offer the traders the chance to be part of a CoW (Coincidence of Wants) to share the liquidity amongst their orders, and in the event that with those orders they still not have enough liquidity, then pair the excess trades with the on-chain liquidity that can give them the best price. Essentially, the idea behind Batch Auctions and CoWs is to turn the protocol into a gigantic barter economy, where users can either trade directly against each other or go to specialized markets to execute what they couldn't barter in a peer-to-peer fashion. 

But the best thing is that batch auctions allow the protocol the ability to combine off-chain interactions (COWs) with on-chain interactions, all in the same transaction.

<img src="/protocol/docs/assets/Batch_Auctions_Overview.png">

The amount of batches the protocol executes depends on the trading frequency users choose. The shorter the expiry date of an order, the more batch auctions the protocol will conduct in order to be able to settle the orders, while if the expiry date is long enough, the amount of batch auctions can be reduced as the protocol is able to fit more trades in a single batch. 
