const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const network = 'main.ton.dev';
const hello = "Hello main net TON!";

const { DEXRootContract } = require("./js-packages/DEXRoot.js");
const { DEXClientContract } = require("./js-packages/DEXClient.js");
const { DEXPairContract } = require("./js-packages/DEXPair.js");
const { DEXConnectorContract } = require("./js-packages/DEXConnector.js");
const { RootTokenContractContract } = require("./js-packages/RootTokenContract.js");
const { TONTokenWalletContract } = require("./js-packages/TONTokenWallet.js");

TonClient.useBinaryLibrary(libNode);


async function main(client) {


  const rootDefiSpace = '0:5d0f5a8cb443e00934d1bb632acadc036a6c41b59308e3a36d809449a5e777d9';

  const rootAcc = new Account(DEXRootContract, {address:rootDefiSpace,client,});

  response = await rootAcc.runLocal("pairs", {});
  console.log("Contract reacted to your pairs:", response.decoded.output);

  response = await rootAcc.runLocal("pairKeys", {});
  console.log("Contract reacted to your pairKeys:", response.decoded.output);

  response = await rootAcc.runLocal("hashRootTokenContract", {});
  console.log("Contract reacted to your hashRootTokenContract:", response.decoded.output);

  const pairWtonUsdt = '0:5ed8c97d370b1684590e2ba04370734fd5e5fb2c5900d03791aab8b47afd79ef'

  const pairAcc = new Account(DEXPairContract, {address: pairWtonUsdt, client,});

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

  response = await pairAcc.runLocal("balanceReserve", {});
  console.log("Contract reacted to your balanceReserve:", response.decoded.output);

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

}

(async () => {
  const client = new TonClient({network: { endpoints: [network],},});
  try {
    console.log(hello);
    await main(client);
    process.exit(0);
  } catch (error) {
    if (error.code === 504) {
      console.error(`Network is inaccessible. Pls check connection`);
    } else {
      console.error(error);
    }
  }
  client.close();
})();
