---
id: offchainservices
title: Off-Chain Services
sidebar_label: Off-Chain Services
---

On Gnosis Protocol v2, orders are placed off-chain and are not immediately executed, but rather collected and aggregated to be settled in batches. Gnosis Protocol v2 does not need to work with executed transactions in order for users to be able to trade. The smart contract architecture is composed of an allowance manager and a settlement smart contract. There are two main components that work off-chain, which are the API used for the fee mechanism and price estimations, and the solvers, used for finding different settlements solutions for each batch auction. Let's deep dive into how these work:

## API
   

### Fee Mechanism 


In GPv2 the blockchain transactions that settle user orders are submitted by the settlement backend ran by the solvers, which incurs gas costs. This cost is forwarded to orders in the form of protocol fees. The aim of this protocol fee is for the solvers to cover the costs of executing the order within a batch auction.

As you know, GPv2 works with off-chain transactions in the form of signed orders. These orders contain a field called "feeAmount" which is the maximum amount of fees that can be charged to the owner of the order. When the order gets executed, the fee is enforced by the settlement smart contract and given to the backend solver that submitted the settlement solution that contained such an order.

In the smart contract, the fee is taken from the order's sell token. As Ethereum's gas price and the relative price between the sell token and buy token change, so does the minimum fee that makes it viable for a solver to include an order. Because of changing conditions, GPv2 is able to execute orders in a full or partial style, meaning that if the order is completely filled, the fee taken by the protocol is 100%, while if the order is partially executed, a prorated amount of the total fee is taken.

This is communicated through the [/api/v1/feeAndQuote](https://github.com/gnosis/gp-v2-services/blob/main/orderbook/src/api/get_fee_and_quote.rs) endpoint. Based on the order's type, sell token, buy token, and amount, the backend calculates an acceptable fee and a validity period. When submission of a new order is attempted, the backend checks if the fee is appropriate and rejects the order if the fee is not sufficient. The validity period improves the user experience by guaranteeing that order submission with this fee will not be rejected for some time. Otherwise, the price could move and by the time a user has signed their order, it would get rejected.

Once accepted the order is expected to be executed even if gas prices change (this might change in the future).

Fee estimation estimates the amount of gas needed on a per order basis taking into account that for some token pairs the route through automated market makers like Uniswap pools is longer than for others. Fee estimation is handled in [orderbook/src/fee.rs](https://github.com/gnosis/gp-v2-services/blob/main/orderbook/src/fee.rs)

Fees are persisted in the min_fee_measurements postgres table from which we can efficiently look up valid fees and discard expired fees. Fee Persistence is handled in [orderbook/src/database/fees.rs](https://github.com/gnosis/gp-v2-services/blob/main/orderbook/src/database/fees.rs)

### Price Estimation
  

As stated in other sections, Gnosis Protocol v2 works with signed messages instead of executing transactions on the go. This means, that on the UI, the user sees a price quote that is based on an estimation of what prices will that particular order be settled with. One particular feature of Gnosis Protocol is that within the price estimation, it shows "the minimum amount to be received" which is a price quote that can't be violated, meaning that the protocol will either give you that price or the order will expire and be canceled without any cost. Although, if through CoWs, the protocol can offer you a better quote than the minimum received, it will execute your order with a surplus. In other words, price estimation is a lower bound on the proceeds a user can get for their trade. While we are working on it, at the moment slippage is not yet included in the price estimate

In order for the front end to show the users the expected prices, the backend has implemented different routes for price estimation. This can be done through the [/api/v1/feeAndQuote](https://github.com/gnosis/gp-v2-services/blob/main/orderbook/src/api/get_fee_and_quote.rs) endpoint or [/api/v1/markets endpoint](https://github.com/gnosis/gp-v2-services/blob/main/orderbook/src/api/get_markets.rs).

These prices are calculated based on liquidity sources that have native support (Uniswapv2, Sushiswap, and hopefully soon Balancer and Uniswapv3) from the baseline solver. However, when finding the actual batch settlement, there are also smarter solvers like the MIP solver and other aggregators like 1Inch and Paraswap that are working on finding the best price settlement. This means that the settled price might be better than the estimated price.

As we add native support for more liquidity sources, improve the baseline solver, and start using other solvers for price estimation, such as the MIP solver, the protocol estimates should highly improve over time. Like the baseline solver, it uses a set of base tokens that are considered as intermediate hops between tokens to reach the buy token from the sell token. It takes gas cost into account so that for small orders fewer hops are preferred while for large orders more hops might be considered if they improve the price enough. The price estimation code is in [shared/src/price_estimate.rs](https://github.com/gnosis/gp-v2-services/blob/main/shared/src/price_estimate.rs).

## SOLVERS


### Type of Solvers
  

There are currently multiple solvers competing to come up with the best order settlement solution matching for a given batch auction problem. The task that each solver needs to accomplish can be summarized as:


<p align="center">
    <em> For a given set of EOA orders and AMM's (liquidity pools), compute the matching between the orders and AMMs that leads to the highest utility/surplus for the order owners.</em>
</p>

In this context, "a matching" is the information necessary to determine the traded amounts for each order, and the amounts needed to settle in the AMM, implicitly also defining the exchange rates between them. The utility of the matching is used for ranking them and is as defined as:
<p align="center">
 <em> utility = surplus + fees - gas_costs</em>
</p>

Please check [this forum post](https://forum.gnosis.io/t/gpv2-fee-model/1266) for more information.

The existing solvers can be grouped according to the following criteria:

|                            |Single order solver                                      | Batch order solver             |
|----------------------------|------------------------------------------------------------|--------------------------|
| Internal routing algorithm | Baseline solver                                            | Naive solver, MIP solver |
| External routing algorithm | 1inch solver, Paraswap Solver, Matcha Solver, Balancer SOR |                          |

The first criteria is a property of the problem, while the second is a property of the method:

1.  **Single/batch order solver:** Matches one/more than one order with a set of AMM's.

1. **Internal/external routing algorithm:** Uses an internal/external routing algorithm to determine which AMM pools are best to use.

The following briefly describes each of these individual solvers:

#### Baseline solver

Matches a single order to a set of AMM's. Computes the single sequence of AMM's that leads to a higher surplus for the owner of the order.
<img src="assets/Baseline Solver.png">

Graph representation of a batch auction. Nodes represent tokens, blue arrows are orders, and green arrows are AMM pools. A dashed edge indicates an unused AMM. The edge weights stand for the spot exchange rate (sell amount/buy amount) associated with the AMM pool.

Example: A trader would like to buy D for A, at a limit exchange rate A/D <= 1 (blue arrow in the picture above). There are four AMM pools, which operate at the fixed exchange rates as described in the picture (assume there is no slippage for now). If the order is matched against the AMM sequence A->B->D, then the exchange rate D/A would be B/A * D/B = 0.9 * 0.8 = 0.72. However, this exchange rate would violate the order limit price (1/0.72 > 1). Therefore, the baseline solver would match the order against the A->C->D pool sequence instead. Notice that even if the order limit price was 1/0.72, then the solution would not change since the A->C->D sequence leads to a higher surplus for the trader.

#### 1inch, Paraswap & Matcha solvers

Matches a single order to a set of AMM's by using the 1inch, Paraswap & Matcha external services. This means that both the set of AMM pools (and other liquidity) to consider and the method used to match them against, and the order is outsourced to 1inch, Paraswap & Matcha. Note, that these solvers routing algorithm is more advanced than the baseline solver since it can match an order using multiple AMM sequences, as explained in the following example.

It also has a more holistic view of the available on-chain liquidity (the baseline solver is still catching up on supporting all possible on-chain protocols).

<img src="assets/1inch solver.png">

Example: Consider again the previous example. Since pools have slippage (the exchange rate changes as a function of the traded amount), if the order being matched is big enough, it could eventually occur that spot exchange rates on the sequence A->C->D would be as shown in the picture above. At this point, it is equally advantageous to use the A->B->D sequence, and in fact, the optimal strategy would be to match the remaining amount to be traded to both sequences simultaneously.

#### Balancer SOR (Smart Order Routing) solver

Matches a single order to the set of pools that are within the Balancer protocol. This means that the set of AMM pools to consider and the method used to match them against the order only relies on what is happening inside the Balancer protocol. Note, that this solvers routing algorithm is more advanced than the baseline solver since it can match an order using multiple pool sequences, as explained in the following example.

It also has a more holistic view of the available on-chain liquidity (the baseline solver is still catching up on supporting all possible on-chain protocols).
<img src="assets/Balancer SoR Solver.png">

Example: Consider again the previous example. Since pools have slippage (the exchange rate changes as a function of the traded amount), if the order being matched is big enough, it could eventually occur that spot exchange rates on the sequence A->C->D would be as shown in the picture above. At this point, it is equally advantageous to use the A->B->D sequence, and in fact, the optimal strategy would be to match the remaining amount to be traded to both sequences simultaneously.

#### Naive solver

Matches a set of orders in a single token pair against a Uniswap v2 pool. The special case when all orders are on the same token pair and the AMM is a Uniswap v2 pool can be solved very efficiently. It is essentially a two-dimensional orderbook, where the remaining unmatched amounts, which can be positive since orders, fill-or-kill are traded through the AMM pool.

A slightly more sophisticated approach considering multi-hop routes (or even a full baseline route) for the excess would be a cool addition to the code-base (grants available)

<img src="assets/Niave Solver.png">

#### MIP solver

Matches a set of orders against a set of AMM's. This is the general case, which is an NP-hard problem and is tackled using a mixed-integer programming solver. A previous version of the model, that doesn't include the AMM integration, is thoroughly described [here](https://github.com/gnosis/dex-research/blob/master/BatchAuctionOptimization/batchauctions.pdf).

<img src="assets/MIP Solver.png">

### Solvers Competition
    

As stated in the "Road to decentralization" section, there are different phases in which the solver's competition will open up to new users. To recap, the methods for a user to become a solver differ depending on which phase the protocol is at:

**Phase 1:** having a trust relationship with the Gnosis Team will allow for collaboration to spark, and for them to manually include your solver in the authenticated solvers.

**Phase 2:** the protocol is more mature, and the GnosisDAO is the entity in charge of authenticating solvers according to the votes of the proposal, and the bond they have placed.

**Phase 3:** the protocol will aim to make the orderbook decentralized in a P2P client network where everyone can validate the orders registered in a trustless manner.

Once the solver has been authenticated and included in the Allowlist smart contract, it will now be able to submit batch settlement solutions and obtain rewards according to their performance.

At the moment, the rust backend queries and ranks solutions of the different solvers based on the criteria of "the solution that provides the most utility to the orders". The solver with the highest optimization of such criteria that has passed a transaction simulation of the batch settlement solution is then chosen for settlement submission. If the submission is successful, the solver batch gets executed on-chain, all the fees from that batch go to the solver for covering its execution costs + the rewards for being the winning solver. In the event that submission fails, the driver runs again and refetches liquidity to start a new solution-finding process.

For a solver to become part of the solvers' competitions, besides having to go through the authentication requirements, it also needs to prepare certain technical aspects. In order for the backend to integrate a new solver, this one should provide an endpoint to return a valid settlement transaction (cf. [smart contracts](https://github.com/gnosis/gp-v2-contracts/blob/main/src/contracts/GPv2Settlement.sol#L121)). After that, the new solver is allowed to fetch orders using the [solvable orders](https://protocol-mainnet.dev.gnosisdev.com/api/#/default/get_api_v1_solvable_orders) endpoint. Various inputs are needed, but most important is the on-chain liquidity that the baseline solver can handle, which could also be passed into the HTTp request (cf.http_solver.rs). In the future, the backend will provide an endpoint to push solutions in specific time intervals.

For more information on full decentralization of the solve architecture check <https://forum.gnosis.io/t/gpv2-road-to-decentralization/1245>