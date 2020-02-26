---
id: devguide02
title: Trading Process
sidebar_label: Trading Process
---

<img src="/img/tradingprocess.png">

The trading process is divided into 5 minute long batches (epochs). In order to trade, users need to deposit funds into the exchange and place a limit sell-order. Funds and orders submitted in a given batch are only tradeable once the order collection phase of this batch concludes (max. 5 minutes later).

Orders can carry a “valid until” batch number, limiting the time they are tradeable. They can also be cancelled. An order cancelled in a given batch can still be traded in the batch that is currently being solved.

5 minutes after the start of a batch, the order collection phase ends. The batch is then free to be “solved” (balances and orders are immutable as of that point). The smart contract accepts settlement proposals from anyone. It checks that a solution is valid (cf. below for requirements) and if significantly “better” (cf. below for quantification) than the current-best solution. If the checks are positive, it replaces the proposed trade-settlement with the new one.
After 4 minutes, no more solutions are accepted. This gives 1 minute of “trade finality” in which orders for the next batch can still be altered.

The exchange creates a new batch every 5 minutes. Therefore at any point in time there is a batch collecting orders (while another is being solved or was solved with the last minute).
In order to extract proceeds from the exchange, users place a withdraw request. This will reduce their balance in the batch that is currently being traded. A withdraw request matures when the batch, that is currently being solved, settles. Thus, the withdrawal can only be claimed in the next epoch. This is because the available balance might depend on the settlement of the last batch in which the withdrawal was not yet announced. Withdraw requests can be made “optimistically” in advance (e.g. when placing an order for 30 minutes) in order to avoid extra delay after a trading window ends.
