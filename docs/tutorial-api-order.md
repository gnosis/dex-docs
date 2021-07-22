---
id: tutorial-api-order
title: How to submit orders via the API
sidebar_label: How to submit orders via the API
---

In case you would like to submit orders programmatically instead of via a UI, this tutorial will show you how to do that. There are a couple of use cases why you might want to do that

1.  Submitting "take profit" limit orders, where the current market price would not allow execution (not yet supported by the CowSwap interface)
2.  Actively listen for user orders and programmatically submitting matching orders them via a trading bot (active market making without order cost)
3.  Other more automated trading strategies

The general API documentation can be found here: <https://protocol-mainnet.dev.gnosisdev.com/api/>

We have also written a small [trading bot script](https://github.com/gnosis/gp-v2-trading-bot) which can serve as inspiration.

##  Set Allowance for the sell token
  

In order for your order to be tradable, the owner account has to allow the [GPv2 Allowance Manager](https://etherscan.io/address/0x7d8e28184408bc4790e79fd08ed67f7ebacbebcc) to spend the sell tokens on their behalf. You may either set a limited allowance (at least the amount of tokens you intend to sell) or an unlimited allowance (2**256 - 1)

This can either be done using Etherscan, e.g. to set an unlimited allowance for USDC by visiting <https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#writeProxyContract> and setting

<img src="/protocol/docs/assets/tutapiorders.png">

It can also be done programmatically e.g. using the following ethers typescript snippet:

```ts

import ERC20 from "@openzeppelin/contracts/build/contracts/ERC20.json";

import { Contract, ethers } from "ethers";

const address = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" // USDC

const erc20 = new Contract(address, ERC20.abi, ethers.provider);

const tx = await erc20

  .connect("your address")

  .approve("0x7D8E28184408Bc4790E79Fd08ED67f7eBaCBEbcc", ethers.constants.MaxUint256);

await tx.wait();

```

## Query the fee endpoint


Placing an order is free in Gnosis Protocol and only requires signing an off chain message. Order execution is then done by so-called solvers and doesn't require you to pay any gas.

If your order is matched and executed the gas cost of settling it is taken over by the solver. As a consequence solvers have to be reimbursed that cost in the form of a trading fee. This fee is charged in the token you are selling and the exact amount depends on the route and amount you are trading.

The API provides an endpoint to get a fee estimate for your order. Orders that don't specify a high enough fee will be rejected by the API. The fee estimate is valid for a short period of time. In order to quote the current fee to trade 10,000 USDC for WETH you can query:

```

<https://protocol-mainnet.gnosis.io/api/v1/fee?sellToken=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&buyToken=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&amount=10000000000&kind=sell>

{"expirationDate":"2021-07-14T14:40:34.533630298Z","amount":"14075734"}

```

Note, that the amount is given in "atoms" (smallest unit of the token, e.g. wei for ETH). With USDC having 6 decimals, 10000 USDC equals 10e10 atoms.

In the example above the minimum fee for the order would be about 14 USDC.

## Query the price estimation endpoint *(Optional)*

This step is only necessary, if you want to place an order that has a good chance of getting matched quickly. If you want to place a firm limit order, you may as well set a custom limit price without doing another request.

To query the price estimate for the above mentioned trade, query

```

<https://protocol-mainnet.gnosis.io/api/v1/markets/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/sell/10000000000>

{"amount":"4974645591426981555","token":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}

```

The response contains the token that you will be receiving (or need to sell in case of a buy order) in order to disambiguate the routing semantics (what it means to sell in the USDC/WETH market). 

Again, amounts are denominated in atoms. The response indicates that you could expect to receive 4.97 ETH for 10k USDC.

This price estimate only considers our baseline liquidity sources (which is a limited but growing subset of all on chain liquidity). Some of our solvers (e.g. DEX Aggregators) might be able to offer better prices. You can also use their APIs directly in order to get price estimates.

Note, that the estimate doesn't include any slippage tolerance, so we advise that on your actual order you add a slippage tolerance of at least 0.3%. Our solvers ensure that setting a slippage on your order doesn't make you prone to MEV attacks (the slippage that solvers set on the actual on chain interactions are always close to 0).

## Signing the order

We will resume the example from above, setting the validity (Unix timestamp) to [August 4th 2021](https://www.epochconverter.com/?q=1628035200). We use `keccak(GPv2 Place Order Tutorial)` as appData (you can use your individual 32 bytes to identify the "source" of your orders).

Our typescript library provides a convenient way to create valid signatures for your order.

```ts

import {

  domain,

  Order,

  SigningScheme,

  signOrder,

} from "@gnosis.pm/gp-v2-contracts"

const [trader] = await ethers.getSigners();

const order = {

    sellToken: 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48,

    buyToken: 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2,

    sellAmount: 10000000000,

    buyAmount: 4959721654652700610,

    validTo: 1628035200,

    appData: 0xf785fae7a7c5abc49f3cd6a61f6df1ff26433392b066ee9ff2240ff1eb7ab6e4,

    feeAmount: 14075734,

    kind: OrderKind.SELL,

    partiallyFillable: false,

    receiver: ethers.constants.AddressZero,

  }

const raw_signature = await signOrder(

      domain(1, "0x3328f5f2cEcAF00a2443082B657CedEAf70bfAEf"),

      order,

      trader,

      SigningScheme.ETHSIGN

    );

// Needed to turn the three part object into a single bytestring

const signature = ethers.utils.joinSignature(rawSignature.data);

```

If you are using a different programming language you may have to write your own singing logic. 

[Here](https://github.com/gnosis/oba-services/blob/4a2f0702014c24052909bfec6bf98b7ba50890f1/model/src/order.rs#L149) is a reference implementation in rust. The domain separator can be queried from the [Settlement Contract](https://etherscan.io/address/0x3328f5f2cEcAF00a2443082B657CedEAf70bfAEf#readContract).

The source of truth for signature verification is the smart contract's implementation of the [order digest](https://github.com/gnosis/gp-v2-contracts/blob/main/src/contracts/libraries/GPv2Order.sol#L134) and how it gets verified given [different signing schemes](https://github.com/gnosis/gp-v2-contracts/blob/main/src/contracts/mixins/GPv2Signing.sol#L141). 

## Placing the order

Order creation is happening via a POST request to the following endpoint:

```

https://protocol-mainnet.gnosis.io/api/v1/orders

```

The payload needs to be a json encoded object. Our example order would look like this:

```

{

        "sellToken": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

        "buyToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",

        "sellAmount": "10000000000",

        "buyAmount": "4959721654652700610",

        "validTo": 1628035200,

        "appData": "0xf785fae7a7c5abc49f3cd6a61f6df1ff26433392b066ee9ff2240ff1eb7ab6e4"

        "feeAmount": "14075734",

        "kind": "sell",

        "partiallyFillable": false,

        "signature": <0x encoded signature from step 4>,

        "signingScheme": "ethsign",

      }

```

Note, that uint256 fields need to be encoded as long decimal strings instead of numbers. Receiver is optional (if funds are intended to be sent to another account) and the trader address is automatically derived from the signature.

In case of success the API should return the order UID which you can use to track the status of your order either in the [GP Explorer](https://gnosis-protocol.io/), or programmatically below:

## Checking order status


In order to follow if/when your order has been match you can either subscribe to "Trade" events by the [Settlement Contract](https://etherscan.io/address/0x3328f5f2cEcAF00a2443082B657CedEAf70bfAEf):

```ts

import GPv2SettlementArtefact from "@gnosis.pm/gp-v2-contracts/deployments/mainnet/GPv2Settlement.json";

import { Contract, ethers } from "ethers";\
const uid = <uid to follow>;

const TRADE_TIMEOUT_SECONDS = 30*60

const settlement = new Contract("0x3328f5f2cEcAF00a2443082B657CedEAf70bfAEf", GPv2SettlementArtefact.abi, ethers.provider)

const traded = new Promise((resolve: (value: boolean) => void) => {

    ethers.provider.on(settlement.filters.Trade(trader), (log) => {

      // Hacky way to verify that the UID is part of the event data

      if (log.data.includes(uid.substring(2))) {

        resolve(true);

      }

    });

  });

const timeout = new Promise((resolve: (value: boolean) => void) => {

    setTimeout(resolve, TRADE_TIMEOUT_SECONDS*1000, false);

  });

const hasTraded = await Promise.race([traded, timeout]);

```

This script waits up to 30 minutes to find a trade event before eventually timing out.

Or you can query our API using the order ID that you generated earlier

```

<https://protocol-mainnet.gnosis.io/api/v1/trades?orderUid=0xc21b7756caf1f6df13e9947767204620371ca791a4b91db8620f04905d25b608e0b3700e0aadcb18ed8d4bff648bc99896a18ad160ef0bca>

[

  {

    "blockNumber": 12826021,

    "logIndex": 31,

    "orderUid": "0xc21b7756caf1f6df13e9947767204620371ca791a4b91db8620f04905d25b608e0b3700e0aadcb18ed8d4bff648bc99896a18ad160ef0bca",

    "buyAmount": "80623566",

    "sellAmount": "100000000000000000000",

    "sellAmountBeforeFees": "89287648398497935360",

    "owner": "0xe0b3700e0aadcb18ed8d4bff648bc99896a18ad1",

    "buyToken": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

    "sellToken": "0x1a5f9352af8af974bfc03399e3767df6370d82e4",

    "txHash": "0xbcdd49946b56564b7ba7403ab63a2316ece5c6e12657782ffda620d192e591a0"

  }

]

```

If your order was partially fillable and traded in multiple chunks you may find one entry per trade.

This is it. We hope you have been able to follow this tutorial end to end and made a successful trade. If you have any questions or are planning to write some utility software (e.g. signing logic in another language) please reach out to us on Discord, we are always happy to help.

**Happy Trading!**