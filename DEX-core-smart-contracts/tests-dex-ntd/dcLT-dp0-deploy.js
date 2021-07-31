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
const pathJsonRoot = './DEXRootContract.json';
const pathJsonClient = './DEXClientContractLoadTest.json';

const pathJsonPairTonUsdt = './DEXPairContractTonUsdt.json';
const pathJsonWTON = './WTONdata.json';
const pathJsonUSDT = './USDTdata.json';

let currentRootA = pathJsonWTON;
let currentRootB = pathJsonUSDT;
let currentPairPath = pathJsonPairTonUsdt;



const hex = require('ascii-hex');
const hex2ascii = require('hex2ascii');
function toHex(input) {
  let output = '';
  for (i = 0; i < input.length; i ++){output += hex(input[i]).toString(16)}
  return String(output);
}


TonClient.useBinaryLibrary(libNode);

function getShard(string) {
  return string[2];
}

async function logEvents(params, response_type) {
  // console.log(`params = ${JSON.stringify(params, null, 2)}`);
  // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function main(client) {
  let responce;
  let clientArr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"}));
  const clientKeys = clientArr[0].keys;
  const clientAddr = clientArr[0].address;
  const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});
  let pubkey = '0x'+clientKeys.keys.public;

  const rootA = JSON.parse(fs.readFileSync(currentRootA,{encoding: "utf8"})).address;
  const rootB = JSON.parse(fs.readFileSync(currentRootB,{encoding: "utf8"})).address;

  const pair = JSON.parse(fs.readFileSync(currentPairPath,{encoding: "utf8"}));

  console.log(pair.pairSoArg);
  console.log(pair.connectorSoArg0);
  console.log(pair.connectorSoArg1);
  console.log(pair.rootSoArg);



  response = await clientAcc.run("createNewPair", {root0:rootA,root1:rootB,pairSoArg:pair.pairSoArg,connectorSoArg0:pair.connectorSoArg0,connectorSoArg1:pair.connectorSoArg1,rootSoArg:pair.rootSoArg,rootName:pair.rootName,rootSymbol:pair.rootSymbol,rootDecimals:pair.rootDecimals,grammsForPair:500000000,grammsForRoot:500000000,grammsForConnector:500000000,grammsForWallet:1500000000,grammsTotal:10000000000});
  console.log("Contract reacted to your createNewPair:", response.decoded.output);

  // // Call `rootDEX` function
  // response = await clientAcc.runLocal("rootDEX", {});
  // console.log("Contract reacted to your rootDEX:", response.decoded.output);




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
