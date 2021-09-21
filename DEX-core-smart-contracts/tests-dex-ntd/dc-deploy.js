const { TonClient, abiContract, signerKeys } = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXRootContract } = require("./DEXRoot.js");
const { DEXClientContract } = require("./DEXClient.js");
const { DEXConnectorContract } = require("./DEXConnector.js");
const { RootTokenContract } = require("./RootTokenContract.js");
const { GiverContract } = require("./Giver.js");
const fs = require('fs');
const pathJson = './DEXClient.json';
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

function getShard(string) {
  return string[2];
}

async function main(client) {
  let response;
  const rootAddress = JSON.parse(fs.readFileSync('./DEXRootContract.json',{encoding: "utf8"})).address;
  console.log("rootAddress:", rootAddress);
  const rootAcc = new Account(DEXRootContract, {address:rootAddress,client,});
  const SEED_PHRASE_WORD_COUNT = 12;
  const SEED_PHRASE_DICTIONARY_ENGLISH = 1;
  const HD_PATH = "m/44'/396'/0'/0/0";
  const { crypto } = client;
  const { phrase } = await crypto.mnemonic_from_random({
    dictionary: SEED_PHRASE_DICTIONARY_ENGLISH,
    word_count: SEED_PHRASE_WORD_COUNT,
  });
  console.log(`Generated seed phrase "${phrase}"`);
  let keyPair = await crypto.mnemonic_derive_sign_keys({
    phrase,
    path: HD_PATH,
    dictionary: SEED_PHRASE_DICTIONARY_ENGLISH,
    word_count: SEED_PHRASE_WORD_COUNT,
  });
  const clientKeys = signerKeys(keyPair);
  console.log(clientKeys);
  console.log("clientKeys.keys.public:", clientKeys.keys.public);
  let pubkey = '0x'+clientKeys.keys.public;
  let status = false;
  let targetShard = getShard(rootAddress);
  console.log("targetShard:", targetShard);
  let cumulativ = 0;
  let clientSet;
  while (!status) {
    response = await rootAcc.runLocal("getClientAddress", {_answer_id:0,clientPubKey:pubkey,clientSoArg:cumulativ});
    let clientAddr = response.decoded.output.value0;
    let shard = getShard(clientAddr);
    if (shard == targetShard) {
      console.log("Bingo!");
      console.log("clientSoArg:", cumulativ);
      console.log("clientAddress:", clientAddr);
      clientSet = {address:clientAddr, keys:clientKeys, clientSoArg:cumulativ, seed:phrase};
      status = true;
    } else {console.log(cumulativ);}
    cumulativ++;
  }

  const clientAcc = new Account(DEXClientContract, {
    initData: {
      rootDEX: rootAddress,
      soUINT: clientSet.clientSoArg,
      codeDEXConnector: DEXConnectorContract.code,
    },
    signer: clientKeys,
    client,
  });
  const address = await clientAcc.getAddress();
  console.log(`Future address of the contract will be: ${address}`);

  let checkAddress = clientSet.address == address;
  console.log("checkAddress:", checkAddress);

  if (checkAddress) {
    if (networkSelector == 0) {
      const giver = await Account.getGiverForClient(client);
      await giver.sendTo(address, 100_000_000_000);
      console.log(`Grams were transferred from giver to ${address}`);
    } else if (networkSelector == 1) {
      const giverNTDAddress = JSON.parse(fs.readFileSync('./GiverContractNTD.json',{encoding: "utf8"})).address;;
      const giverNTDKeys = JSON.parse(fs.readFileSync('./GiverContractNTD.json',{encoding: "utf8"})).keys;
      const giverNTDAcc = new Account(GiverContract, {address: giverNTDAddress,signer: giverNTDKeys,client,});
      // Call `sendTransaction` function
      response = await giverNTDAcc.run("sendTransaction", {dest:address,value:20000000000,bounce:false});
      console.log("Giver send 20 ton to address:", address, response.decoded.output);
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
      console.log("Giver send 20 ton to rootAddr:", response.decoded.output);
    } else {console.log('networkSelector is incorrect');}

    const keyJson = JSON.stringify(clientSet);
    fs.writeFileSync( pathJson, keyJson,{flag:'w'});
    console.log("Future address of the contract  and keys written successfully to:", pathJson);

    const deployMessage = await client.abi.encode_message(await clientAcc.getParamsOfDeployMessage({
      initFunctionName:"constructor",
      initInput:{
        ownerAddr:zeroAddress,
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
    abi: abiContract(clientAcc.abi),
    message: deployMessage.message,
    shard_block_id: shard_block_id,
    send_events: true,
  },
  logEvents,
  );
  // console.log(`Deploy transaction: ${JSON.stringify(deploy_processing_result.transaction, null, 2)}`);
  // console.log(`Deploy fees: ${JSON.stringify(deploy_processing_result.fees, null, 2)}`);
  console.log(`Contract was deployed at address: ${address}`);

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
