---
id: liquidity3
title: Questions and Considerations
sidebar_label: Questions and Considerations
---

## What are the advantages of the simple liquidity provision? 

Different advantages for the user providing the liquidity can be attributed to the simple  liquidity provision. First of all, can your spread can be your gain. The setup requires only one deposited token (not of all included in the provision), thus has no maintenance, is efficient to use of “locked” capital and as a low risk attached to it. Furthermore it can be cancelled anytime, 
can be tailored to individual preferences and no gas costs incur for a running liquidity provision

Why would someone take the counter position, if from my standing orders I can only gain?
Your gain is based on your opinion that the selected stablecoin should be valued at 1 USD. For example, since stablecoins fluctuate, it could happen that another trader, based on a different price source than yours, acts on a temporarily different valuation. 

During the time period in which you consider the true value of your selected stablecoins are each 1 USD, you will not have to perform any maintenance of your simple liquidity provision and continue to let the trades execute automatically based on your standing orders. 

## How do I choose the spread?

If you choose a lower percentage of spread:
- Your strategy will likely result in participating in relatively more trades, because this means that  every time this relatively smaller spread threshold is reached, trades may be automatically executed. You would thereby, gain this spread on each such trade. 
- Your deposits will likely be converted into the other token once the spread threshold is reached. If the spread increases beyond your chosen percentage, you will not have funds to convert into the other token left—unless the price fluctuates and matches your chosen spread again—and therefore you may miss out on a better opportunity.
If you choose a higher percentage spread:
- Your strategy will likely result in participating in fewer trades. However, you will profit more every time the spread it matched and a trade is executed. 


Both strategies have their own advantages, and it’s your choice in how you want to participate. We only provide the software to facilitate your participation. You can always have multiple strategies on multiple accounts, but **please note that if you confirm several strategies with one account, your deposits will be shared between all strategies and thus effectively only used for the strategy with the lesser spread**

## Are there costs involved in participating?

There is a 0.1% fee for every trade executed on the protocol. However, this fee is already included in the limit order price you set based on your spread. 

Gas costs to participate in the simple liquidity provision occur only while setting your order preferences and cancelling them. **Trades, however, are completely free**, meaning you don’t pay additional gas costs for the amount of trades executed according to your strategy.  For example, setting order strategies for a liquidity provision with 3 stablecoins and cancelling all standing orders, ~1.6M gas will be incurred (i.e., around ~3$ at the exchange rate of 180 USD/ETH and 10 Gwei). This includes depositing each stablecoin and withdrawing each of them,

## Once I set up a strategy, how much maintenance do I have to do?

None, as long as your assumption that the valuation of your chosen stablecoins does not change! 
You can cancel your orders, or a subset of your orders, at any time. 

## How can I stop a strategy?

At any time, by cancelling a subselection or all of your standing orders. Cancellations are effective by the start of the batch occuring after they were placed.

## How much did I make?

In the future there might likely be some analytics tool available for you. For the moment, you will have to look at your trading wallet and see how much funds you have available in the trading protocol. You should remember how much you deposited so you may assess your success based on the difference! For this evaluation, it is easier to not mix the same account with other regular trades on the protocol. Of course you should track how much and when you deposited, in order to have a proper assessment.

## What are the risks associated with participating in this simple liquidity provision?

As always, there is associated risk with using smart contracts; for further detail, please see the  the code and  audit report.

You assume the risk that one of your trusted stablecoins drops below 1 USD per unit and does not recover, in a case of permanent devaluation. If this happens,  your entire deposit would over time be converted into this lesser valued stablecoin unless you amend your standing orders before this occurs. This would indicate that your initial assumption that 1 unit of the given stablecoin would remain equivalent to 1 USD did not prove true. 
