const qtyA = 100000000000;
const qtyB = 30000000000;
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
let expectLiquidityTokens;
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
  logger.log('ask to provide qtyA:'+qtyA);
  logger.log('ask to provide qtyB:'+qtyB);
  let qtyArr = qtyForProvide(qtyA, qtyB, reserveA, reserveB);
  let provideArr = acceptForProvide(qtyArr[0], qtyArr[1], reserveA, reserveB);
  logger.log('should be provide qtyA:'+provideArr[0]);
  logger.log('should be provide qtyB:'+provideArr[1]);
  expectLiquidityTokens = Math.min(Math.floor((provideArr[0] * totalSupplyBefore)/reserveA), Math.floor((provideArr[1] * totalSupplyBefore)/reserveB));
  logger.log("should get LP tokens: ", expectLiquidityTokens);
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
  response = await clientAcc.runLocal("getBalance", {_answer_id:0});
  grammsBefore = response.decoded.output.value0;
  logger.log("client TON gramm balance before:", grammsBefore);
  timeBefore = Date.now();
  responce = await clientAcc.run("processLiquidity", {pairAddr:pairAddr,qtyA:qtyArr[0],qtyB:qtyArr[1]});
  return responce.decoded.output.processLiquidityStatus;
}

async function main2(client) {
  timeAfter = Date.now();
  timeSwap = timeAfter - timeBefore;
  logger.log("provide speed ms:", timeSwap);
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
  logger.log("totalSupply changed: ", totalSupplyAfter - totalSupplyBefore);
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
  let clientDeltaA = balanceClientA1 - balanceClientA2;
  let clientDeltaB = balanceClientB1 - balanceClientB2;
  let clientDeltaAB = balanceClientAB2 - balanceClientAB1;
  logger.log("client income qty LP token to balanceAB: ", clientDeltaAB);
  logger.log('provided qtyA:'+clientDeltaA);
  logger.log('provided qtyB:'+clientDeltaB);
  let pairDeltaA = reserveA1 - reserveA;
  let pairDeltaB = reserveB1 - reserveB;
  response = await clientAcc.runLocal("getBalance", {_answer_id:0});
  grammsAfter = response.decoded.output.value0;
  logger.log("client TON gramm balance after:", grammsAfter);
  logger.log("provideLiquidity operation cost:", (grammsBefore-grammsAfter)/10**9);
  return [clientDeltaA,pairDeltaA,clientDeltaB,pairDeltaB,clientDeltaAB];
}

setTimeout(function() {
describe('Provide test', async function() {
    it('should check equal client balanceA changed, pair balanceA changed', async function () {
      logger.log('the array to be checked: ', arr[0], arr[1]);
  		expect(arr[0]).to.equal(arr[1]);
    });
    it('should check equal client balanceB changed, pair balanceB changed', async function () {
      logger.log('the array to be checked: ', arr[2], arr[3]);
      expect(arr[2]).to.equal(arr[3]);
    });
    it('should check equal client balanceAB changed, expected qty LP tokens', async function () {
      logger.log('the array to be checked: ', arr[4], expectLiquidityTokens);
      expect(arr[4]).to.equal(expectLiquidityTokens);
    });

});
  run();
}, 30000);

(async () => {
  const client = new TonClient({network: { endpoints: [networks[networkSelector]],},});
  try {
    console.log(hello[networkSelector]);
    const statusSwap = await main(client);
    logger.log('provide status: '+statusSwap);
    arr = await main2(client);
    logger.log('client balanceA changed, pair balanceA changed: ', arr[0],arr[1]);
    logger.log('client balanceB changed, pair balanceB changed: ', arr[2],arr[3]);
    logger.log('client balanceAB changed, expected qty LP tokens: ', arr[4],expectLiquidityTokens);
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
