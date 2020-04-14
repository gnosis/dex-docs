---
id: tutorial-multiple-orders
title: Submit multiple limit orders or pre-schedule orders
sidebar_label: Overview
---


Before you get started, make sure you’ve familiarized yourself with the [Gnosis Protocol Introduction](https://docs.gnosis.io/protocol/docs/introduction1/) and the tutorial on how to [Submit a limit order](https://docs.gnosis.io/protocol/docs/tutorial-limit-orders/). This tutorial is an absolute prerequisite to following along here, as it covers steps that we will not repeat in this tutorial.

This tutorial will cover:

1. Place order(s) 
2. Optional: An excursion into Unix timestamps

Additionally, we assume this knowledge as a prerequisite. You can learn about this in the how to [Submit a limit order](https://docs.gnosis.io/protocol/docs/tutorial-limit-orders/) tutorial:
*  Setting an approval for your sell tokens
*  Depositing the tokens you want to sell
*  Withdrawing your funds
*  Information you should confirm or have readily available
*  Are your tokens listed on Gnosis Protocol?
*  The amount of decimal places of each token you’d like to sell and buy
*  The unique token ID of your sell and buy tokens designated by Gnosis Protocol
*  The current batchID on Gnosis Protocol

Useful link:
*  [Etherscan verified Mainnet Gnosis Protocol contract](https://etherscan.io/address/0x6f400810b62df8e13fded51be75ff5393eaa841f)

## Place order(s)

Again, you should be familiar with the place order functionality of submitting one order (Function Nr. 1), which you can revisit in this [tutorial](https://docs.gnosis.io/protocol/docs/tutorial-limit-orders/).

To place multiple orders or to pre-schedule orders, go to the [Gnosis Protocol Etherscan link](https://etherscan.io/address/0x6f400810b62df8e13fded51be75ff5393eaa841f). 
1. Navigate to tab ‘contract’, ‘write contract’ and ‘click’ on ‘connect to Web3’.
2. Use the function Nr. 6 ‘placeValidFromOrder’. Although the name may be confusing, this function can be used for two purposes including a) pre-scheduling order(s) to be valid in the future or (b) submitting many different orders at once..
3. Information you need to know is displayed here: 

<img src="/img/tutorial_mo_1.png">

**This function allows you to place several orders in a single transaction. The orders entered must be separated by a comma “,” within an array [ ] without any spaces.** Each position within the array [ ] corresponds to the same position in every other array [ ]. Every field has to include the same amount of order details.

Similar to the function used to submit one order, you must know:
*  buyTokens and sellTokens IDs: Note that these are not the tokens’ address. Rather, it is a unique token ID assigned to each token listed on Gnosis Protocol.
*  validFroms: This is the batchID number from which your order(s) become valid.
validUntils: This is the batchID when your orders will expire. Note that you can still cancel orders anytime prior to their expiration time.
*  buyAmounts and sellAmounts: The ratio between the two amounts reflects the limit price you are setting, as discussed in this [tutorial](https://docs.gnosis.io/protocol/docs/tutorial-limit-orders/). Additionally be sure to use the correct amount of decimal places per token. Lastly on this point, you can set higher amounts than you currently have deposited. Higher amounts mean you enable this order to be filled many times.

This can be most easily demonstrated with an example.

<img src="/img/tutorial_mo_2.png">

Essentially, in the image above, if you take the first entry of each array you will see the details of  the first order:
*  buyTokens: 4
*  sellTokens: 7
*  validFroms: 5288112
*  validUntils: 5288184
*  buyAmounts: 1000000000
*  sellAmounts: 999000000000000000000

This means that the first order within these 2 orders I am placing in one transactions reads: 

	Sell 999 DAI for 1000 USDC, starting on 9 of April 2020 at 12:00:00 GMT and ending 9 April 2020 at 18:00:00 GMT.

All other orders follow this same construction. Important to note: you will need to deposit these tokens, which requires a separate action, before your orders can be matched. Once you have reviewed your entry, click on ‘write’ and confirm with your web3 provider.

That’s it. You’re done!

## An excursion on Unix Timestamps and batchIDs
batchIDs are based on Unix timestamps. If you want to calculate a batchID, you must divide the Unix timestamp at which an auction starts by 300. (Remember that auctions run every five minutes, so you are essentially dividing by auction duration: 300 seconds (=5 minutes)).

Inversely, to convert a batchId to a Unix timestamp, simply multiply the batchID by 300. [Epochconverter](https://www.epochconverter.com/) is a great tool to transform normal times to Unix timestamps. By entering a batchID that will occur in the future, you are setting an expiration for your order. The same is true for specific dates. If you know your starting date and time, use [Epochconverter](https://www.epochconverter.com/) to calculate the Unix timestamp, which you then have to divide by 300 to get the batchID.

If you have a batchID but want to know the Unix timestamp, multiply it by 300, which you can then convert to human readable time by using [Epochconverter](https://www.epochconverter.com/).