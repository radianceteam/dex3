const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXClientContract } = require("./DEXClient.js");
const { DEXConnectorContract } = require("./DEXConnector.js");
const { RootTokenContract } = require("./RootTokenContract.js");
const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const fs = require('fs');
const pathJsonRoot = './DEXRootContract.json';
const pathJsonClient = './DEXClientContractLoadTest.json';
const pathJsonClientSoData = './DEXClientSoDataLoadTest.json';
const pathJsonClientSoData1 = './DEXClientSoDataLoadTest1.json';


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


TonClient.useBinaryLibrary(libNode);


async function logEvents(params, response_type) {
  // console.log(`params = ${JSON.stringify(params, null, 2)}`);
  // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

function getShard(string) {
  return string[2];
}


async function main(client) {
  let responce;
  let connectorSoArgArr = JSON.parse(fs.readFileSync(pathJsonClientSoData,{encoding: "utf8"}));
  let connectorSoArgArr1 = [];
  let i = 0;

  let resultArr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"}));
  const pairAddr = JSON.parse(fs.readFileSync(currentPairPath,{encoding: "utf8"})).address;
  for (const item of resultArr) {
    const clientKeys = item.keys;
    const clientAddr = item.address;
    const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});
    // let k = 0;
    // response = await clientAcc.runLocal("getAllDataPreparation", {});
    // let pair = response.decoded.output.pairKeysR[k];
    response = await clientAcc.runLocal("pairs", {});
    let pairRoots = response.decoded.output.pairs[pairAddr];
    let rootA = pairRoots.rootA;
    let rootB = pairRoots.rootB;
    let rootAB = pairRoots.rootAB;
    console.log("Pair rootA:", rootA);
    console.log("Pair rootB:", rootB);
    console.log("Pair rootAB:", rootAB);

    const rootA_Acc = new Account(RootTokenContract,{address:rootA,client,});
    const rootB_Acc = new Account(RootTokenContract,{address:rootB,client,});
    const rootAB_Acc = new Account(RootTokenContract,{address:rootAB,client,});

    let targetShard = getShard(clientAddr);

    let connectorSoArg0;
    status = false;
    n = connectorSoArgArr[i];
    while (!status) {
      response = await clientAcc.runLocal("getConnectorAddress", {_answer_id:0,connectorSoArg:n});
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
    while (!status) {
      response = await clientAcc.runLocal("getConnectorAddress", {_answer_id:0,connectorSoArg:n});
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
          status = true;
        } else {console.log(n);}
      } else {console.log(n);}
      n++;
    }

    let connectorSoArg2;
    status = false;
    while (!status) {
      response = await clientAcc.runLocal("getConnectorAddress", {_answer_id:0,connectorSoArg:n});
      let connectorAddr = response.decoded.output.value0;
      let shardC = getShard(connectorAddr);
      if (shardC == targetShard) {
        console.log("connectorSoArg:", n);
        console.log("getConnectorAddress:", connectorAddr);
        response = await rootAB_Acc.runLocal("getWalletAddress", {_answer_id:0, wallet_public_key_:0,owner_address_:connectorAddr});
        let walletAddr = response.decoded.output.value0;
        let shardW = getShard(walletAddr);
        if (shardW == targetShard) {
          console.log("Bingo!");
          connectorSoArg2 = n;
          console.log("getWalletAddress:", walletAddr);
          console.log("connectorSoArg1:", n);
          connectorSoArgArr1.push(connectorSoArg2);

          status = true;
        } else {console.log(n);}
      } else {console.log(n);}
      n++;
    }


    response = await clientAcc.run("connectRoot", {root:rootA,souint:connectorSoArg0,gramsToConnector:500000000,gramsToRoot:1500000000});
    console.log("Contract reacted to your connectRoot:", response.decoded.output);

    response = await clientAcc.run("connectRoot", {root:rootB,souint:connectorSoArg1,gramsToConnector:500000000,gramsToRoot:1500000000});
    console.log("Contract reacted to your connectRoot:", response.decoded.output);

    response = await clientAcc.run("connectRoot", {root:rootAB,souint:connectorSoArg2,gramsToConnector:500000000,gramsToRoot:1500000000});
    console.log("Contract reacted to your connectRoot:", response.decoded.output);

    console.log("connectorSoArgArr1: ", connectorSoArgArr1);
    let connectorSoArgArrJson1 = JSON.stringify(connectorSoArgArr1);
    fs.writeFileSync( pathJsonClientSoData1, connectorSoArgArrJson1,{flag:'w'});
    console.log("connectorSoArgArr written successfully to:", pathJsonClientSoData1);

    i++;

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
