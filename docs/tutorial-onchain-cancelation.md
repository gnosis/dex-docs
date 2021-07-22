---
id: tutorial-onchain-cancellation
title: Onchain Order Cancellation
sidebar_label: Onchain Order Cancellation
---

Before we begin, please note that our solvers can be quite quick, so it is entirely possible that your order will have already been filled before it can be invalidated onchain.

## Submitting Invalidation

-   After placing your order from the interface, in the top right corner click on "Pending"

-   From here you can navigate to your order in the explorer (click on the purple button "order") and copy the OrderUid ("Order Id") to your clipboard. Note that this Order ID can also be found in the URL here.

<img src="/protocol/docs/assets/Onchaincancel01.png">

-   In the bottom left corner of the web interface there is a link to the settlement contract on Etherscan

<img src="/protocol/docs/assets/Onchaincancel02.png">

-   On Etherscan, click on the "Contract" tab and navigate to "Write Contract".

-   In the "Write Wontract" tab find item number 3 "invalidateOrder"; here you can paste your Order Id and click "write" (note that you will have to send this transaction from the same wallet that you placed the order with)

<img src="/protocol/docs/assets/Onchaincancel03.png">

-   After the order invalidation has been mined, your order has been successfully invalidated!

## Verifying with Orderbook API Services

-   To check that the invalidation was picked up by our orderbook via the [API service](https://protocol-mainnet.dev.gnosisdev.com/api/#/)

-   In the Orderbook API, select the appropriate network from the servers dropdown at the top of the page (for this tutorial we have selected our local instance)

<img src="/protocol/docs/assets/Onchaincancel04.png">

-   Navigate to GET orders/{UID} where you can fetch orders by UID. Click on "Try it out", paste your OrderUid in the corresponding field and click "Execute"

<img src="/protocol/docs/assets/Onchaincancel05.png">

-   You should see your order data and can verify that the order has been invalidated by finding "invalidated": true as part of this order data!

<img src="/protocol/docs/assets/Onchaincancel06.png">

Congratulations you have successfully invalidated your order onchain!