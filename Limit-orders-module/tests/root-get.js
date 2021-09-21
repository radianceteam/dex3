const { TonClient, abiContract, signerKeys } = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { LimitOrderRootContract } = require("../ton-packages/LimitOrderRoot.js");
const { LimitOrderContract } = require("../ton-packages/LimitOrder.js");
const { IndexContract } = require("../ton-packages/Index.js");
const { LimitOrderRouterContract } = require("../ton-packages/LimitOrderRouter.js");
const { GiverContract } = require("../ton-packages/Giver.js");
const fs = require('fs');
const pathJson = '../keys/LimitOrderRoot.json';

const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net1.ton.dev','main.ton.dev','rustnet.ton.dev','https://gql.custler.net'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!","Hello fld dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const zeroAddress = '0:0000000000000000000000000000000000000000000000000000000000000000';

TonClient.useBinaryLibrary(libNode);

async function logEvents(params, response_type) {
  // console.log(`params = ${JSON.stringify(params, null, 2)}`);
  // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function main(client) {
  let response;
  const rootAddr = JSON.parse(fs.readFileSync(pathJson,{encoding: "utf8"})).address;
  const rootKeys = JSON.parse(fs.readFileSync(pathJson,{encoding: "utf8"})).keys;

  const rootAcc = new Account(LimitOrderRootContract, {
    address:rootAddr,
    signer: rootKeys,
    client,
  });

  response = await rootAcc.runLocal("resolveCodeHash", {});
  console.log("Contract reacted to your resolveCodeHash:", response.decoded.output);

  response = await rootAcc.runLocal("_deployedAddress", {});
  console.log("Contract reacted to your _deployedAddress:", response.decoded.output);

  response = await rootAcc.runLocal("_deployedRouter", {});
  console.log("Contract reacted to your _deployedRouter:", response.decoded.output);

  let routerAddr = response.decoded.output._deployedRouter;

  const routerAcc = new Account(LimitOrderRouterContract, {
    address:routerAddr,
    signer: rootKeys,
    client,
  });

  response = await routerAcc.runLocal("walletFor", {});
  console.log("Contract reacted to your walletFor:", response.decoded.output);

  response = await routerAcc.runLocal("balanceFor", {});
  console.log("Contract reacted to your balanceFor:", response.decoded.output);

  response = await routerAcc.runLocal("counterCallback", {});
  console.log("Contract reacted to your counterCallback:", response.decoded.output);

  response = await routerAcc.runLocal("callbacks", {});
  console.log("Contract reacted to your callbacks:", response.decoded.output);










  // let codeHashData = String(response.decoded.output.codeHashData);
  // console.log("codeHashData:", codeHashData);
  // let codeHashDataReady = codeHashData.slice(2);
  // console.log("codeHashDataReady:", codeHashDataReady);
  //
  // const Datas = (
  //   await client.net.query_collection({
  //     collection: "accounts",
  //     filter: {
  //       code_hash: {eq: codeHashDataReady},
  //     },
  //     result: "id",
  //   })
  // ).result;
  //
  // console.log('Datas ', Datas);
  //
  // let dataArr = [];
  //
  // Datas.map((el) => {dataArr.push(el.id);});
  //
  // console.log('dataArr ',  dataArr);
  //
  // for (const item of dataArr) {
  //   const dataAcc = new Account(DataContract, {address:item,client,});
  //   response = await dataAcc.runLocal("getOwner", {});
  //   let nftOwner = response.decoded.output.addrOwner;
  //   console.log('nf token addr: '+item+' addrOwner: '+nftOwner);
  //   response = await dataAcc.runLocal("getDetails", {});
  //   console.log('getDetails: ', response.decoded.output);
  //
  //   response = await dataAcc.runLocal("resolveCodeHashIndex", {addrRoot: rootAddr,addrOwner:nftOwner});
  //   let codeHashIndex = String(response.decoded.output.codeHashIndex);
  //   console.log("codeHashIndex:", codeHashIndex);
  //   let codeHashIndexReady = codeHashIndex.slice(2);
  //   console.log("codeHashDataReady:", codeHashIndexReady);
  //   const Index = (
  //     await client.net.query_collection({
  //       collection: "accounts",
  //       filter: {
  //         code_hash: {eq: codeHashIndexReady},
  //       },
  //       result: "id",
  //     })
  //   ).result;
  //   console.log('Index ', Index);
  //   let indexArr = [];
  //   Index.map((el) => {indexArr.push(el.id);});
  //   for (const index of indexArr) {
  //     const indexAcc = new Account(IndexContract, {address:index,client,});
  //     response = await indexAcc.runLocal("getInfo", {});
  //     console.log("index:", index);
  //     console.log("getInfo:", response.decoded.output);
  //
  //   }
  //
  //
  // }


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
