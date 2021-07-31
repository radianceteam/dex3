const qtyA = 10000000000;
const qtyB = 3783810000;
const testIteration = 200;

const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXClientContract } = require("./DEXClient.js");
const { DEXPairContract } = require("./DEXPair.js");
const { RootTokenContract } = require("./RootTokenContract.js");
const { TONTokenWalletContract } = require("./TONTokenWallet.js");
const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;
const assert = require('assert');
const { expect } = require('chai');
const logger = require('mocha-logger');
const fs = require('fs');

const clientIndex = 3;

const pathJsonRoot = './DEXRootContract.json';
const pathJsonClient = './DEXClientContractLoadTest.json';

const pathJsonPairTonUsdt = './DEXPairContractTonUsdt.json';
const pathJsonWTON = './WTONdata.json';
const pathJsonUSDT = './USDTdata.json';

let currentRootA = pathJsonWTON;
let currentRootB = pathJsonUSDT;
let currentPairPath = pathJsonPairTonUsdt;

let balanceClientA1;
let balanceClientA2;
let balanceClientB1;
let balanceClientB2;
let reserveA;
let reserveB;
let reserveA1;
let reserveB1;
let arr;
let grammsBefore;
let grammsAfter;
let timeBefore;
let timeAfter;
let swapTime;

let timestamp;
let time;


let cumulativeTimeSwap = 0;

TonClient.useBinaryLibrary(libNode);

// Function to get amountOut for swap from amountIn .
function getAmountOut(amountIn, rootIn, rootOut) {
  let amountInWithFee = amountIn * 997;
  let numerator = amountInWithFee * rootOut;
  let denominator = amountInWithFee + rootIn * 1000;
  return Math.floor(numerator/denominator);
}

async function swapA(client,item) {
  let responce;
  const clientKeys = item.keys;
  const clientAddr = item.address;
  const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});
  const pairAddr = JSON.parse(fs.readFileSync(currentPairPath,{encoding: "utf8"})).address;
  const pairAcc = new Account(DEXPairContract, {address: pairAddr, client,});
  response = await pairAcc.runLocal("rootA", {});
  let rootA = response.decoded.output.rootA;
  response = await pairAcc.runLocal("rootB", {});
  let rootB = response.decoded.output.rootB;
  response = await pairAcc.runLocal("balanceReserve", {});
  reserveA = response.decoded.output.balanceReserve[rootA];
  reserveB = response.decoded.output.balanceReserve[rootB];
  logger.log("rate B / A before: ", reserveB / reserveA);
  logger.log('swapA qty:'+qtyA);
  logger.log("% qtyA from reserveA: ", (qtyA / (reserveA/100)).toString());
  let idealQtyB =  Math.round(((qtyA*997/1000)*reserveB) / reserveA);
  logger.log("((qtyA-fee(0.3%))*reserveB) / reserveA): ", idealQtyB);
  let getAmountOutResult = getAmountOut(qtyA, reserveA, reserveB);
  logger.log("computed getAmountOut: ", getAmountOutResult);
  logger.log("shift %: ", ((idealQtyB / getAmountOutResult))*100-100);
  response = await clientAcc.runLocal("rootWallet", {});
  let clientWalletA = response.decoded.output.rootWallet[rootA];
  let clientWalletB = response.decoded.output.rootWallet[rootB];
  const walletAccA = new Account(TONTokenWalletContract, {address: clientWalletA,client,});
  const walletAccB = new Account(TONTokenWalletContract, {address: clientWalletB,client,});
  response = await walletAccA.runLocal("balance", {_answer_id:0});
  balanceClientA1 = response.decoded.output.value0;
  response = await walletAccB.runLocal("balance", {_answer_id:0});
  balanceClientB1 = response.decoded.output.value0;
  response = await clientAcc.runLocal("getBalance", {_answer_id:0});
  grammsBefore = response.decoded.output.value0;
  logger.log("client TON gramm balance before:", grammsBefore);
  timeBefore = Date.now();
  responce = await clientAcc.run("processSwapA", {pairAddr:pairAddr,qtyA:qtyA});
  return responce.decoded.output.processSwapStatus;
}


async function afterSwapA(client,item) {
  timeAfter = Date.now();
  timeSwap = timeAfter - timeBefore;
  logger.log("swapA speed ms:", timeSwap);
  cumulativeTimeSwap = cumulativeTimeSwap + timeSwap;
  let responce;
  const clientKeys = item.keys;
  const clientAddr = item.address;
  const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});
  const pairAddr = JSON.parse(fs.readFileSync(currentPairPath,{encoding: "utf8"})).address;
  const pairAcc = new Account(DEXPairContract, {address: pairAddr, client,});
  response = await pairAcc.runLocal("rootA", {});
  let rootA = response.decoded.output.rootA;
  response = await pairAcc.runLocal("rootB", {});
  let rootB = response.decoded.output.rootB;
  response = await pairAcc.runLocal("balanceReserve", {});
  reserveA1 = response.decoded.output.balanceReserve[rootA];
  reserveB1 = response.decoded.output.balanceReserve[rootB];
  logger.log("rate B / A after: : ", reserveB1 / reserveA1);
  response = await clientAcc.runLocal("rootWallet", {});
  let clientWalletA = response.decoded.output.rootWallet[rootA];
  let clientWalletB = response.decoded.output.rootWallet[rootB];
  const walletAccA = new Account(TONTokenWalletContract, {address: clientWalletA,client,});
  const walletAccB = new Account(TONTokenWalletContract, {address: clientWalletB,client,});
  response = await walletAccA.runLocal("balance", {_answer_id:0});
  balanceClientA2 = response.decoded.output.value0;
  response = await walletAccB.runLocal("balance", {_answer_id:0});
  balanceClientB2 = response.decoded.output.value0;
  let deltaA = balanceClientA1 - balanceClientA2;
  let deltaB = balanceClientB2 - balanceClientB1;
  let checkB = getAmountOut(deltaA, reserveA, reserveB)
  response = await clientAcc.runLocal("getBalance", {_answer_id:0});
  grammsAfter = response.decoded.output.value0;
  logger.log("client TON gramm balance after:", grammsAfter);
  reserveTon = grammsAfter < 1000000000 ? false : true;
  grammsCount = grammsCount + (grammsBefore-grammsAfter);
  logger.log("swapB operation cost:", (grammsBefore-grammsAfter)/10**9);
  return [deltaB,checkB];
}

async function swapB(client,item) {
  let responce;
  const clientKeys = item.keys;
  const clientAddr = item.address;
  const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});
  const pairAddr = JSON.parse(fs.readFileSync(currentPairPath,{encoding: "utf8"})).address;
  const pairAcc = new Account(DEXPairContract, {address: pairAddr, client,});
  response = await pairAcc.runLocal("rootA", {});
  let rootA = response.decoded.output.rootA;
  response = await pairAcc.runLocal("rootB", {});
  let rootB = response.decoded.output.rootB;
  response = await pairAcc.runLocal("balanceReserve", {});
  reserveA = response.decoded.output.balanceReserve[rootA];
  reserveB = response.decoded.output.balanceReserve[rootB];
  logger.log("rate A / B before: ", reserveA / reserveB);
  logger.log('swapB qty:'+qtyB);
  logger.log("% qtyB from reserveB: ", (qtyB / (reserveB/100)).toString());
  let idealQtyA =  Math.round(((qtyB*997/1000)*reserveA) / reserveB);
  logger.log("((qtyB-fee(0.3%))*reserveB) / reserveA): ", idealQtyA);
  let getAmountOutResult = getAmountOut(qtyB, reserveB, reserveA);
  logger.log("computed getAmountOut: ", getAmountOutResult);
  logger.log("shift %: ", ((idealQtyA / getAmountOutResult))*100-100);
  response = await clientAcc.runLocal("rootWallet", {});
  let clientWalletA = response.decoded.output.rootWallet[rootA];
  let clientWalletB = response.decoded.output.rootWallet[rootB];
  const walletAccA = new Account(TONTokenWalletContract, {address: clientWalletA,client,});
  const walletAccB = new Account(TONTokenWalletContract, {address: clientWalletB,client,});
  response = await walletAccA.runLocal("balance", {_answer_id:0});
  balanceClientA1 = response.decoded.output.value0;
  response = await walletAccB.runLocal("balance", {_answer_id:0});
  balanceClientB1 = response.decoded.output.value0;
  response = await clientAcc.runLocal("getBalance", {_answer_id:0});
  grammsBefore = response.decoded.output.value0;
  logger.log("client TON gramm balance before:", grammsBefore);
  timeBefore = Date.now();
  responce = await clientAcc.run("processSwapB", {pairAddr:pairAddr,qtyB:qtyB});
  return responce.decoded.output.processSwapStatus;
}


async function afterSwapB(client,item) {
  timeAfter = Date.now();
  timeSwap = timeAfter - timeBefore;
  logger.log("swapB speed ms:", timeSwap);
  cumulativeTimeSwap = cumulativeTimeSwap + timeSwap;
  let responce;
  const clientKeys = item.keys;
  const clientAddr = item.address;
  const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});
  const pairAddr = JSON.parse(fs.readFileSync(currentPairPath,{encoding: "utf8"})).address;
  const pairAcc = new Account(DEXPairContract, {address: pairAddr, client,});
  response = await pairAcc.runLocal("rootA", {});
  let rootA = response.decoded.output.rootA;
  response = await pairAcc.runLocal("rootB", {});
  let rootB = response.decoded.output.rootB;
  response = await pairAcc.runLocal("balanceReserve", {});
  reserveA1 = response.decoded.output.balanceReserve[rootA];
  reserveB1 = response.decoded.output.balanceReserve[rootB];
  logger.log("rate A / B after: : ", reserveA1 / reserveB1);
  response = await clientAcc.runLocal("rootWallet", {});
  let clientWalletA = response.decoded.output.rootWallet[rootA];
  let clientWalletB = response.decoded.output.rootWallet[rootB];
  const walletAccA = new Account(TONTokenWalletContract, {address: clientWalletA,client,});
  const walletAccB = new Account(TONTokenWalletContract, {address: clientWalletB,client,});
  response = await walletAccA.runLocal("balance", {_answer_id:0});
  balanceClientA2 = response.decoded.output.value0;
  response = await walletAccB.runLocal("balance", {_answer_id:0});
  balanceClientB2 = response.decoded.output.value0;
  let deltaA = balanceClientA2 - balanceClientA1;
  let deltaB = balanceClientB1 - balanceClientB2;
  let checkA = getAmountOut(deltaB, reserveB, reserveA)
  response = await clientAcc.runLocal("getBalance", {_answer_id:0});
  grammsAfter = response.decoded.output.value0;
  logger.log("client TON gramm balance after:", grammsAfter);
  reserveTon = grammsAfter < 1000000000 ? false : true;
  grammsCount = grammsCount + (grammsBefore-grammsAfter);
  logger.log("swapB operation cost:", (grammsBefore-grammsAfter)/10**9);
  return [deltaA,checkA];
}

let testCount = 1;
let msgCount = 0;
let grammsCount = 0;
let duration;
let timeStart;
let timeEndIteration;
let reserveTon = true;
async function testSwap(client) {
  timeStart = Date.now();
  const dexrootAddr = JSON.parse(fs.readFileSync(pathJsonRoot,{encoding: "utf8"})).address;
  const pairAddr = JSON.parse(fs.readFileSync(currentPairPath,{encoding: "utf8"})).address;
  let resultArr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"}));
  let item = resultArr[clientIndex];
  logger.log("DEX root address: ", dexrootAddr);
  logger.log("current dexclient address: ", item.address);
  logger.log("current dexpair address: ", pairAddr);
  logger.log("timestamp: ", Date.now());
  while (!(testCount > testIteration) && reserveTon) {
    timestamp = Date.now();
    time = new Date(timestamp);
    logger.log(clientIndex,' ========> test count:', testCount," time: ", time.toGMTString());
    const statusSwapA = await swapA(client,item);
    logger.log('swapA status: '+statusSwapA);
    arr = await afterSwapA(client,item);
    logger.log('client balanceB changed, computed getAmountOut', arr);
    const statusSwapB = await swapB(client,item);
    logger.log('swapB status: '+statusSwapB);
    arr = await afterSwapB(client,item);
    logger.log('client balanceB changed, computed getAmountOut', arr);
    timeEndIteration = Date.now();
    logger.log('  ========> cumulutive data:');
    logger.log('test count:', testCount);
    msgCount = msgCount + 16;
    logger.log('load msg count:', msgCount);
    duration = (timeEndIteration - timeStart)/1000;
    logger.log('work duration sec:', duration);
    logger.log('msg/sec speed:', msgCount / duration);
    logger.log('average swap time sec:', (cumulativeTimeSwap/(testCount*2))/1000);
    logger.log('TON spend:', grammsCount/10**9);

    testCount++;
  }
}

(async () => {
  const client = new TonClient({network: { endpoints: [networks[networkSelector]],},});
  try {
    console.log(hello[networkSelector]);
    await testSwap(client);

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
