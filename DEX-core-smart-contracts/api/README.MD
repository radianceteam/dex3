# API description

## Prerequisites

Node.js latest version installed

## Add Free TON SDK to your App https://github.com/tonlabs/TON-SDK

- Let's start with a clean npm project.

    ```
    mkdir defi-space-dex
    cd defi-space-dex
    npm init -y

    ```

- Now lets install core package and bridge package for Node.js

   ```
   npm i --save @tonclient/core
   npm i --save @tonclient/lib-node
   npm i --save @tonclient/appkit

   ```
- Create index.js file and add this code:

   ```
   const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
   const { libNode } = require("@tonclient/lib-node");
   const { Account } = require("@tonclient/appkit");
   const network = 'main.ton.dev';
   const hello = "Hello main net TON!";

   // YOU WILL ADD DefiSpase js-packages HERE

   TonClient.useBinaryLibrary(libNode);

   async function main(client) {

     // YOU WILL ADD ABI compatible get methods HERE

     }

   (async () => {
    const client = new TonClient({network: { endpoints: network,},});
    try {
     console.log(hello);
     await main(client);
     process.exit(0);
    } catch (error) {
    if (error.code === 504) {
     console.error('Network is inaccessible. Pls check connection');
    } else {
    console.error(error);
    }
    }
   client.close();
    })();

   ```


## Switch  DefiSpase js-packages to your app

 ```
  const { DEXRootContract } = require("./DEXRoot.js");
  const { DEXClientContract } = require("./DEXClient.js");
  const { DEXPairContract } = require("./DEXPair.js");
  const { DEXConnectorContract } = require("./DEXConnector.js");
  const { RootTokenContractContract } = require("./RootTokenContract.js");
  const { TONTokenWalletContract } = require("./TONTokenWallet.js");

  ```

## Run DEX-core-smart-contracts ABI compatible get methods

  Get method is a method that is executed locally and it does not change account state. Get methods are used to retrieve contract data locally for free.
  ABI compatible contract - a contract which has an ABI interface.

### DEX root data    

- add Defi Space dex root address

  `const rootDefiSpace = '0:5d0f5a8cb443e00934d1bb632acadc036a6c41b59308e3a36d809449a5e777d9';`

- create contract obj

  `const rootAcc = new Account(DEXRootContract, {address:rootDefiSpace,client,});`

- add get methods

```
   response = await rootAcc.runLocal("pairs", {});
   console.log("Contract reacted to your pairs:", response.decoded.output);

   response = await rootAcc.runLocal("pairKeys", {});
   console.log("Contract reacted to your pairKeys:", response.decoded.output);

   response = await rootAcc.runLocal("hashRootTokenContract", {});
   console.log("Contract reacted to your hashRootTokenContract:", response.decoded.output);

```
- for get data cli run `node index.js`


### DEX pair data    

- add trading pair WTON - USDT address

  `const pairWtonUsdt = '0:5ed8c97d370b1684590e2ba04370734fd5e5fb2c5900d03791aab8b47afd79ef'`

- create contract obj

  `const pairAcc = new Account(DEXPairContract, {address: pairWtonUsdt, client,});`

- add get methods
```
  response = await pairAcc.runLocal("rootDEX", {});
  console.log("Contract reacted to your rootDEX:", response.decoded.output);

  response = await pairAcc.runLocal("rootA", {});
  console.log("Contract reacted to your rootA:", response.decoded.output);
  let rootA = response.decoded.output.rootA;

  response = await pairAcc.runLocal("rootB", {});
  console.log("Contract reacted to your rootB:", response.decoded.output);
  let rootB = response.decoded.output.rootB;

  response = await pairAcc.runLocal("rootAB", {});
  console.log("Contract reacted to your rootAB:", response.decoded.output);
  let rootAB = response.decoded.output.rootAB;

  response = await pairAcc.runLocal("walletReserve", {});
  console.log("Contract reacted to your walletReserve:", response.decoded.output);
  let walletRootA = response.decoded.output.walletReserve[rootA];
  let walletRootB = response.decoded.output.walletReserve[rootB];

  const walletAccA = new Account(TONTokenWalletContract, {address: walletRootA,client,});
  const walletAccB = new Account(TONTokenWalletContract, {address: walletRootB,client,});

  response = await walletAccA.runLocal("balance", {_answer_id:0});
  console.log("Pair walletAccA reacted to your balance:", response.decoded.output);

  response = await walletAccB.runLocal("balance", {_answer_id:0});
  console.log("Pair walletAccB reacted to your balance:", response.decoded.output);

  response = await pairAcc.runLocal("balanceReserve", {});
  console.log("Contract reacted to your balanceReserve:", response.decoded.output);

```
  - for get data cli run `node index.js`
