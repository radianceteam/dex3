const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXRootContract } = require("./DEXRoot.js");
const { DEXRootCode } = require("./DEXRootCode.js");
const { GiverContract } = require("./GiverContract.js");
const fs = require('fs');
const pathJsonRoot = './DEXRootContract.json';
const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;


TonClient.useBinaryLibrary(libNode);

async function logEvents(params, response_type) {
  // console.log(`params = ${JSON.stringify(params, null, 2)}`);
  // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

let extratonAddr = '0:8dc2f840aecd7bde1b88428acc00a99385942fbf7c3b5194e4a49c0c99e01b78';

async function main(client) {
  let response;
  const pathJsonClient = './DEXClientContract3.json';
  const clientKeys = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"})).keys;

  const rootAddr = JSON.parse(fs.readFileSync(pathJsonRoot,{encoding: "utf8"})).address;
  const rootAcc = new Account(DEXRootContract, {
    address:rootAddr,
    signer: clientKeys,
    client,
});
  console.log("DEXroot address:", rootAddr);

  // const pathJsonClient = './DEXClientContract.json';
  // const giverKeys = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"})).keys;
  // let pubkey = '0x'+giverKeys.keys.public;


  // Call `setCreator` function
  response = await rootAcc.run("setCreator", {giverAddr:extratonAddr});
  console.log("Contract reacted to your setCreator:", response.decoded.output);








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
