const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXClientContract } = require("./DEXClient.js");
const { DEXPairContract } = require("./DEXPair.js");
const { RootTokenContract } = require("./RootTokenContract.js");
const { TONTokenWalletContract } = require("./TONTokenWallet.js");
const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev','https://gql.custler.net'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!","Hello fld dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const fs = require('fs');
const pathJsonRoot = './DEXRootContract.json';
const pathJsonClient = './DEXClientContractLoadTest.json';

const pathJsonPairTonUsdt = './DEXPairContractTonUsdt.json';
const pathJsonPairTonEth = './DEXPairContractTonEth.json';
const pathJsonPairTonBtc = './DEXPairContractTonBtc.json';

const pathJsonWTON = './WTONdata.json';
const pathJsonUSDT = './USDTdata.json';
const pathJsonBTC = './BTCdata.json';
const pathJsonETH = './ETHdata.json';

let currentRootA = pathJsonWTON;
let currentRootB = pathJsonUSDT;
let currentPairPath = pathJsonPairTonUsdt;



const hex = require('ascii-hex');
const hex2ascii = require('hex2ascii');
function toHex(input) {
  let output = '';
  for (i = 0; i < input.length; i ++){output += hex(input[i]).toString(16)}
  return String(output);
}


TonClient.useBinaryLibrary(libNode);

function getShard(string) {
  return string[2];
}

async function logEvents(params, response_type) {
  // console.log(`params = ${JSON.stringify(params, null, 2)}`);
  // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function main(client) {
  let responce;
  let clientArr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"}));
  const clientKeys = clientArr[0].keys;
  const clientAddr = clientArr[0].address;
  const pairAddr = JSON.parse(fs.readFileSync(currentPairPath,{encoding: "utf8"})).address;
  const pairAcc = new Account(DEXPairContract, {address: pairAddr,signer:clientKeys, client,});

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


  const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});
  response = await clientAcc.runLocal("rootWallet", {});
  let walletRootAB = response.decoded.output.rootWallet[rootAB];
  console.log("Client LP walletRootAB:", walletRootAB);
  const walletAccAB = new Account(TONTokenWalletContract, {address: walletRootAB,client,});
  response = await walletAccAB.runLocal("balance", {_answer_id:0});
  console.log("Client LP walletRootAB reacted to your balance:", response.decoded.output);
  // response = await walletAccAB.runLocal("getDetails", {_answer_id:0});
  // console.log("Client LP walletRootAB reacted to your getDetails:", response.decoded.output);

  response = await clientAcc.runLocal("getPairData", {pairAddr:pairAddr});
  console.log("Client getPairData:", response.decoded.output);


  // response = await walletAccA.runLocal("getDetails", {_answer_id:0});
  // console.log("walletAccA reacted to your getDetails:", response.decoded.output);
  // response = await walletAccB.runLocal("getDetails", {_answer_id:0});
  // console.log("walletAccB reacted to your getDetails:", response.decoded.output);

  // response = await walletAccAB.runLocal("getDetails", {_answer_id:0});
  // console.log("walletAccB reacted to your getDetails:", response.decoded.output);


  response = await pairAcc.runLocal("balanceReserve", {});
  console.log("Contract reacted to your balanceReserve:", response.decoded.output);

  response = await pairAcc.runLocal("rootConnector", {});
  console.log("Contract reacted to your rootConnector:", response.decoded.output);

  response = await pairAcc.runLocal("connectors", {});
  console.log("Contract reacted to your connectors:", response.decoded.output);

  response = await pairAcc.runLocal("counterCallback", {});
  console.log("Contract reacted to your counterCallback:", response.decoded.output);

  // response = await pairAcc.runLocal("getCallback", {id:0});
  // console.log("Contract reacted to your getCallback:", response.decoded.output);

  response = await pairAcc.runLocal("processingStatus", {});
  console.log("Contract reacted to your processingStatus:", response.decoded.output);

  response = await pairAcc.runLocal("processingData", {});
  console.log("Contract reacted to your processingData:", response.decoded.output);

  response = await pairAcc.runLocal("processingDest", {});
  console.log("Contract reacted to your processingDest:", response.decoded.output);

}

(async () => {
  const client = new TonClient({network: { endpoints: [networks[networkSelector]],},});
  try {
    console.log(hello[networkSelector]);
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
