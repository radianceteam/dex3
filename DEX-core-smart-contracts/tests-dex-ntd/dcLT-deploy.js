const { TonClient, abiContract, signerKeys, signerNone, builderOpInteger, builderOpCell, builderOpCellBoc, builderOpBitString } = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");

const { DEXRootContract } = require("./DEXRoot.js");
const { DEXClientContract } = require("./DEXClient.js");
const { DEXConnectorContract } = require("./DEXConnector.js");
const { RootTokenContract } = require("./RootTokenContract.js");
const { GiverContract } = require("./Giver.js");

const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev','https://gql.custler.net'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!","Hello fld dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const fs = require('fs');
const pathJsonRoot = './DEXRootContract.json';
const pathJsonClient = './DEXClientContractLoadTest.json';

const zeroAddress = '0:0000000000000000000000000000000000000000000000000000000000000000';


TonClient.useBinaryLibrary(libNode);


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

    const clientAddr = item.address;
    const clientKeys = item.keys;
    let pubkey = '0x'+clientKeys.keys.public;
    const clientSoArg = item.clientSoArg;

    const clientAcc = new Account(DEXClientContract, {
      initData: {
        rootDEX: rootAddr,
        soUINT: clientSoArg,
        codeDEXConnector: DEXConnectorContract.code,
      },
      signer: clientKeys,
      client,
    });
    const address = await clientAcc.getAddress();
    console.log(`Future address of the contract will be: ${address}`);

    let checkAddress = clientAddr == address;
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
        response = await giverNTDAcc.run("sendTransaction", {dest:address,value:10_000_000_000,bounce:false});
        console.log("Giver send 10 ton to address:", address, response.decoded.output);
      } else if (networkSelector == 2){
        console.log('Pls set giver for main.ton.dev');
      } else if (networkSelector == 3){
        const giverRTDAddress = JSON.parse(fs.readFileSync('./GiverContractRTD.json',{encoding: "utf8"})).address;;
        const giverRTDKeys = JSON.parse(fs.readFileSync('./GiverContractRTD.json',{encoding: "utf8"})).keys;
        const giverRTDAcc = new Account(GiverContract, {address: giverRTDAddress,signer: giverRTDKeys,client,});
        response = await giverRTDAcc.run("sendTransaction", {dest:address,value:10_000_000_000,bounce:false});
        console.log("Giver send 10 ton to address:", address, response.decoded.output);
      } else if (networkSelector == 4){
        const giverFLDAddress = JSON.parse(fs.readFileSync('./GiverContractFLD.json',{encoding: "utf8"})).address;;
        const giverFLDKeys = JSON.parse(fs.readFileSync('./GiverContractFLD.json',{encoding: "utf8"})).keys;
        const giverFLDAcc = new Account(GiverContract, {address: giverFLDAddress,signer: giverFLDKeys,client,});
        response = await giverFLDAcc.run("sendTransaction", {dest:address,value:10_000_000_000,bounce:false});
        console.log("Giver send 10 ton to address:", address, response.decoded.output);
      } else {console.log('networkSelector is incorrect');}


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
