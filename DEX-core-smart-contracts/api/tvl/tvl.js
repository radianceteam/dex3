const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const fs = require('fs');
const dotenv = require('dotenv').config();


const { DEXRootContract } = require("./js-packages/DEXRoot.js");
const { DEXPairContract } = require("./js-packages/DEXPair.js");
const { RootTokenContractContract } = require("./js-packages/RootTokenContract.js");
const { TONTokenWalletContract } = require("./js-packages/TONTokenWallet.js");

const pathJsonRoot = './DEXRootContract.json';

const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev','https://gql.custler.net'];
const hello = ["Hello localhost!","Hello dev net!","Hello main net!","Hello rust dev net!","Hello fld dev net!"];
const networkSelector = 2;

const hex2ascii = require('hex2ascii');

TonClient.useBinaryLibrary(libNode);

async function main(client) {
  let response;
  const rootAddr = JSON.parse(fs.readFileSync(pathJsonRoot,{encoding: "utf8"})).address;
  const rootAcc = new Account(DEXRootContract, {address:rootAddr,client,});
  console.log("Defispace DEXroot address:", rootAddr);
  const pathJsonClient = './DEXClientContract.json';
  response = await rootAcc.runLocal("pairs", {});
  let pairs = response.decoded.output.pairs;
  response = await rootAcc.runLocal("pairKeys", {});
  let pairsArr = response.decoded.output.pairKeys;
  console.log("all Defispace DEXpairs:", pairsArr);
  console.log('all Defispace DEXpairs details:');
  for (const item of pairsArr) {
    console.log('===========>');
    console.log("pair:", item);
    let rootA = pairs[item].root0;
    let rootB = pairs[item].root1;
    const pairAcc = new Account(DEXPairContract, {address: item,client,});
    response = await pairAcc.runLocal("walletReserve", {});
    let walletRootA = response.decoded.output.walletReserve[rootA];
    let walletRootB = response.decoded.output.walletReserve[rootB];
    const rootAccA = new Account(RootTokenContractContract, {address: rootA,client,});
    const rootAccB = new Account(RootTokenContractContract, {address: rootB,client,});
    response = await rootAccA.runLocal("symbol", {});
    let symbolA = hex2ascii(response.decoded.output.symbol);
    response = await rootAccA.runLocal("decimals", {});
    let decimalsA = response.decoded.output.decimals;
    const walletAccA = new Account(TONTokenWalletContract, {address: walletRootA,client,});
    response = await walletAccA.runLocal("balance", {_answer_id:0});
    let balanceA = response.decoded.output.value0;
    response = await rootAccB.runLocal("symbol", {});
    let symbolB = hex2ascii(response.decoded.output.symbol);
    response = await rootAccB.runLocal("decimals", {});
    let decimalsB =response.decoded.output.decimals;
    const walletAccB = new Account(TONTokenWalletContract, {address: walletRootB,client,});
    response = await walletAccB.runLocal("balance", {_answer_id:0});
    let balanceB = response.decoded.output.value0;
    console.log(symbolA+' / '+symbolB);
    console.log('reserve '+symbolA+' '+(Number(balanceA)/(10**Number(decimalsA)))+' / reserve '+symbolB+' '+(Number(balanceB)/(10**Number(decimalsB))));
    console.log('ReserveWallets:');
    console.log(walletRootA+' / '+walletRootB);
    console.log('TokenRoots:');
    console.log(rootA+' / '+rootB);
  }
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
