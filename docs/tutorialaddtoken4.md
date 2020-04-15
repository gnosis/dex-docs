---
id: addtoken4
title: Setting approval for your OWL to be spent
sidebar_label: Setting Approval
---

In the next step, you have to approve spending from your wallet. 

Note: An alternative to setting approval using Etherscan, as explained below, is via the user friendly interface [Mesa](https://mesa.eth.link), the first dapp built on Gnosis Protocol. To perform this step on Mesa, head to the 'Balances' tab. 

To continue with this step using Etherscan:

1. Go to https://etherscan.io/token/0x1a5f9352af8af974bfc03399e3767df6370d82e4#writeContract.

2. Connect to your web3 wallet provider.

<img src="/img/addtutorial_setapproval1.png">

3. Use the “approve” functionality: 

    a. Spender is the Gnosis Protocol contract: <span style="color:#DB3A3D">0x6f400810b62df8e13fded51be75ff5393eaa841f</span>.

    b. Value is the amount the contract is allowed to spend with 18 decimals. You will need to give a minimal allowance of 10 OWL (<span style="color:#DB3A3D">10000000000000000000</span>).

    c. Click write and approve the transaction via your wallet provider.

<img src="/img/addtutorial_setapproval2.png">