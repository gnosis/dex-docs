---
id: intro-learnings
title: Learnings & Improvements from GPv1
sidebar_label: Learnings & Improvements from GPv1
---

Gnosis Protocol v1 was released by the Gnosis team at the beginning of 2020. The protocol had the right intention and design in place, but it was flawed in certain aspects such as:

-   Its non-atomicity did not allow connectivity to existing on-chain liquidity. 

-   Gas cost of placing on-chain orders prevented market makers from offering tight spreads. 

-   Time of trading for most operations (e.g. trading, withdrawing) took too long, making them too cumbersome for a good retail user experience. 

Because of these issues, the protocol was mainly used for IDOs, as its batch trading service was recognized as a fair price finding mechanism due to benefits like:

-   Liquidity 

-   Batch Timing

-   Gas efficiency

Gnosis Protocol v2 is built for retail customers who prefer a simple and smooth user experience and private market makers competing with Uniswap spreads. The main objectives of v2 are:

-   **Gasless UX:** User orders only need to be signed and can be submitted off-chain, so there will be no gas estimations or any possibility of failed transactions. This alone will be a major contributor to a smoother user experience than existing DEX aggregators.

-   **Better prices than existing dex-aggregators:** This is a result of competing solvers along with accounting for [coincidences of wants](https://en.wikipedia.org/wiki/Coincidence_of_wants) between retail customers before invoking other on-chain liquidity sources. For example, two “overlapping” orders can be matched directly with each other before incurring any fees that would be imposed if the traders had traded on Uniswap.

-   **Easy market maker integration:** The protocol is built in a way such that it minimizes the volatility risk for market makers by settling their off-chain signed orders quickly. This allows them to offer tight spreads.

-   **No deposits or withdrawals into an exchange contract:** For a settlement of orders, there is only one Ethereum transaction required from the solver. This means that atomically in a single Ethereum transaction all trades are matched and balances are credited directly.

-   **Access to on-chain liquidity:** This protocol is built to natively interact with any contract on the Ethereum blockchain; this allows trading with any existing atomic exchanges. Thanks to this ability, users have access to existing liquidity pools and hence can expect to get prices that are at least as good as what they would receive elsewhere on-chain.
