---
id: intro-batches
title: What Is a Batch and a Batch ID?
sidebar_label: What Is a Batch and a Batch ID?
---

## What Is a Batch and a Batch ID?

In Gnosis protocol, orders that are sent on chain are not immediately executed, but instead collected and aggregated into batches of 5 minutes.

Every batch is identified by a batch ID, this identifier tells us exactly from which time and until when a batch was "active". This is explained in more detail in the next section

![](https://docs.google.com/drawings/u/1/d/sTFvgp1SyoE9kerlkvlXZVg/image?w=444&h=178&rev=243&ac=1&parent=13dMKSD8lH8ZQ4BTKd_uPDt46KKMJmNEGooa0VsaOexQ)

As soon as a batch is "closed" (does not accept any new orders), so-called solvers can compete to provide solutions for the next four minutes, matching the orders in this closed batch.

## 🌘 Phases of a Batch

Every batch will go through a series of phases. Depending on the phase, the batch will accept orders and solutions or not.

![](https://docs.google.com/drawings/u/1/d/sdK3FfLMkyzJXD5zorja0MA/image?w=632&h=471&rev=908&ac=1&parent=13dMKSD8lH8ZQ4BTKd_uPDt46KKMJmNEGooa0VsaOexQ)

A batch can be in one of the following phases:

- Collecting orders: A batch is in the collecting orders phase as long as it is a current or future batch. Any user may place an order that is from a batch in this phase. The orders have an expiration batch, so they can span multiple batches.

- Accepting Solution: The previous batch doesn't accept orders any more. Solvers will start to find solutions for batch N-1 during the first 4 minutes of batch N. At the end of the 4 minutes, the best solution according to an [objective function](https://docs.gnosis.io/protocol/docs/devguide03/#solution-submission)will define the trades that are executed in that batch. After 4 minutes,  batch N-1 becomes Finalized/Settled, so no more solutions are accepted

- Finalized/Settled: It doesn't accept solutions or new orders. The batch N-2 and older is always finalized. Also, batch N-1 is finalized at minute 4 of the current batch. A finalized batch, if it contains a solution it'll have a series of trades of some tokens. All trades in the same batch have the same trading price for the same token (uniform clearing price).

## ⏱ How Can I Know the Time for a Given Batch ID?

For a given batch ID, we can tell when it was, or it will be, "active" (when we say it's the current batch).

Let's see it with an example for the batch 5,312,588

Since the batches run for 5 min (300 seconds), we can convert the batch into an [epoch](https://en.wikipedia.org/wiki/Epoch):\
5,312,588 \* 300 = 1,593,776,400

If we input this epoch in <https://www.epochconverter.com/>

We can see something like this:

![](https://lh4.googleusercontent.com/tpn1GYBmSmN7xBQt2x7zT4Co9baCO_tMegJiI6jN3cNZWBlXNPIz34Qc511kzR1trS9fio9lvTFt2XGaipnDaxJZNKM052m-4Blt9LhX8Ai__ZsrksfGya-9Rm7Vu68rnVkvtpWC)

This means that batch 5,312,588 was active:

- From: Friday, 3 July 2020 11:40 GMT

- Until: Friday, 3 July 2020 11:45 GMT

Note that they provide the date both, in your local time and in GMT.

## 🆔 How Can I Know the Batch ID for a Given Time?

We can also do the opposite, if we want to know the batch number for a given date, we just input the date in <https://www.epochconverter.com/>. Make sure you select GMT or your local time, depending on which date you are inputting.

![](https://lh6.googleusercontent.com/7y9o1sbxxA71ZIyqUCNlonyF1JlWtZOAGTD07uuXBiuhkmVh4wwgH7mGpEFcrxCemL4emc6x7-rBHoKLb0Dl2awP3EFIoO6KuEBTHVnfLmLQ8CkFbaqPxoLQAqRpjxH49DRi2VzZ)

This would give us the [epoch](https://en.wikipedia.org/wiki/Epoch), 1593776400 in this case. So if we divide by 300, we would get the same batch:

1593776400 / 300 = 5,312,588

## 📏 How Accurate Is the Time of the Batch ID?

The smart contract  uses the Ethereum block time to determine the current batch ID.

Note that this timestamp can be influenced by miners to some degree and therefore slightly differ from the actual time. However, the current block timestamp must be strictly larger than the timestamp of the last block and miners tend to not mine on blocks with a timestamp too far in the future [[1]](https://ethereum.stackexchange.com/a/428) so the discrepancy will be relatively small (in the order of seconds).

## 🐛 When Does an Order Become Tradeable?

![](https://docs.google.com/drawings/u/1/d/s3NV34qNWIEkfWbgLUkuMaQ/image?w=429&h=214&rev=117&ac=1&parent=13dMKSD8lH8ZQ4BTKd_uPDt46KKMJmNEGooa0VsaOexQ)

If a new order is submitted to Gnosis Protocol, and the trader wants it to be settled as soon as possible, the order will only be tradeable after the current batch is closed.

This is because, when you send an order to be part of a batch (N), since the solvers only work with closed batches (they try to solve N-1), only when we are in batch N+1 they would consider our order.

## 🧮Solving a Batch

Solvers work only with batches in the accepting solutions phase (that don't accept more orders, but they aren't finalized yet). They have 4 minutes to find a solution.

![](https://docs.google.com/drawings/u/1/d/sQtqZMAI6WxdoFq1XG2Oj_Q/image?w=541&h=251&rev=1&ac=1&parent=13dMKSD8lH8ZQ4BTKd_uPDt46KKMJmNEGooa0VsaOexQ)

A the previous batch resolution has two important phases (as explained in § Phases of a Batch):

1.  Open for solutions: Minute 0-4 of every batch

- During this period, the smart contract will accept solutions for the previous batch

- If no-one submitted a solution yet, any solver can send his solution as long as:

- It's feasible (follow the order matching rules)

- We are not in the finality period

- If there's a previous solution, any solver can submit another solution, overriding the previous one if:

- It's feasible (follow the order matching rules)

- We are not in the finality period

- The new solution improves significantly (more than 1%) the [objective function](https://docs.gnosis.io/protocol/docs/devguide03/#solution-submission)

1.  Finality period: Last minute of every batch.

- No more solutions are accepted

- Trades for the last batch are final

## 👀 Where Does the Protocol Use Batch IDs?

### Orders

The order validity is expressed in terms of the batch where you want your order to start being tradeable, and where you want your order to expire. E.g. an order valid from batch 7 to 42 can be traded in solutions for batch 7 (when batch 8 is collecting orders) all the way up to (including) solutions for batch 42.

This means that Gnosis Protocol allows you to also create orders that can only be executed in the future, and expire automatically after a defined number of batches.

![](https://docs.google.com/drawings/u/1/d/spaOqZfnhkp_eS4UI1LrYRg/image?w=541&h=212&rev=542&ac=1&parent=13dMKSD8lH8ZQ4BTKd_uPDt46KKMJmNEGooa0VsaOexQ)

### Trades

The solvers try to submit solutions on every batch, if there is any. When they find a solution,  they submit it to the smart contract that settles the trades. These trades happen all at the same time, thus trades in the same batch have the same batch ID (the one of the batch being solved).

![](https://docs.google.com/drawings/u/1/d/sPBBZc4OQGqwNuVMRXU9xrg/image?w=541&h=318&rev=252&ac=1&parent=13dMKSD8lH8ZQ4BTKd_uPDt46KKMJmNEGooa0VsaOexQ)

### Deposits

![](https://docs.google.com/drawings/u/1/d/sEuJ6qA5WoJ7NXfI6ogM8pg/image?w=429&h=231&rev=1&ac=1&parent=13dMKSD8lH8ZQ4BTKd_uPDt46KKMJmNEGooa0VsaOexQ)

When you do a deposit, although you don't need to specify one Batch Id, the deposit has an implicit one associated with it (the current one).

The deposit is credited right away, although since the solvers always work with the previous batch, the deposit will only be available for trading when the current batch ends (between 0-5min). Placing an order and a deposit in the same batch ensures both can be settled when this batch is solved.

### Withdraw Requests

![](https://docs.google.com/drawings/u/1/d/sxJIA7WJv3Hk71GxEx_qrVg/image?w=429&h=289&rev=323&ac=1&parent=13dMKSD8lH8ZQ4BTKd_uPDt46KKMJmNEGooa0VsaOexQ)

When you request a withdrawal, you can optionally specify the batch ID in which you want your withdrawal to happen.

When the current batch ID is greater than the one specified in the request, we say the request has matured.

Before a request has matured, the effective user balance considered by the solvers doesn't take the withdrawal request into account. This allows you to schedule a future withdrawal.

Alternatively, you can omit the batch ID, to specify the current batch, and therefore withdraw as soon as possible.

When a withdrawal request has matured, the balance from the request is deducted from the effective user balance and the user can do the actual withdrawal.

### Withdrawal

![](https://docs.google.com/drawings/u/1/d/sM1lKXq7TKoeTlwv9cYDPsA/image?w=552&h=289&rev=458&ac=1&parent=13dMKSD8lH8ZQ4BTKd_uPDt46KKMJmNEGooa0VsaOexQ)

This operation executes a pending withdrawal request that has matured, effectively sending the tokens from the Gnosis Protocol smart contract to the user's wallet.

Withdrawals don't need to specify the batch ID, but every withdrawal has an associated batch where the user withdrew his/her funds.

## Wrapping Up

Batches and batch IDs are an important part of the protocol. All the operations in the protocol use the batch ID to define the protocol rules, so users and solvers collaborate in a decentralized way.

We saw how the batch IDs are deterministic, and how you can get the actual time in which these batches were or are going to collect orders. These allow users to pre-commit their actions into the protocol ahead of time.

If you want to keep learning about Gnosis Protocol [learn more here](https://docs.gnosis.io/protocol/docs/introduction1/).
