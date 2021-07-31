const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXRootContract } = require("./DEXRoot.js");
const { DEXRootCode } = require("./DEXRootCode.js");
const { GiverContract } = require("./GiverContract.js");
const { GiverContractNTD } = require("./GiverContract.js");
const fs = require('fs');
const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const pathJsonRoot = './DEXRootContract.json';



TonClient.useBinaryLibrary(libNode);

async function logEvents(params, response_type) {
  // console.log(`params = ${JSON.stringify(params, null, 2)}`);
  // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function main(client) {
  let response;
  const rootKeys = JSON.parse(fs.readFileSync(pathJsonRoot,{encoding: "utf8"})).keys;
  const rootAddr = JSON.parse(fs.readFileSync(pathJsonRoot,{encoding: "utf8"})).address;

  const rootAcc = new Account(DEXRootContract, {
    address:rootAddr,
    signer: rootKeys,
    client,
  });



// Call `setDEXconnectorCode` function
// response = await rootAcc.run("setDEXconnectorCode", {code:DEXRootCode.connector});
// console.log("Contract reacted to your setDEXconnectorCode:", response.decoded.output);
//
// Call `setDEXclientCode` function
response = await rootAcc.run("setDEXclientCode", {code:DEXRootCode.client});
console.log("Contract reacted to your setDEXclientCode:", response.decoded.output);

// Call `setDEXpairCode` function
response = await rootAcc.run("setDEXpairCode", {code:DEXRootCode.pair});
console.log("Contract reacted to your setDEXpairCode:", response.decoded.output);

// // Call `setRootTokenCode` function
// response = await rootAcc.run("setRootTokenCode", {code:DEXRootCode.root});
// console.log("Contract reacted to your setRootTokenCode:", response.decoded.output);
//
// // Call `setTONTokenWalletCode` function
// response = await rootAcc.run("setTONTokenWalletCode", {code:DEXRootCode.wallet});
// console.log("Contract reacted to your setTONTokenWalletCode:", response.decoded.output);

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
