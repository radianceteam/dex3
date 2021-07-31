const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXRootContract } = require("./DEXRoot.js");
const { DEXRootCode } = require("./DEXRootCode.js");
const { GiverContract } = require("./Giver.js");
const { GiverContractNTD } = require("./GiverContract.js");
const fs = require('fs');
const pathJson = './DEXRootContract.json';
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
  const rootKeys = signerKeys(await TonClient.default.crypto.generate_random_sign_keys());
  // const rootKeys = JSON.parse(fs.readFileSync(pathJson,{encoding: "utf8"})).keys;
  // const rootAddr = JSON.parse(fs.readFileSync(pathJson,{encoding: "utf8"})).address;

  const rootAcc = new Account(DEXRootContract, {
    signer: rootKeys,
    client,
  });
  const rootAddr = await rootAcc.getAddress();
  console.log(`Future address of the contract will be: ${rootAddr}`);

  if (networkSelector == 0) {
    const giver = await Account.getGiverForClient(client);
    await giver.sendTo(rootAddr, 100_000_000_000);
    console.log(`Grams were transferred from giver to ${rootAddr}`);
  } else if (networkSelector == 1) {
    const giverNTDAddress = JSON.parse(fs.readFileSync('./GiverContractNTD.json',{encoding: "utf8"})).address;;
    const giverNTDKeys = JSON.parse(fs.readFileSync('./GiverContractNTD.json',{encoding: "utf8"})).keys;
    const giverNTDAcc = new Account(GiverContractNTD, {
      address: giverNTDAddress,
      signer: giverNTDKeys,
      client,
    });
    // Call `sendTransaction` function
    response = await giverNTDAcc.run("sendTransaction", {dest:rootAddr,value:20000000000,bounce:false});
    console.log("Giver send 20 ton to address:", rootAddr, response.decoded.output);
  } else if (networkSelector == 2){
   console.log('Pls set giver for main.ton.dev');
  } else if (networkSelector == 3){
     const giverRTDAddress = JSON.parse(fs.readFileSync('./GiverContractRTD.json',{encoding: "utf8"})).address;;
     const giverRTDKeys = JSON.parse(fs.readFileSync('./GiverContractRTD.json',{encoding: "utf8"})).keys;
     const giverRTDAcc = new Account(GiverContract, {address: giverRTDAddress,signer: giverRTDKeys,client,});
     // Call `sendTransaction` function
     response = await giverRTDAcc.run("sendTransaction", {dest:rootAddr,value:20000000000,bounce:false});
     console.log("Giver send 20 ton to rootAddr:", response.decoded.output);
   } else if (networkSelector == 4){
     const giverFLDAddress = JSON.parse(fs.readFileSync('./GiverContractFLD.json',{encoding: "utf8"})).address;;
     const giverFLDKeys = JSON.parse(fs.readFileSync('./GiverContractFLD.json',{encoding: "utf8"})).keys;
     const giverFLDAcc = new Account(GiverContract, {address: giverFLDAddress,signer: giverFLDKeys,client,});
     // Call `sendTransaction` function
     response = await giverFLDAcc.run("sendTransaction", {dest:rootAddr,value:100000000000,bounce:false});
     console.log("Giver send 100 ton to rootAddr:", response.decoded.output);
   } else {console.log('networkSelector is incorrect');}



const keyJson = JSON.stringify({address:rootAddr, keys:rootKeys});
fs.writeFileSync( pathJson, keyJson,{flag:'w'});
console.log("Future address of the contract  and keys written successfully to:", pathJson);


const deployMessage = await client.abi.encode_message(await rootAcc.getParamsOfDeployMessage({
  initFunctionName:"constructor",
  initInput:{
  },
}));
let shard_block_id;
shard_block_id = (await client.processing.send_message({
  message: deployMessage.message,
  send_events: true,
}, logEvents,
)).shard_block_id;
console.log(`Deploy message was sent.`);



// Monitor message delivery.
// See more info about `wait_for_transaction` here
// https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_processing.md#wait_for_transaction
const deploy_processing_result = await client.processing.wait_for_transaction({
  abi: abiContract(rootAcc.abi),
  message: deployMessage.message,
  shard_block_id: shard_block_id,
  send_events: true,
},
logEvents,
);
// console.log(`Deploy transaction: ${JSON.stringify(deploy_processing_result.transaction, null, 2)}`);
// console.log(`Deploy fees: ${JSON.stringify(deploy_processing_result.fees, null, 2)}`);
console.log(`Contract was deployed at address: ${rootAddr}`);


// Call `setDEXconnectorCode` function
response = await rootAcc.run("setDEXconnectorCode", {code:DEXRootCode.connector});
console.log("Contract reacted to your setDEXconnectorCode:", response.decoded.output);

// Call `setDEXclientCode` function
response = await rootAcc.run("setDEXclientCode", {code:DEXRootCode.client});
console.log("Contract reacted to your setDEXclientCode:", response.decoded.output);

// Call `setDEXpairCode` function
response = await rootAcc.run("setDEXpairCode", {code:DEXRootCode.pair});
console.log("Contract reacted to your setDEXpairCode:", response.decoded.output);

// Call `setRootTokenCode` function
response = await rootAcc.run("setRootTokenCode", {code:DEXRootCode.root});
console.log("Contract reacted to your setRootTokenCode:", response.decoded.output);

// Call `setTONTokenWalletCode` function
response = await rootAcc.run("setTONTokenWalletCode", {code:DEXRootCode.wallet});
console.log("Contract reacted to your setTONTokenWalletCode:", response.decoded.output);





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
