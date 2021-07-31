const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXRootContract } = require("./DEXRoot.js");
const { DEXClientContract } = require("./DEXClient.js");
const { DEXConnectorContract } = require("./DEXConnector.js");
const { RootTokenContract } = require("./RootTokenContract.js");
const { GiverContract } = require("./Giver.js");
const { GiverContractNTD } = require("./GiverContract.js");

const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev','https://gql.custler.net'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!","Hello fld dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const fs = require('fs');
const pathJsonRoot = './DEXRootContract.json';
const pathJsonClient = './DEXClientContractLoadTest.json';


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
  let resultArr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"}));
  const rootAddr = JSON.parse(fs.readFileSync(pathJsonRoot,{encoding: "utf8"})).address;
  const rootAcc = new Account(DEXRootContract, {address: rootAddr,client,});

  for (const item of resultArr) {
    const clientKeys = item.keys;
    let pubkey = '0x'+clientKeys.keys.public;
    const clientSoArg = item.clientSoArg;

    const clientSignedRootAcc = new Account(DEXRootContract, {address:rootAddr,signer:clientKeys,client,});

    // 1. Prepay to root DEX 20 TonClient
    // 2. Set giver adress for DEXClient into DEXRoot
    // 3. Deploy DEXClient via DEXRoot

    if (networkSelector == 0) {
      const giver = await Account.getGiverForClient(client);
      await giver.sendTo(rootAddr, 100_000_000_000);
      console.log(`Grams were transferred from giver to ${rootAddr}`);
    } else if (networkSelector == 1) {
      const giverNTDAddress = JSON.parse(fs.readFileSync('./GiverContractNTD.json',{encoding: "utf8"})).address;;
      const giverNTDKeys = JSON.parse(fs.readFileSync('./GiverContractNTD.json',{encoding: "utf8"})).keys;
      const giverNTDAcc = new Account(GiverContractNTD, {address: giverNTDAddress,signer: giverNTDKeys,client,});
      response = await giverNTDAcc.run("sendTransaction", {dest:rootAddr,value:20000000000,bounce:false});
      console.log("Giver send 20 ton to rootAddr:", response.decoded.output);
      response = await clientSignedRootAcc.run("setCreator", {giverAddr:giverNTDAddress});
      console.log("Contract reacted to your setCreator:", response.decoded.output);
      response = await rootAcc.run("createDEXclient", {pubkey:pubkey, souint:clientSoArg});
      console.log("Contract reacted to your createDEXclient:", response.decoded.output);

    } else if (networkSelector == 2){
      console.log('Pls set giver for main.ton.dev');

    } else if (networkSelector == 3){
    const giverRTDAddress = JSON.parse(fs.readFileSync('./GiverContractRTD.json',{encoding: "utf8"})).address;;
    const giverRTDKeys = JSON.parse(fs.readFileSync('./GiverContractRTD.json',{encoding: "utf8"})).keys;
    const giverRTDAcc = new Account(GiverContract, {address: giverRTDAddress,signer: giverRTDKeys,client,});
    response = await giverRTDAcc.run("sendTransaction", {dest:rootAddr,value:20000000000,bounce:false});
    console.log("Giver send 20 ton to rootAddr:", response.decoded.output);
    response = await clientSignedRootAcc.run("setCreator", {giverAddr:giverRTDAddress});
    console.log("Contract reacted to your setCreator:", response.decoded.output);
    response = await rootAcc.run("createDEXclient", {pubkey:pubkey, souint:clientSoArg});
    console.log("Contract reacted to your createDEXclient:", response.decoded.output);

  } else if (networkSelector == 4){
    const giverRTDAddress = JSON.parse(fs.readFileSync('./GiverContractFLD.json',{encoding: "utf8"})).address;;
    const giverRTDKeys = JSON.parse(fs.readFileSync('./GiverContractFLD.json',{encoding: "utf8"})).keys;
    const giverRTDAcc = new Account(GiverContract, {address: giverRTDAddress,signer: giverRTDKeys,client,});
    response = await giverRTDAcc.run("sendTransaction", {dest:rootAddr,value:100000000000,bounce:false});
    console.log("Giver send 100 ton to rootAddr:", response.decoded.output);
    response = await clientSignedRootAcc.run("setCreator", {giverAddr:giverRTDAddress});
    console.log("Contract reacted to your setCreator:", response.decoded.output);
    response = await rootAcc.run("createDEXclient", {pubkey:pubkey, souint:clientSoArg});
    console.log("Contract reacted to your createDEXclient:", response.decoded.output);
  } else {console.log('networkSelector is incorrect');}

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
