const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const dotenv = require('dotenv').config();
const { RootTokenContractContract } = require("./RootTokenContract.js");
const { TONTokenWalletContract } = require("./TONTokenWallet.js");
const { DEXRootCode } = require("./DEXRootCode.js");
// const { GiverContract } = require("./Giver.js");
const { GiverContract } = require("./Giver.js");

const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const ZERO_ADDRESS = '0:0000000000000000000000000000000000000000000000000000000000000000';



const fs = require('fs');
const hex = require('ascii-hex');
const hex2ascii = require('hex2ascii');
const pathJsonR = './WTONdata.json';

TonClient.useBinaryLibrary(libNode);

function toHex(input) {
  let output = '';
  for (i = 0; i < input.length; i ++){output += hex(input[i]).toString(16)}
  return String(output);
}

const name = toHex("wrapped TON");
const symbol = toHex("WTON");
const decimals = "9";

async function logEvents(params, response_type) {
  // console.log(`params = ${JSON.stringify(params, null, 2)}`);
  // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function main(client) {

  const rootAddr = JSON.parse(fs.readFileSync(pathJsonR,{encoding: "utf8"})).address;
  const rootKeys = JSON.parse(fs.readFileSync(pathJsonR,{encoding: "utf8"})).keys;

  const rootAcc = new Account(RootTokenContractContract, {address:rootAddr,client,});


response = await rootAcc.runLocal("name", {});
console.log("Contract reacted to your name:", hex2ascii(response.decoded.output.name));

response = await rootAcc.runLocal("symbol", {});
console.log("Contract reacted to your symbol:", hex2ascii(response.decoded.output.symbol));

response = await rootAcc.runLocal("getDetails", {_answer_id:0});
console.log("Contract reacted to your getDetails:", response.decoded.output);

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
