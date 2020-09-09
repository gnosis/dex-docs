---
id: faq
title: Frequently Asked Questions
sidebar_label: FAQ
---

## How does Gnosis Protocol relate to prediction markets?
Core to the success and utility of prediction markets, is liquidity. Without lower spread order books, permissionless prediction markets will continue to fail to capture expert knowledge on future events. 

Our existing [conditional token framework](https://docs.gnosis.io/conditionaltokens/) allows anyone to create crypto assets that represent information about future events with conditional outcomes. In essence, the conditional token framework enables the creation of prediction market assets, which could be traded on any trading protocol, not solely on a prediction market platform. However, the number of unique conditional tokens, each representing a unique outcome in the world, could grow exponentially in size. In order to ensure marketplaces exist for the “long tail” of prediction market assets, it is necessary to have market mechanisms built precisely for handling large numbers of unique, and often illiquid, tokens. To this end, we built the Gnosis Protocol to become the standard for trading prediction market conditional tokens and providing access to their global liquidity pool. 

Note: Prediction markets may constitute a regulated activity depending on the jurisdiction and depending on the market design and market topic, so that in these cases they may only be set up with the corresponding authorisation of the competent supervisory authority.


## What is Gnosis Protocol’s fee model and what role does GNO play?
Fees are used to incentivize an open competition in which anyone can submit an order settlement solution for every batch auction and be rewarded. Additionally, the fee model aims to bring value to all GNO token holders. In detail, on each trade, the protocol takes only a 0.1% fee on trading volume. Fees are included in a trader’s limit price and paid in their sell token. All fees are then converted into [OWL](https://blog.gnosis.pm/owl-token-use-cases-6094027ecb37), which is a token [generated](https://blog.gnosis.pm/owl-generation-2019-85be92d18552) by locking the Gnosis token, GNO. 50% of the fee is paid as an incentive to the provider of the selected order settlement solution (“solver”), while the remaining 50% of the fee is burnt. 


## How does Gnosis Protocol relate to Gnosis’ earlier DEX product, the DutchX trading protocol?
Both the DutchX trading protocol and Gnosis Protocol come from a similar motivation: to implement batch auctions with uniform clearing prices. Gnosis Protocol keeps all the advantages of the DutchX trading protocol but adds: shorter trading times, allowing every participant to set a limit price (i.e. on the DutchX, sellers could only place market orders), and thanks to the ring trades, Gnosis Protocol does not split liquidity into separate trading pairs.


## Will there be a version 2 of Gnosis Protocol?  
Gnosis protocol has no admin key or other ability to upgrade, However, we will continue to innovate and suggest users to switch to a newer version if it can offer significant improvements over the previous one. A few areas of improvement could be: increased scalability and lower gas costs for usage, higher expressibility of orders, or the ability to submit sealed bids.


## Is Gnosis Protocol secure?  
The open source code on [Github](https://github.com/gnosis/dex-contracts). The verified contracts are on Etherscan for [Mainnet](https://etherscan.io/address/0x6f400810b62df8e13fded51be75ff5393eaa841f) and [Rinkeby](https://rinkeby.etherscan.io/address/0xC576eA7bd102F7E476368a5E98FA455d1Ea34dE2). The contracts have also carefully been audited by external smart contract security experts. You can find the audit report [here](https://github.com/gnosis/dex-contracts/raw/master/Exchange_audit_report.pdf).

Since the end of January 2020, a Gnosis Protocol [bug bounty program](https://blog.gnosis.pm/2020-dex-bug-bounty-210f2b67a764) for up to $50,000 per bug report has been open.


## What is Mesa?  
[Mesa](https://mesa.eth.link/) is the first dapp built on the Gnosis Protocol. Mesa is a general trading interface that supports simple market making strategies for stablecoins. Mesa was launched by the [dxDAO](https://twitter.com/Dxdao_), an organization leading the evolution toward a more "de"-centralized DeFi.

The dxDAO is a decentralized organization initialized in May of 2019, with over 400 unique stakeholder addresses. With a potential to grow its membership into the thousands, the community-owned and operated organization develops, governs, and promotes DeFi protocols. The dxDAO owns the DutchX trading protocol, and community members are working to launch a prediction market platform (Omen), a state of the art DEX (Mesa), a privacy-centric DeFi dashboard (Mix), and a fundraiser. 

<a name="minimum-order"></a>
## Why does the Mesa dapp have a warning regarding a minimum amount for orders?  
Gnosis Protocol is a fully permissionless DEX, in which a centralized operator is replaced by an open, incentivized competition to which anyone can submit order settlement solutions. Those who submit order settlement solutions are referred to as “solvers.” Solvers are economically incentivized to submit order settlement solutions because half of the protocol’s 0.1% fee on trading volume is paid to the solver who submits the best[1] solution (while the other half of the fee is burnt). This fee is automatically included in limit orders on Mesa.

Solvers are expected to act in their own economic self-interest, which means that they will likely optimize for submitting successful solutions that generate higher fee volumes and cover gas costs. **Due to substantially higher gas costs on Ethereum in mid-2020, this means that smaller orders are often not included in solvers’ order settlements. While of course you are guaranteed to never receive below your limit price, this does mean smaller standing orders may sometimes not be filled on the protocol even at market price. Please keep this in mind when placing orders on the protocol; an improvement for this issue is expected for Gnosis Protocol v2.**

While we can warn of this expected behavior for smaller orders, the actual minimum amount for an order to be included in the order settlement solution varies. For example, let's say a solver requires on average 0.1 OWL of fees to be generated by the orders in the solution to be submitted and economically viable. Then, if a single order already contributes 5 OWL of fees, the order settlement solution could theoretically contain any other orders, in particular also very small ones, since the full solution of 30 orders (the maximum amount of orders for any single order settlement solution) is guaranteed to generate more than 30 * 0.1 OWL = 3 OWL of fees. In practice, the average amount of fees a solver optimizes for will likely be determined by the current gas price. It is also possible that other solvers are participating in the open competition with different criteria.

1: To learn more about how the protocol selects the “best” solution, visit the [Solvers](https://docs.gnosis.io/protocol/docs/introduction1/#solvers) section.
