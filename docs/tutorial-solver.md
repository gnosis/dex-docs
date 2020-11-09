---
id: tutorial-solver
title: Run a Solver
sidebar_label: Overview
---

This tutorial will cover how to run the open solver for Gnosis Protocol. Before you get started, make sure you’ve familiarized yourself with the [Gnosis Protocol Introduction](https://docs.gnosis.io/protocol/docs/introduction1/), especially the section on what "solvers" are in the context of Gnosis Protocol.

## Installing Driver Tools

Clone the dex-services repository, and acquire the project requirements:

```sh
git clone https://github.com/gnosis/dex-services.git
```

Once comfortable you're all set, the open solver can be adapted to suit your own needs from the [open solver repository](https://github.com/gnosis/dex-open-solver).

## Building the Driver

Build the driver (with the open solver Docker Hub image) from within the root directory of `dex-services` repo. This command builds the driver while simultanesouly baking the open solver into the the build.

```sh
docker-compose build --build-arg SOLVER_BASE=gnosispm/dex-open-solver:master stablex-debug
```

Be aware, your Docker installation may require elevated privileges!

Note that, if `SOLVER_BASE` is not specified, the driver's own internal `NaiveSolver` will be used. Alternatively, if you have your own personalized solver, this image would need to be specified during the build.

## Configuring Environment Variables

The following three environment variables are _required_ when running the dex-services project.
Note that the account corresponding to the private key should be funded with sufficient ETH to pay gas for solution submission.

```sh
export INFURA_KEY=<your infura key>
export PRIVATE_KEY=<your private key>
export NODE_URL=https://mainnet.infura.io/v3/${INFURA_KEY}
```

By placing these values into an `.env` file and sourcing this file, you can avoid providing them as runtime arguments on every execution.

## Acquiring the Order book

It can take a very long time for the driver to load the order book, and this process is also restricted by Infura rate limits. For this reason, it's best to supply an existing order book file, which is available for download at:

- [Mainnet](https://gnosis-dev-dfusion.s3.amazonaws.com/data/mainnet_dev/event_db/stablex_orderbook_mainnet.bin)
- [Rinkeby](https://gnosis-dev-dfusion.s3.amazonaws.com/data/rinkeby_dev/event_db/stablex_orderbook_rinkeby.bin)
- [xDai](https://gnosis-dev-dfusion.s3.amazonaws.com/data/xdai_dev/event_db/stablex_orderbook_xdai.bin)

Copy this orderbook file into `dex-services/target` and append `ORDERBOOK_FILE=/app/dex-services/target/stablex_orderbook_mainnet.bin` to your `.env` file from the previous section.
Technically, the orderbook file can be saved anywhere, but we have chosen `target` here since it is flagged as an untracked directory in the project's `.gitignore`.

## Run the Solver

```sh
cargo run --bin driver -- --solver-type OpenSolver --node-url $NODE_URL --private-key $PRIVATE_KEY --orderbook-file $ORDERBOOK_FILE
```

or, equivalently, for the simplest and most robust experience, first source your configuration file, and then run the driver without any additional runtime arguments.

```sh
source .env_rinkeby
cargo run --bin driver
```

where `.env_rinkeby` contains the following, minimal, parameters:

```
export INFURA_KEY=<your infura key>
export PRIVATE_KEY=<your private key>
export NODE_URL=https://rinkeby.infura.io/v3/${INFURA_KEY}

export SOLVER_TYPE=OpenSolver
export ORDERBOOK_FILE=/app/dex-services/target/stablex_orderbook_rinkeby.bin
```

Observe that the `INFURA_KEY` must also be specified beforehand for the `NODE_URL` to be valid.
Furthermore, while `ORDERBOOK_FILE` is technically an optional argument, it is **not recommended** to run without.

A successfully running and properly configured driver should appear with the following logs:

```
root@d792c990d8bd:/app/dex-services# source .env_rinkeby
root@d792c990d8bd:/app/dex-services# cargo run --bin driver
    Finished dev [unoptimized + debuginfo] target(s) in 9.21s
     Running `target/debug/driver`
2020-09-07T13:29:33.335Z INFO [driver] Starting driver with runtime options: Options {
    log_filter: "warn,driver=info,services_core=info",
    node_url: "https://rinkeby.infura.io/v3/XXXXXXXXXXXXXXXXXX",
    network_id: 4,
    solver_type: OpenSolver,
    solver_internal_optimizer: Scip,
    token_data: TokenData(
        {},
    ),
    orderbook_filter: OrderbookFilter {
        tokens: Blacklist(
            {},
        ),
        users: {},
    },
    private_key: PrivateKey(
        0xee095e12b02a2b82d3ae06bbc7cb2a22885922a5,
    ),
    auction_data_page_size: 500,
    rpc_timeout: 10s,
    http_timeout: 10s,
    target_start_solve_time: 30s,
    latest_solution_submit_time: 210s,
    earliest_solution_submit_time: 0ns,
    economic_viability_subsidy_factor: 10.0,
    economic_viability_min_avg_fee_factor: 1.1,
    default_min_avg_fee_per_order: 0,
    default_max_gas_price: 100000000000,
    scheduler: Evm,
    price_source_update_interval: 300s,
    orderbook_file: Some(
        "/app/dex-services/target/stablex_orderbook_rinkeby.bin",
    ),
}
2020-09-07T13:29:35.441Z INFO [driver] Using contract at 0xc576ea7bd102f7e476368a5e98fa455d1ea34de2
2020-09-07T13:29:35.446Z INFO [driver] Using account Some(Offline(PrivateKey(0xee095e12b02a2b82d3ae06bbc7cb2a22885922a5), Some(4)))
2020-09-07T13:29:35.447Z INFO [driver] Orderbook filter: OrderbookFilter { tokens: Blacklist({}), users: {} }
2020-09-07T13:29:35.463Z INFO [services_core::price_finding] Using OpenSolver optimization price finder
2020-09-07T13:29:38.048Z INFO [services_core::history::events] Successfully loaded 60846 events in 12437006 bytes from event registry file
2020-09-07T13:29:38.050Z INFO [services_core::orderbook::streamed::updating_orderbook] successfully recovered orderbook from path
2020-09-07T13:29:38.284Z INFO [services_core::orderbook::streamed::updating_orderbook] Updating event based orderbook from block 7155117 to block 7155296.
2020-09-07T13:29:40.031Z INFO [services_core::orderbook::streamed::updating_orderbootk] Received 164 events.
2020-09-07T13:29:41.227Z INFO [services_core::orderbook::streamed::updating_orderbook] Finished applying events
```

You may also encounter several price estimation warnings, but the driver will recover from this.

```
2020-09-14T12:06:56.746Z WARN [services_core::price_estimation::clients::generic_client] failed to retrieve services_core::price_estimation::clients::dexag::api::DexagHttpApi prices for token ID 33 (aTUSD): failed to get price from dexag

Caused by:
    0: failed to parse JSON '"{\"error\":\"Error getting price\"}"'
    1: invalid type: string "{\"error\":\"Error getting price\"}", expected struct Price at line 1 column 37
2020-09-14T12:06:56.748Z WARN [services_core::price_estimation::clients::generic_client] failed to retrieve services_core::price_estimation::clients::dexag::api::DexagHttpApi prices for token ID 36 (aBAT): failed to get price from dexag
```

To silence these warnings and for an overall cleaner logging experience, you may also want to add the following log argument:

```sh
 --log-filter warn,driver=info,services_core=info,services_core::price_estimation::clients::generic_client=error
```

or append this as `LOG_FILTER` to your `.env` file.

and [here](https://rinkeby.etherscan.io/tx/0xef93563c9c79708a613fb77978bff974672679270f9b51f98c19a8ce90d35260) is an example of a successful solution submission on Rinkeby.

## Advanced Configuration

### Economic Viability Constraints

The _economic viability_ (EV) of running a solver amounts, essentially, to ensuring that the gas spent by a solution submitter is sufficiently subsidized via the fee reward earned by successful solution submission. In other words "is the transaction cost worth the reward". There are three different flavour of _economic viability strategies_ that this software can be configured with. Namely

1. **Dynamic (default):**
   Uses the current native token price, gas price and subsidy factor as specified by `economic_viability_subsidy_factor` (having a default of 1).
   In brief, this compares the estimated price for transaction submission and compares with the USD value of the token reward earned from fees.
   The subsidy factor is multiplicative so that a subsidy factor of 1 implies you are only willing to submit a solution if the reward it worth at least as much as the transaction cost, while a subsidy factor of 2 means you expect to get half as much in rewards as you are willing to spend.

_Note that_ the default subsidy factor is 1.

2. **Static:**
   Uses `static_min_avg_fee_per_order` and `static_max_gas_price` (in base units - wei).
   Using this strategy with certain configuration values can be dangerous.
   For example, if there are many overlapping open orders for low valued trades and the `static_min_avg_fee_per_order` is set to zero.
   This would mean that running a solver with this EV-strategy would blindly match orders for substantially low reward.
   Similarily, if the `static_max_gas_price` is set too high and you have a solver running during times with high network demand/congestion, gas prices could increase to the point that your solver service submits very expensive transactions.

3. **Combined:**
   This approach uses a hybrid of Dynamic bounded by Static.
   That is,it evaluates and Dynamic with priority.
   If the dynamic evaluation fails or the result is worse (i.e. larger `min-avg-fee` or lower `max-gas-price`) then falls back to the static evalaution instead.
   For somewhat more clarity, the EV-computer deems lower minimum average fee and higher max gas price as "better" so to say that the `min-avg-fee` is bounded _above_ by static evaluation with a preference for the lower value and the `max-gas-price` is bounded _below_ by the static with a preference for the higher.

#### Example EV Configurations

1. Dynamic - default: Without setting any economic viability arguments, a solver will default to Dynamic with a subsidy factor of 1. This means that solutions will only be submittted if the estimated transaction cost is at least equal to the fee-reward.

2. Static with no min average fee and 100 GWei max gas price: This strategy would only prevent a solver from submitting solutions if the current fast-gas price is greater than 100 GWei.
   This could be considered dangerous for reasons describbed above, but may also be beneficial if the solver themselves has an overlapping open order that would yeild a valuable trade. Such a configuration would require the following env vars be set.
   Note that; if the `ECONOMIC_VIABILITY_STRATEGY` is set to static, then both of the following two _must_ be specified.

```sh
ECONOMIC_VIABILITY_STRATEGY=static
STATIC_MIN_AVG_FEE_PER_ORDER=0
STATIC_MAX_GAS_PRICE=100000000000
```

3. Combined with min fee of 10 USD, max gas of 40 GWei and subsidy factor of 1/2: Since this is a hybrid of both Dynamic and Static, one must specify the static environment variables, but is left to choose the if subsidy factor differs from the default of 1.

```sh
ECONOMIC_VIABILITY_STRATEGY=combined
STATIC_MIN_AVG_FEE_PER_ORDER=10
STATIC_MAX_GAS_PRICE=40000000000
ECONOMIC_VIABILITY_SUBSIDY_FACTOR=0.5
```

#### Examples of Costly Solutions

1. On September 17, 2020 a solver spent 3.317499 Ether (1477.95) solving a batch with a fee reward of 283.67410786975546 OWL.
https://etherscan.io/tx/0x182fc2f21d3c2cd26a8567482990f61338eb9842143c9df96b9ee80925c75ba2

2. On September 21, 2020 a solver spent 1.231 ETH (worth 548.13 USD at the time) for a batch of "dust orders" earning a fee-reward of 0.000000155873956 OWL. See the transaction [here](https://etherscan.io/tx/0xbb76c3ab9722fb4aeb5f466dbe2ba8cbda977139228c1c51343caeae1af29086)


A complete history on solutions submitted can be found in the [solutions table](https://explore.duneanalytics.com/queries/1796#3153) of the [Gnosis Protocol Dashboard](https://explore.duneanalytics.com/dashboard/gnosis-dex-protocol).
