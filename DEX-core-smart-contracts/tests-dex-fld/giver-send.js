const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { GiverContract } = require("./Giver.js");
const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev','https://gql.custler.net'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!","Hello fld dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const fs = require('fs');
// const pathJsonR = './GiverContractRTD.json';

let destination = '0:d82ace803e6238d0384848e66f3418651f845d2aa553c4f89d608bcf259aefb1';
let gramms = 20000000000;

TonClient.useBinaryLibrary(libNode);


async function logEvents(params, response_type) {
    // console.log(`params = ${JSON.stringify(params, null, 2)}`);
    // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
}

async function main(client) {
    let response;
    // const giverAddr = JSON.parse(fs.readFileSync('./GiverContractFLD.json',{encoding: "utf8"})).address;
    const giverKeys = JSON.parse(fs.readFileSync('./GiverContractFLD.json',{encoding: "utf8"})).keys;
    // const giverAddr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"})).address;

    const giverAcc = new Account(GiverContract, {
        signer: giverKeys,
        client,
    });

    const giverAddr = await giverAcc.getAddress();
    console.log(`address of the GiverContract: ${giverAddr}`);

    // Call `sendTransaction` function
    response = await giverAcc.run("sendTransaction", {dest:destination,value:gramms,bounce:false});
    console.log(`Contract run sendTransaction with output ${response.decoded.output}, ${response.transaction.id}`);

    // Execute `getBalance` get method  (execute the message locally on TVM)
    response = await giverAcc.runLocal("getBalance", {});
    console.log("Contract reacted to your getBalance:", response.decoded.output);

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
