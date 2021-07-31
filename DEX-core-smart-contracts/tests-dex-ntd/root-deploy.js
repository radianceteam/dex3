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
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;


TonClient.useBinaryLibrary(libNode);

async function logEvents(params, response_type) {
  // console.log(`params = ${JSON.stringify(params, null, 2)}`);
  // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function main(client) {
  let response;
  const contractKeys = JSON.parse(fs.readFileSync(pathJson,{encoding: "utf8"})).keys;

  // const contractKeys = signerKeys(await TonClient.default.crypto.generate_random_sign_keys());
  const rootAcc = new Account(DEXRootContract, {
    signer: contractKeys,
    client,
  });
  const address = await rootAcc.getAddress();
  console.log(`Future address of the contract will be: ${address}`);

  if (networkSelector == 0) {
    const giver = await Account.getGiverForClient(client);
    await giver.sendTo(address, 100_000_000_000);
    console.log(`Grams were transferred from giver to ${address}`);
  } else if (networkSelector == 1) {
    const giverNTDAddress = JSON.parse(fs.readFileSync('./GiverContractNTD.json',{encoding: "utf8"})).address;;
    const giverNTDKeys = JSON.parse(fs.readFileSync('./GiverContractNTD.json',{encoding: "utf8"})).keys;
    const giverNTDAcc = new Account(GiverContract, {
      address: giverNTDAddress,
      signer: giverNTDKeys,
      client,
    });
    // Call `sendTransaction` function
    response = await giverNTDAcc.run("sendTransaction", {dest:address,value:20000000000,bounce:false});
    console.log("Giver send 20 ton to address:", address, response.decoded.output);
  } else if (networkSelector == 2){console.log('Pls set giver for main.ton.dev');} else {console.log('networkSelector is incorrect');}

  const keyJson = JSON.stringify({address:address, keys:contractKeys});
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
console.log(`Contract was deployed at address: ${address}`);


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
