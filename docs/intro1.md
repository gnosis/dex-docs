---
id: introduction1
title: Introduction to Gnosis Protocol
sidebar_label: Introduction
---
Gnosis Protocol is a fully permissionless DEX, which has been in research and development over the course of the last two years. Gnosis Protocol enables ring trades to maximize liquidity. Ring trades are order settlements which share liquidity across all orders, rather than a single token pair, and uniquely suited for trading prediction market tokens and the long tail of all tokenized assets.

Now let's step into the ring, and take a closer look at the basics.

## Trades

Gnosis Protocol is a trading protocol for ERC-20 tokens. The protocol is technically compatible with any ERC-20 token, but only tokens listed on the protocol can be traded. Token listing is permissionless and can be done by anyone. However, a spam protection fee of 10 <a href="https://blog.gnosis.pm/owl-token-use-cases-6094027ecb37">OWL</a> is required to list new tokens. You can learn more about how to list tokens in this <a href="addtoken1">tutorial</a>.

To trade on Gnosis Protocol, a user can simply place an order for one token in exchange for another. An order is an instruction as to what token a user wants to sell under a given price condition, thereby defining  a limit price within the order, which indicates the absolute worst price a user will receive. The protocol levies a fee of 0.1% on the volume of an executed trade. Fee costs are calculated as part of and already included in an order’s limit price.

In a perfect Gnostic world, traders would place sell orders that exactly match available buy orders, and all trades would be executed directly and seamlessly. This, however, is usually not the case. Imagine we have four parties selling one token for another token: Alice would like to exchange DAI for OWL; Bob and Cary both would like to exchange USDC for DAI; and Daniel would like to OWL for USDC. Most traditional trading protocols wouldn’t be able to directly fill these orders. In this example, Daniel might make an additional trade, exchanging their OWL for DAI to then complete the desired trade by exchanging DAI for USDC.

![](assets/orders.png)

By enabling ring trades, however, Gnosis Protocol can fill these orders with uniform clearing prices and without requiring additional work from the trader. 

![](assets/ringtrade.png)

## Trading Cycles
Let’s get an owl’s eye view on how the protocol's trading cycles work to make this possible.

*  Users can place limit sell orders on-chain at any time;
*  Every 5 minutes, a **batch auction** runs;
*  At the start of an auction, all currently open orders on the protocol are considered;
*  For each auction, an open competition to submit order settlement solutions by **solvers** takes place;
*  The protocol selects the ring trade order settlement solution that maximizes trader welfare and provides single clearing prices;
*  All matched orders are settled on-chain and filled;
*  The next batch auction begins.

From a users' perspective, a full trading cycle on Gnosis Protocol consists of three user actions: deposit, order, and withdrawal. However, there's still a lot going on under the transparent hood.


### Solvers
On Gnosis Protocol, a central operator is replaced by an open competition for order matching, and the term solver refers to anyone who submits an order settlement solution for a batch auction. In principle, anyone can become a solver by submitting a proposal for order settlement, although significant technical and computational capacity is required for it to be in their economic interest.

Solvers’ proposals compete to provide the best order settlement for a given batch, with the term “best” meaning it satisfies pre-defined optimization criteria. As a simple definition, it can be said the best proposals maximize "trader welfare" as determined by volume and profit. You can learn more about this optimization criteria in a <a href="https://www.youtube.com/embed/hyF-z3Exhc4">recent talk</a> by Gnosis Engineer Felix Leupold.

Solvers can submit valid order settlements within the first 4 minutes of every batch auction, which in total run for 5 minutes each. Solvers can include any valid open orders with available deposits in a batch auction’s order settlement. Solvers do not have to match only countertrades (token A for token B with token B for token A), but can also match ring trades such as token A for token B, token B for token C, and token C for A token. However, the more orders and distinct tokens involved in a batch auction’s order settlement, the greater the calculation’s difficulty becomes.

A valid solution contains (1) a list of orders that should be executed and (2) a list of clearing prices. A single solution is only allowed to settle up to 30 orders. This is because a greater number of orders would make it significantly harder for such a transaction to be mined within the 4 minute timeframe for submitting solutions.

The solver that provides the best order settlement solution for a given batch auction is selected by the protocol, and the order settlement is then settled on-chain, resulting in all matched trades being partially executed.

After this, users can withdraw their funds from filled orders, as well as unfilled orders. 

## Benefits

*  **Fully permissionless DEX** on which anyone can list tokens and build integrations;
*  **Maximized liquidity** through **ring trades**, in which liquidity is shared among all traded assets; 
*  First implementation of **batch auctions** promoting fairer, uniform clearing prices and front-running resistance; 
*  There is a guaranteed orderbook to **trade any token pair** without having to use an intermediary token or centralized trading protocol to convert your asset;
*  **Fair, decentralized settlement** in which an open competition for order matching replaces an operator;
*  Fees are included in your limit price and paid in OWL, which can be generated from GNO, and there are **no gas costs** for executed trades. 


## Conclusion

We believe Gnosis Protocol is critical infrastructure for open finance, which will see the creation of more and more tokenized assets. For example, the number of unique prediction market conditional tokens, each representing a unique outcome in the world, could grow exponentially in size. In order to ensure marketplaces exist for the “long tail” of prediction market and all tokenized assets, it is necessary to have market mechanisms built precisely for handling large numbers of unique, and often illiquid, tokens. To this end, we built the Gnosis Protocol to become the standard for trading prediction market conditional tokens and providing access to their global liquidity pool. 

Ultimately, Gnosis Protocol is built in the spirit of permissionless innovation. Its fully decentralized architecture means you don’t need Gnosis to build on our protocol.

<hr>


## Additional Resources

A deeper look into Gnosis Protocol (formerly Dfusion Protocol) by Gnosis Product Manager Chris Ernst:

<figure class="video_container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/hpTh_iVUOq0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</figure>

<br><br>
A deeper look into fair price finding and Gnosis Protocol's optimization criteria by Gnosis Engineer Felix Leupold:


<figure class="video_container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/hyF-z3Exhc4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</figure>

<br><br>
For a more rigorous mathematical description of Gnosis Protocol (formerly Dfusion Protocol) please refer to the research paper: https://github.com/gnosis/dex-research/blob/master/dFusion/dfusion.v1.pdf.



