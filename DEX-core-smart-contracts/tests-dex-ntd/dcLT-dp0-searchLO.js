const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXClientContract } = require("./DEXClient.js");
const { DEXPairContract } = require("./DEXPair.js");
const { LimitOrderRootContract } = require("../../Limit-orders-module/ton-packages/LimitOrderRoot.js");
const { LimitOrderRouterContract } = require("../../Limit-orders-module/ton-packages/LimitOrderRouter.js");
const { IndexContract } = require("../../Limit-orders-module/ton-packages/Index.js");
const { LimitOrderContract } = require("../../Limit-orders-module/ton-packages/LimitOrder.js");


const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev','https://gql.custler.net'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!","Hello fld dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const ZERO_ADDRESS = '0:0000000000000000000000000000000000000000000000000000000000000000';


const fs = require('fs');
const pathJsonRoot = './DEXRootContract.json';
const pathJsonClient = './DEXClientContractLoadTest.json';
const pathJsonLimitOrdersRoot = '../../Limit-orders-module/keys/LimitOrderRoot.json';

const pathJsonPairTonUsdt = './DEXPairContractTonUsdt.json';
const pathJsonWTON = './WTONdata.json';
const pathJsonUSDT = './USDTdata.json';

let currentRootA = pathJsonWTON;
let currentRootB = pathJsonUSDT;
let currentPairPath = pathJsonPairTonUsdt;

TonClient.useBinaryLibrary(libNode);

async function main(client) {
  let responce;
  let resultArr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"}));
  const pairAddr = JSON.parse(fs.readFileSync(currentPairPath,{encoding: "utf8"})).address;
  console.log("DEXPairContract Addr:", pairAddr);
  const pairAcc = new Account(DEXPairContract, {address: pairAddr, client,});
  response = await pairAcc.runLocal("rootA", {});
  const rootA = response.decoded.output.rootA;
  console.log("DEXPairContract rootA Addr:", rootA);
  response = await pairAcc.runLocal("rootB", {});
  const rootB = response.decoded.output.rootB;
  console.log("DEXPairContract rootB Addr:", rootB);
  const rootLimitOrdersAddr = JSON.parse(fs.readFileSync(pathJsonLimitOrdersRoot,{encoding: "utf8"})).address;
  console.log("rootLimitOrders Addr:", rootLimitOrdersAddr);
  const rootLimitOrdersAcc = new Account(LimitOrderRootContract, {address:rootLimitOrdersAddr,client,});
  response = await rootLimitOrdersAcc.runLocal("_deployedRouter", {});
  const routerLimitOrders = response.decoded.output._deployedRouter;
  console.log("routerLimitOrders Addr:", routerLimitOrders);
  const routerAcc = new Account(LimitOrderRouterContract, {address:routerLimitOrders,client,});

  response = await routerAcc.runLocal("walletFor", {});
  let routerWalletForRootA = response.decoded.output.walletFor[rootA];
  console.log("routerLimitOrders walletFor rootA:", routerWalletForRootA);
  let routerWalletForRootB = response.decoded.output.walletFor[rootB];
  console.log("routerLimitOrders walletFor rootB:", routerWalletForRootB);


  response = await rootLimitOrdersAcc.runLocal("resolveCodeHash", {});
  let hash = response.decoded.output.codeHash;
  hash = hash.substring(2, hash.length);
  console.log("Contract reacted to your resolveCodeHash:", hash);


  const Datas = (
    await client.net.query_collection({
      collection: "accounts",
      filter: {
        code_hash: {eq: hash},
      },
      result: "id",
    })
  ).result;

  console.log('Datas ', Datas);

  let dataArr = [];

  Datas.map((el) => {dataArr.push(el.id);});

  console.log('dataArr ',  dataArr);



  response = await rootLimitOrdersAcc.runLocal("resolveCodeHashIndex", {
    addrRoot:rootLimitOrdersAddr,
    addrOwner:ZERO_ADDRESS,
    addrPair:pairAddr,
    directionPair:4,
    price:0
  });
  console.log("resolveCodeHashIndex :", response.decoded.output);
  let hashIndex = response.decoded.output.codeHashIndex;
  hashIndex = hashIndex.substring(2, hashIndex.length);
  console.log("Contract reacted to your resolveCodeHashIndex:", hashIndex);

  const Index = (
    await client.net.query_collection({
      collection: "accounts",
      filter: {
        code_hash: {eq: hashIndex},
      },
      result: "id",
    })
  ).result;

  console.log('Index ', Index);

  let indexArr = [];

  Index.map((el) => {indexArr.push(el.id);});

  console.log('indexArr ',  indexArr);


  const indexAcc = new Account(IndexContract, {address:indexArr[0],client,});
  response = await indexAcc.runLocal("getInfo", {});
  console.log('getInfo ', response.decoded.output);

  const dataAddr = response.decoded.output.addrOrder;
  const limitOrderAcc = new Account(LimitOrderContract, {address: dataAddr, client,});
  response = await limitOrderAcc.runLocal("getInfo", {});
  console.log('getInfo ', response.decoded.output);

  resultArr.splice(1, 9);

  for (const item of resultArr) {
    // const item = resultArr[0];
    const clientKeys = item.keys;
    const clientAddr = item.address;
    const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});


    // responce = await clientAcc.run("makeLimitOrderA", {
    //   routerWalletA:routerWalletForRootA,
    //   pairAddr:pairAddr,
    //   qtyA:20000000000,
    //   priceA:362100000,
    // });
    // console.log("Contract reacted to your makeLimitOrderA:", responce.decoded.output);

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
