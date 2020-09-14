---
id: tutorial-solver
title: Quickstart - Running your own Solver
sidebar_label: Quickstart
---

## Contents

1. [Installation](#installing-driver-tools)
2. [Building The Driver](#building-the-driver)
3. [Configuring Environment](#configuring-environment-variables)
4. [Acquiring the Orderbook](#acquiring-the-orderbook)
5. [Run the Solver](#run-the-solver)
6. [Advanced Configuration](#advanced-configuration)
   1. [Orderbook Filter](#Configuring-an-Orderbook-Filter)

---

## Installing Driver Tools

Clone the dex-services repository, and acquire the project requirements

```sh
git clone https://github.com/gnosis/dex-services.git
```

We demonstrate how to run the open solver.
Once comfortable, the open solver can be adapted to suit your own needs from the [open solver repo](https://github.com/gnosis/dex-open-solver).

## Building The Driver

Build the driver (with the open solver dockerhub image) from within the root directory of `dex-services` repo. This command builds the driver while simultanesouly baking the open solver into the the build.

```sh
docker-compose build --build-arg SOLVER_BASE=gnosispm/dex-open-solver:master stablex-debug
```

Be aware, your Docker installation may require elevated privileges!

Note that, if `SOLVER_BASE` is not specified, the driver's own internal `NaiveSolver` will be used.
Alternatively, if you have your own personalized solver, this image would need to be specified during the build.

## Configuring Environment Variables

The following three environment variables are _required_ when running the dex-services project.
Note that the account corresponding to the private key should be funded with sufficient ETH to pay gas for solution submission.

```sh
export INFURA_KEY=<your infura key>
export PRIVATE_KEY=<your private key>
export NODE_URL=https://mainnet.infura.io/v3/${INFURA_KEY}
```

By placing these values into an `.env` file and sourcing this file, you can avoid providing them as runtime arguments on every execution.

## Acquiring the Orderbook

It can take a very long time for the driver to load the orderbook and this process is also restricted by infura rate-limits so it is best to supply an existing orderbook file, available for download at

- [mainnet](https://gnosis-dfusion-volume-mainnet.s3.amazonaws.com/stablex_orderbook_mainnet.bin)
- [rinkeby](https://gnosis-dfusion-volume-rinkeby.s3.amazonaws.com/stablex_orderbook_rinkeby.bin)

Copy this orderbook file into `dex-services/target` and append `ORDERBOOK_FILE=/app/dex-services/target/stablex_orderbook_mainnet.bin` to your `.env` file from the previous section.
Technically the orderbook file can be saved anywhere, but we have chosen `target` here since it is flagged as an untracked directory in the project's `.gitignore`.

## Run the Solver

First run and enter the solver container

```sh
docker-compose run -v $PWD/:/app/dex-services stablex-debug
```

Since the project was mounted inside the container you can make changes to the driver code and they will be directly reflected on every restart.

The driver can now be run via

```sh
cargo run --bin driver -- --solver-type OpenSolver --node-url $NODE_URL --private-key $PRIVATE_KEY --orderbook-file $ORDERBOOK_FILE
```

or, equivalently, for the simplest and most robust experience, first source your configuration file and run the driver without any additional runtime arguments. That is,

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
2020-09-07T13:29:40.031Z INFO [services_core::orderbook::streamed::updating_orderbook] Received 164 events.
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

To silence these warnings and for an overall cleaner logging experience, you may also want to add the following log argument

```sh
 --log-filter warn,driver=info,services_core=info,services_core::price_estimation::clients::generic_client=error
```

or append this as `LOG_FILTER` to your `.env` file.

and [here](https://rinkeby.etherscan.io/tx/0xef93563c9c79708a613fb77978bff974672679270f9b51f98c19a8ce90d35260) is an example of a successfull solution submission.

## Advanced Configuration

### Configuring an Orderbook Filter

TODO
