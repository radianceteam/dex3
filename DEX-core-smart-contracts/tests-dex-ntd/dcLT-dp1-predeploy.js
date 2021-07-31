const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXRootContract } = require("./DEXRoot.js");
const { DEXClientContract } = require("./DEXClient.js");
const { DEXConnectorContract } = require("./DEXConnector.js");
const { RootTokenContract } = require("./RootTokenContract.js");
const { GiverContract } = require("./Giver.js");
const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const fs = require('fs');

const hex = require('ascii-hex');
const hex2ascii = require('hex2ascii');
function toHex(input) {
  let output = '';
  for (i = 0; i < input.length; i ++){output += hex(input[i]).toString(16)}
  return String(output);
}

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
let currentRootB = pathJsonBTC;
let currentPairPath = pathJsonPairTonBtc;



const name = toHex("DS-WTON/WBTC");
const symbol = toHex("DS-WTON/WBTC");
const decimals = 9;

TonClient.useBinaryLibrary(libNode);

function getShard(string) {
  return string[2];
}

async function main(client) {
  let responce;
  const rootAddr = JSON.parse(fs.readFileSync(pathJsonRoot,{encoding: "utf8"})).address;
  const rootAcc = new Account(DEXRootContract, {address: rootAddr,client,});
  let clientArr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"}));
  const clientKeys = clientArr[0].keys;
  const clientAddr = clientArr[0].address;
  let pubkey = '0x'+clientKeys.keys.public;

  const rootA = JSON.parse(fs.readFileSync(currentRootA,{encoding: "utf8"})).address;
  const rootA_Acc = new Account(RootTokenContract, {address: rootA,client,});
  const rootB = JSON.parse(fs.readFileSync(currentRootB,{encoding: "utf8"})).address;
  const rootB_Acc = new Account(RootTokenContract, {address: rootB,client,});



  let rootABsouint;
  let rootABaddress;
  let status = false;
  let targetShard = getShard(rootAddr);
  let n = 0;
  while (!status) {
    response = await rootAcc.runLocal("getRootTokenAddress", {_answer_id:0,rootPubKey:pubkey,rootSoArg:n,rootName:name,rootSymbol:symbol,rootDecimals:decimals});
    rootABaddress = response.decoded.output.value0;
    rootABsouint = n;
    let shard = getShard(rootABaddress);
    if (shard == targetShard) {
      console.log("Bingo!");
      console.log("rootAB SoArg:", rootABsouint);
      console.log("rootAB Address:", rootABaddress);
      status = true;
    } else {console.log(n);}
    n++;
  }

  let pairAddress;
  let pairSoArg;
  status = false;
  n = 0;
  while (!status) {
    response = await rootAcc.runLocal("getPairAddress", {_answer_id:0,pairPubKey:pubkey,pairSoArg:n,pairCreator:clientAddr,pairRootA:rootA,pairRootB:rootB,pairRootAB:rootABaddress});
    pairAddress = response.decoded.output.value0;
    let shard = getShard(pairAddress);
    if (shard == targetShard) {
      console.log("Bingo!");
      console.log("pair SoArg:", n);
      pairSoArg = n;
      console.log("pairAddress Address:", pairAddress);
      status = true;
    } else {console.log(n);}
    n++;
  }

  let connectorSoArg0;
  status = false;
  n = 0;
  while (!status) {
    response = await rootAcc.runLocal("getConnectorAddress", {_answer_id:0,connectorPubKey:pubkey,connectorSoArg:n,connectorCommander:pairAddress});
    let connectorAddr = response.decoded.output.value0;
    let shardC = getShard(connectorAddr);
    if (shardC == targetShard) {
      console.log("connectorSoArg:", n);
      console.log("getConnectorAddress:", connectorAddr);
      response = await rootA_Acc.runLocal("getWalletAddress", {_answer_id:0, wallet_public_key_:0,owner_address_:connectorAddr});
      let walletAddr = response.decoded.output.value0;
      let shardW = getShard(walletAddr);
      if (shardW == targetShard) {
        console.log("Bingo!");
        connectorSoArg0 = n;
        console.log("getWalletAddress:", walletAddr);
        console.log("connectorSoArg0:", n);
        status = true;
      } else {console.log(n);}
    } else {console.log(n);}
    n++;
  }

  let connectorSoArg1;
  status = false;
  // n = 0;
  while (!status) {
    response = await rootAcc.runLocal("getConnectorAddress", {_answer_id:0,connectorPubKey:pubkey,connectorSoArg:n,connectorCommander:pairAddress});
    let connectorAddr = response.decoded.output.value0;
    let shardC = getShard(connectorAddr);
    if (shardC == targetShard) {
      console.log("connectorSoArg:", n);
      console.log("getConnectorAddress:", connectorAddr);
      response = await rootB_Acc.runLocal("getWalletAddress", {_answer_id:0, wallet_public_key_:0,owner_address_:connectorAddr});
      let walletAddr = response.decoded.output.value0;
      let shardW = getShard(walletAddr);
      if (shardW == targetShard) {
        console.log("Bingo!");
        connectorSoArg1 = n;
        console.log("getWalletAddress:", walletAddr);
        console.log("connectorSoArg1:", n);
        let keyJson = JSON.stringify({address:pairAddress, keys:clientKeys, pairSoArg:pairSoArg, rootSoArg:rootABsouint,rootName:name,rootSymbol:symbol,rootDecimals:decimals, connectorSoArg0:connectorSoArg0, connectorSoArg1:connectorSoArg1});
        fs.writeFileSync( currentPairPath, keyJson,{flag:'w'});
        console.log("Data for the DEXpair written successfully to:", currentPairPath);
        status = true;
      } else {console.log(n);}
    } else {console.log(n);}
    n++;
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
