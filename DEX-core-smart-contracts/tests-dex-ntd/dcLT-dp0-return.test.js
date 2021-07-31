let qtyAB = 30000000000;
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
let balanceClientAB1;
let balanceClientAB2;
let reserveA;
let reserveB;
let reserveA1;
let reserveB1;
let totalSupplyBefore;
let totalSupplyAfter;
let expectReturningTokens;
let expectReceivingA;
let expectReceivingB;
let arr;
let grammsBefore;
let grammsAfter;
let timeBefore;
let timeAfter;
let swapTime;

TonClient.useBinaryLibrary(libNode);

// Function to get amountOut for swap from amountIn .
function getAmountOut(amountIn, rootIn, rootOut) {
  let amountInWithFee = amountIn * 997;
  let numerator = amountInWithFee * rootOut;
  let denominator = amountInWithFee + rootIn * 1000;
  return Math.floor(numerator/denominator);
}

function qtyOneForOther(amountIn, reserveIn, reserveOut) {
  return Math.floor((amountIn *  reserveOut) / reserveIn);
}

// Function for calculating accepted tokens
function qtyForProvide(amountA, amountB, reserveA, reserveB) {
  let argA = qtyOneForOther(amountB, reserveB, reserveA);
  let argB = qtyOneForOther(amountA, reserveA, reserveB);
  let min = 1;
  let minAmountA = Math.min(amountA, argA);
  let minAmountB = Math.min(amountB, argB);
  let crmin = Math.min(reserveA, reserveB);
  let crmax = Math.max(reserveA, reserveB);
  let crquotient = ~~(crmax/crmin);
  let crremainder = crmax%crmin;
  let amountMin = Math.min(minAmountA,minAmountB)+1;
  let amountOther = amountMin * crquotient + (amountMin * crremainder) / crmin ;
  let acceptForProvideA = minAmountA < minAmountB ? amountMin : amountOther;
  let acceptForProvideB = minAmountB < minAmountA ? amountMin : amountOther;
  return [Math.floor(acceptForProvideA), Math.floor(acceptForProvideB)];
}

// Function for calculating accepted tokens
function acceptForProvide(amountA, amountB, reserveA, reserveB) {
  let argA = qtyOneForOther(amountB, reserveB, reserveA);
  let argB = qtyOneForOther(amountA, reserveA, reserveB);
  let minAmountA = Math.min(amountA, argA);
  let minAmountB = Math.min(amountB, argB);
  let crmin = Math.min(reserveA, reserveB);
  let crmax = Math.max(reserveA, reserveB);
  let crquotient = ~~(crmax/crmin);
  let crremainder = crmax%crmin;
  let amountMin = Math.min(minAmountA,minAmountB);
  let amountOther = amountMin * crquotient + (amountMin * crremainder) / crmin ;
  let acceptForProvideA = minAmountA < minAmountB ? amountMin : amountOther;
  let acceptForProvideB = minAmountB < minAmountA ? amountMin : amountOther;
  return [Math.floor(acceptForProvideA), Math.floor(acceptForProvideB)];
}

async function main(client) {
  let responce;
  let clientArr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"}));
  const clientKeys = clientArr[0].keys;
  const clientAddr = clientArr[0].address;
  const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});
  const pairAddr = JSON.parse(fs.readFileSync(currentPairPath,{encoding: "utf8"})).address;
  const pairAcc = new Account(DEXPairContract, {address: pairAddr, client,});
  response = await pairAcc.runLocal("rootA", {});
  let rootA = response.decoded.output.rootA;
  response = await pairAcc.runLocal("rootB", {});
  let rootB = response.decoded.output.rootB;
  response = await pairAcc.runLocal("rootAB", {});
  let rootAB = response.decoded.output.rootAB;
  response = await pairAcc.runLocal("balanceReserve", {});
  reserveA = response.decoded.output.balanceReserve[rootA];
  reserveB = response.decoded.output.balanceReserve[rootB];
  logger.log("reserveA before: ", reserveA);
  logger.log("reserveB before: ", reserveB);
  response = await pairAcc.runLocal("totalSupply", {});
  totalSupplyBefore= response.decoded.output.totalSupply;
  logger.log("totalSupply before: ", totalSupplyBefore);
  response = await clientAcc.runLocal("rootWallet", {});
  let clientWalletA = response.decoded.output.rootWallet[rootA];
  let clientWalletB = response.decoded.output.rootWallet[rootB];
  let clientWalletAB = response.decoded.output.rootWallet[rootAB];
  const walletAccA = new Account(TONTokenWalletContract, {address: clientWalletA,client,});
  const walletAccB = new Account(TONTokenWalletContract, {address: clientWalletB,client,});
  const walletAccAB = new Account(TONTokenWalletContract, {address: clientWalletAB,client,});
  response = await walletAccA.runLocal("balance", {_answer_id:0});
  balanceClientA1 = response.decoded.output.value0;
  response = await walletAccB.runLocal("balance", {_answer_id:0});
  balanceClientB1 = response.decoded.output.value0;
  response = await walletAccAB.runLocal("balance", {_answer_id:0});
  balanceClientAB1 = response.decoded.output.value0;
  logger.log('ask to return qtyAB:'+qtyAB);
  logger.log('balance AB:'+balanceClientAB1);
  qtyAB = qtyAB>balanceClientAB1?balanceClientAB1:qtyAB;
  expectReturningTokens = qtyAB;
  expectReceivingA = Math.floor(qtyAB*(reserveA/totalSupplyBefore));
  expectReceivingB = Math.floor(qtyAB*(reserveB/totalSupplyBefore));
  logger.log('expected returning qtyAB:'+expectReturningTokens);
  logger.log('expected receiving qtyA:'+expectReceivingA);
  logger.log('expected receiving qtyB:'+expectReceivingB);
  response = await clientAcc.runLocal("getBalance", {_answer_id:0});
  grammsBefore = response.decoded.output.value0;
  logger.log("client TON gramm balance before:", grammsBefore);
  timeBefore = Date.now();
  responce = await clientAcc.run("returnLiquidity", {pairAddr:pairAddr,tokens:qtyAB});
  return responce.decoded.output.returnLiquidityStatus;
}

async function main2(client) {
  timeAfter = Date.now();
  timeSwap = timeAfter - timeBefore;
  logger.log("return speed ms:", timeSwap);
  let responce;
  let clientArr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"}));
  const clientKeys = clientArr[0].keys;
  const clientAddr = clientArr[0].address;
  const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});
  const pairAddr = JSON.parse(fs.readFileSync(currentPairPath,{encoding: "utf8"})).address;
  const pairAcc = new Account(DEXPairContract, {address: pairAddr, client,});
  response = await pairAcc.runLocal("rootA", {});
  let rootA = response.decoded.output.rootA;
  response = await pairAcc.runLocal("rootB", {});
  let rootB = response.decoded.output.rootB;
  response = await pairAcc.runLocal("rootAB", {});
  let rootAB = response.decoded.output.rootAB;
  response = await pairAcc.runLocal("balanceReserve", {});
  reserveA1 = response.decoded.output.balanceReserve[rootA];
  reserveB1 = response.decoded.output.balanceReserve[rootB];
  response = await pairAcc.runLocal("totalSupply", {});
  totalSupplyAfter = response.decoded.output.totalSupply;
  logger.log("totalSupply after: ", totalSupplyAfter);
  logger.log("totalSupply changed: ", totalSupplyBefore - totalSupplyAfter);
  response = await clientAcc.runLocal("rootWallet", {});
  let clientWalletA = response.decoded.output.rootWallet[rootA];
  let clientWalletB = response.decoded.output.rootWallet[rootB];
  let clientWalletAB = response.decoded.output.rootWallet[rootAB];
  const walletAccA = new Account(TONTokenWalletContract, {address: clientWalletA,client,});
  const walletAccB = new Account(TONTokenWalletContract, {address: clientWalletB,client,});
  const walletAccAB = new Account(TONTokenWalletContract, {address: clientWalletAB,client,});
  response = await walletAccA.runLocal("balance", {_answer_id:0});
  balanceClientA2 = response.decoded.output.value0;
  response = await walletAccB.runLocal("balance", {_answer_id:0});
  balanceClientB2 = response.decoded.output.value0;
  response = await walletAccAB.runLocal("balance", {_answer_id:0});
  balanceClientAB2 = response.decoded.output.value0;
  let clientDeltaA = balanceClientA2 - balanceClientA1;
  let clientDeltaB = balanceClientB2 - balanceClientB1;
  let clientDeltaAB = balanceClientAB1 - balanceClientAB2;
  logger.log("client outgoing qty LP token from balanceAB: ", clientDeltaAB);
  logger.log('client get qtyA:'+clientDeltaA);
  logger.log('client get qtyB:'+clientDeltaB);
  let pairDeltaA = reserveA - reserveA1;
  let pairDeltaB = reserveB - reserveB1;
  response = await clientAcc.runLocal("getBalance", {_answer_id:0});
  grammsAfter = response.decoded.output.value0;
  logger.log("client TON gramm balance after:", grammsAfter);
  logger.log("returnLiquidity operation cost:", (grammsBefore-grammsAfter)/10**9);
  return [clientDeltaA,pairDeltaA,clientDeltaB,pairDeltaB,clientDeltaAB];
}

setTimeout(function() {
describe('Return test', async function() {
    it('should check equal client balanceA changed, pair balanceA changed', async function () {
      logger.log('the array to be checked: ', arr[0], arr[1]);
  		expect(arr[0]).to.equal(arr[1]);
    });
    it('should check equal client balanceB changed, pair balanceB changed', async function () {
      logger.log('the array to be checked: ', arr[2], arr[3]);
      expect(arr[2]).to.equal(arr[3]);
    });
    it('should check equal client balanceAB changed, expected returning LP tokens', async function () {
      logger.log('the array to be checked: ', arr[4], expectReturningTokens);
      expect(arr[4]).to.equal(expectReturningTokens);
    });
    it('should check equal client balanceA changed, expected receiving qtyA', async function () {
      logger.log('the array to be checked: ', arr[0], expectReceivingA);
      expect(arr[0]).to.equal(expectReceivingA);
    });
    it('should check equal client balanceB changed, expected receiving qtyB', async function () {
      logger.log('the array to be checked: ', arr[2], expectReceivingB);
      expect(arr[2]).to.equal(expectReceivingB);
    });

});
  run();
}, 30000);


(async () => {
  const client = new TonClient({network: { endpoints: [networks[networkSelector]],},});
  try {
    console.log(hello[networkSelector]);
    const statusReturn = await main(client);
    logger.log('return status: '+statusReturn);
    arr = await main2(client);
    logger.log('client balanceA changed, pair balanceA changed: ', arr[0],arr[1]);
    logger.log('client balanceB changed, pair balanceB changed: ', arr[2],arr[3]);
    logger.log('client balanceAB changed, expected returning qty LP tokens: ', arr[4],expectReturningTokens);
    // process.exit(0);
  } catch (error) {
    if (error.code === 504) {
      console.error(`Network is inaccessible. Pls check connection`);
    } else {
      console.error(error);
    }
  }
  client.close();
})();
