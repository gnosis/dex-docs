---
id: liquidity2
title: Setup
sidebar_label: Setup
---

In the following we will give an insight into how the simple liquidity provision can be put to work on the dFusion protocol. We recommend to be familiar with the concept of stable coins before you go through this summary of the liquidity provision concept.  The simple liquidity provision consists of 5 easy steps:

1. You select at least two stablecoins you trust. 
2. You specify a spread between the two coins (i.e., for every trade, the spread is the profit you will make given your assumption that their value is 1).
3. You create standing orders.
4. You then need to deposit at least one of the chosen stablecoins into your exchange balance.

That’s it! Now you can wait, and trades will automatically happen for you. 

Let’s have a deeper look into the different steps. 

In the first step you will select at least two stable coins.  When you participate in the simple liquidity provision, the stablecoins you select should be those you trust, **in the sense that you believe their true value to be 1 USD**, independent of their current exact pricing on other exchanges. You can include more than two stablecoins in your simple liquidity provision. 

After you select the stable coins of your choice you define the spread between the stable coins. 
For example, if you select DAI and USDC with a 0.5% spread. The spread defines your willingness to sell an asset above 1 USD. You could see it as the profit you’re making on every trade, based on your assumption that the value of your selected stablecoins per unit are equivalent to 1 USD.

For all of the stablecoins you would like to be included, standing limit orders are now  placed between each of them, according to your defined spread:
- “I sell 1 DAI for 1.005 USDC” → hence, you always receive more for what you sell (under your assumption that both are valued at 1 USD).
- “I sell 1 USDC for 1.005 DAI” → hence, you always receive more for what you sell (under your assumption that both are valued at 1 USD).
Standing orders here mean that your deposited tokens and tokens acquired through trading in the strategy will both be continuously in circulation as part of the strategy, according to the preferences you set previously. 
Limit orders mean that the set limit price is the worst price you will receive for your order, while maintaining the possibility to receive a better price. In this case, the limit price includes the trading fees; they will not be further deducted from your limit order. 

If you select 2 stablecoins, 2 standing orders will be generated. 3 stablecoins generate 6 standing orders; 4 stablecoins generate 12 standing orders; and so on, at s*(s-1) with s equal to the number of stablecoins you’ve selected. By selecting any number of stablecoins, you indicate that you interchangeably accept each one for another one at your chosen spread.  


Once your parameters are set you will have to place one of the chosen stable coins into your exchange balance.  Now you can wait, and trades will automatically happen for you. You can cancel your orders, or a subset of your orders, at any time. The cancellation will only be valid starting from the batch that occurs after your cancellation was placed.
