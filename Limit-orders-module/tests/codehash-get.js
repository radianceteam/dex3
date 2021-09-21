const { TonClient, abiContract, signerKeys } = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { LimitOrderRootContract } = require("../ton-packages/LimitOrderRoot.js");
const { LimitOrderContract } = require("../ton-packages/LimitOrder.js");
const { IndexContract } = require("../ton-packages/Index.js");
const { LimitOrderRouterContract } = require("../ton-packages/LimitOrderRouter.js");
const { GiverContract } = require("../ton-packages/Giver.js");
const { RootTokenContractContract } = require("../ton-packages/RootTokenContract.js");

const hex2ascii = require('hex2ascii');
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
  // let codeHash = '0eb29db5c28c866311d20aa8f716d5922be0b4a42e0204888b37bb0ff525449b';

  const rootAddr = JSON.parse(fs.readFileSync(pathJson,{encoding: "utf8"})).address;
  const rootKeys = JSON.parse(fs.readFileSync(pathJson,{encoding: "utf8"})).keys;

  const rootAcc = new Account(LimitOrderRootContract, {
    address:rootAddr,
    signer: rootKeys,
    client,
  });

  response = await rootAcc.runLocal("resolveCodeHash", {});
  console.log("Contract reacted to your resolveCodeHash:", response.decoded.output);
  let hash = response.decoded.output.codeHash;
  hash = hash.substring(2, hash.length);
  // console.log("Contract reacted to your resolveCodeHash:", hash);


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

  // const Datas = (
  //   await client.net.query_collection({
  //     collection: "accounts",
  //     filter: {
  //       id: {eq: address},
  //     },
  //     result: "code_hash",
  //   })
  // ).result;
  //
  // console.log('Datas ', Datas);


  for (const item of dataArr) {

    const rootAcc = new Account(LimitOrderContract, {address:item,client,});
    response = await rootAcc.runLocal("getInfo", {});
    console.log('getInfo: ',response.decoded.output);




    // const dataAcc = new Account(DataContract, {address:item,client,});
    // response = await dataAcc.runLocal("getOwner", {});
    // let nftOwner = response.decoded.output.addrOwner;
    // console.log('nf token addr: '+item+' addrOwner: '+nftOwner);
    // response = await dataAcc.runLocal("getDetails", {});
    // console.log('getDetails: ', response.decoded.output);
    //
    // response = await dataAcc.runLocal("resolveCodeHashIndex", {addrRoot: rootAddr,addrOwner:nftOwner});
    // let codeHashIndex = String(response.decoded.output.codeHashIndex);
    // console.log("codeHashIndex:", codeHashIndex);
    // let codeHashIndexReady = codeHashIndex.slice(2);
    // console.log("codeHashDataReady:", codeHashIndexReady);
    // const Index = (
    //   await client.net.query_collection({
    //     collection: "accounts",
    //     filter: {
    //       code_hash: {eq: codeHashIndexReady},
    //     },
    //     result: "id",
    //   })
    // ).result;
    // console.log('Index ', Index);
    // let indexArr = [];
    // Index.map((el) => {indexArr.push(el.id);});
    // for (const index of indexArr) {
    //   const indexAcc = new Account(IndexContract, {address:index,client,});
    //   response = await indexAcc.runLocal("getInfo", {});
    //   console.log("index:", index);
    //   console.log("getInfo:", response.decoded.output);
    //
    // }


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
