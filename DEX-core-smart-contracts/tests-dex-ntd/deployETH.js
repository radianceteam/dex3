const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const dotenv = require('dotenv').config();
const { RootTokenContract } = require("./RootTokenContract.js");
const { TONTokenWalletContract } = require("./TONTokenWallet.js");
const { DEXRootCode } = require("./DEXRootCode.js");
const { GiverContract } = require("./Giver.js");
const { GiverContractNTD } = require("./GiverContract.js");
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const ZERO_ADDRESS = '0:0000000000000000000000000000000000000000000000000000000000000000';

const fs = require('fs');
const hex = require('ascii-hex');
const hex2ascii = require('hex2ascii');
const pathJsonR = './ETHdata.json';

TonClient.useBinaryLibrary(libNode);

function toHex(input) {
  let output = '';
  for (i = 0; i < input.length; i ++){output += hex(input[i]).toString(16)}
  return String(output);
}

const name = toHex("wrapped Ether");
const symbol = toHex("WETH");
const decimals = "9";

async function logEvents(params, response_type) {
  // console.log(`params = ${JSON.stringify(params, null, 2)}`);
  // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function main(client) {
  const rootAbi = {
    type: 'Contract',
    value: RootTokenContract.abi
  }

  const rootKeys = JSON.parse(fs.readFileSync(pathJsonR,{encoding: "utf8"})).keys;

  // const rootKeys = signerKeys(await TonClient.default.crypto.generate_random_sign_keys());
  const rootAcc = new Account(RootTokenContract, {
    signer: rootKeys,
    initData: {
      _randomNonce: 0,
      name: name,
      symbol: symbol,
      decimals: decimals,
      wallet_code: DEXRootCode.wallet
    },
    client,
  });
  const rootAddr = await rootAcc.getAddress();
  console.log(`Future address of the rootToken will be: ${rootAddr}`);

  if (networkSelector == 0) {
    const giver = await Account.getGiverForClient(client);
    await giver.sendTo(rootAddr, 100_000_000_000);
    console.log(`Grams were transferred from giver to ${rootAddr}`);
  } else if (networkSelector == 1) {
    const giverNTDAddress = JSON.parse(fs.readFileSync('./GiverContractNTD.json',{encoding: "utf8"})).address;;
    const giverNTDKeys = JSON.parse(fs.readFileSync('./GiverContractNTD.json',{encoding: "utf8"})).keys;
    const giverNTDAcc = new Account(GiverContract, {
      address: giverNTDAddress,
      signer: giverNTDKeys,
      client,
    });
    // Call `sendTransaction` function
    response = await giverNTDAcc.run("sendTransaction", {dest:rootAddr,value:20000000000,bounce:false});
    console.log("Giver send 20 ton to rootAddr:", response.decoded.output);
  } else if (networkSelector == 2){
    console.log('Pls set giver for main.ton.dev');
  } else if (networkSelector == 3){
  const giverRTDAddress = JSON.parse(fs.readFileSync('./GiverContractRTD.json',{encoding: "utf8"})).address;;
  const giverRTDKeys = JSON.parse(fs.readFileSync('./GiverContractRTD.json',{encoding: "utf8"})).keys;
  const giverRTDAcc = new Account(GiverContract, {address: giverRTDAddress,signer: giverRTDKeys,client,});
  // Call `sendTransaction` function
  response = await giverRTDAcc.run("sendTransaction", {dest:rootAddr,value:20000000000,bounce:false});
  console.log("Giver send 20 ton to rootAddr:", response.decoded.output);
} else {console.log('networkSelector is incorrect');}


let rootJson = JSON.stringify({address:rootAddr, keys:rootKeys});
fs.writeFileSync( pathJsonR, rootJson,{flag:'w'});
console.log("Future address of the contract  and keys written successfully to:", pathJsonR);

let shard_block_id;
let deployMessage = await client.abi.encode_message(await rootAcc.getParamsOfDeployMessage({
  initFunctionName:"constructor",
  initInput:{
    root_public_key_: '0x'+rootKeys.keys.public,
    root_owner_address_: ZERO_ADDRESS
  },
}));
shard_block_id = (await client.processing.send_message({
  message: deployMessage.message,
  send_events: true,
}, logEvents,
)).shard_block_id;
console.log(`Deploy rootETH message was sent.`);

// Monitor message delivery.
// See more info about `wait_for_transaction` here
// https://github.com/tonlabs/TON-SDK/blob/master/docs/mod_processing.md#wait_for_transaction
let deploy_processing_result = await client.processing.wait_for_transaction({
  abi: abiContract(rootAcc.abi),
  message: deployMessage.message,
  shard_block_id: shard_block_id,
  send_events: true,
},
logEvents,
);
console.log(`Deploy transaction: ${JSON.stringify(deploy_processing_result.transaction, null, 2)}`);
console.log(`Deploy fees: ${JSON.stringify(deploy_processing_result.fees, null, 2)}`);
console.log(`Contract was deployed at address: ${rootAddr}`);


// Call `touch` function
// let response = await wrapperAcc.run("createZeroWallet", {});
// console.log(`Contract run createZeroWallet with output ${response.decoded.output}, ${response.transaction.id}`);

// Execute `name` get method  (execute the message locally on TVM)
response = await rootAcc.runLocal("name", {});
console.log("Contract reacted to your name:", hex2ascii(response.decoded.output.name));

// Execute `symbol` get method  (execute the message locally on TVM)
response = await rootAcc.runLocal("symbol", {});
console.log("Contract reacted to your symbol:", hex2ascii(response.decoded.output.symbol));

// Execute `total_supply` get method  (execute the message locally on TVM)
response = await rootAcc.runLocal("total_supply", {});
console.log("Contract reacted to your total_supply:", response.decoded.output);

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
