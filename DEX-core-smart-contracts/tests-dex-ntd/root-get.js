const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXRootContract } = require("./DEXRoot.js");
const fs = require('fs');
const pathJsonRoot = './DEXRootContract.json';
const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev','https://gql.custler.net'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!","Hello fld dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;


TonClient.useBinaryLibrary(libNode);

async function logEvents(params, response_type) {
  // console.log(`params = ${JSON.stringify(params, null, 2)}`);
  // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function main(client) {
  let response;
  const rootAddr = JSON.parse(fs.readFileSync(pathJsonRoot,{encoding: "utf8"})).address;
  const rootAcc = new Account(DEXRootContract, {address:rootAddr,client,});
  console.log("DEXroot address:", rootAddr);

  const pathJsonClient = './DEXClientContract.json';


  response = await rootAcc.runLocal("creatorForPair", {});
  console.log("Contract reacted to your creatorForPair:", response.decoded.output);

  response = await rootAcc.runLocal("dataForRootAB", {});
  console.log("Contract reacted to your dataForRootAB:", response.decoded.output);

  response = await rootAcc.runLocal("pairs", {});
  console.log("Contract reacted to your pairs:", response.decoded.output);

  response = await rootAcc.runLocal("pairKeys", {});
  console.log("Contract reacted to your pairKeys:", response.decoded.output);

  response = await rootAcc.runLocal("pubkeys", {});
  console.log("Contract reacted to your pubkeys:", response.decoded.output);

  response = await rootAcc.runLocal("clients", {});
  console.log("Contract reacted to your clients:", response.decoded.output);

  response = await rootAcc.runLocal("clientKeys", {});
  console.log("Contract reacted to your clientKeys:", response.decoded.output);

  response = await rootAcc.runLocal("hashRootTokenContract", {});
  console.log("Contract reacted to your hashRootTokenContract:", response.decoded.output);


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
