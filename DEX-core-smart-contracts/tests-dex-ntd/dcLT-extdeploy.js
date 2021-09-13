const { TonClient, abiContract, signerKeys, signerNone, builderOpInteger, builderOpCell, builderOpCellBoc, builderOpBitString } = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
// const { TonContract} = require("./utils/ton-contract.ts");
// const { callThroughMultisig } = require("./utils/ton-contract.ts");
// const pkgSafeMultisigWallet = require("./SetCodeMultisig.package.ts");

const { DEXRootContract } = require("./DEXRoot.js");
const { DEXClientContract } = require("./DEXClient.js");
const { DEXConnectorContract } = require("./DEXConnector.js");
const { RootTokenContract } = require("./RootTokenContract.js");
const { GiverContract } = require("./Giver.js");
const { SetcodeMultisigWalletContract } = require("./SetcodeMultisigWallet.js");



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

// const smcSafeMultisigWallet = new TonContract({
//     client,
//     name: "SafeMultisigWallet",
//     tonPackage: pkgSafeMultisigWallet,
//     address: '0:b6ad8175fd6870e93fe44908c01831269065f8890ad119c5917bad088e192c43',
//     keys: {
//       public: '87a073e5e05e9fc1d2911c923948aa8d656ee54d47d75171c776594531ded1df',
//       secret: 'c4e7f73cd081977cd7dbff49aa7da4c0788c339aa48ef6bf8e1fc36462575b49',
//     },
//   });


async function main(client) {

  const u = (size, x) => {
    if (size === 256) {
      return builderOpBitString(`x${BigInt(x).toString(16).padStart(64, "0")}`)
    } else {
      return builderOpInteger(size, x);
    }
  }
  const u8 = x => u(8, x);
  const u32 = x => u(32, x);
  const u128 = x => u(128, x);
  const u256 = x => u(256, x);
  const b0 = u(1, 0);
  const b1 = u(1, 0);
  const bits = x => builderOpBitString(x);
  const bytes = x => builderOpCell([bits(x.toString("hex"))]);
  const str = x => bytes(Buffer.from(x, "utf8"));
  const addrStdFixed = (x) => {
    let parts = x.split(":");
    const wid = parts.length < 2 ? "00" : Number.parseInt(parts[0]).toString(16).padStart(2, "0");
    const addr = parts[parts.length < 2 ? 0 : 1].padStart(64, "0");
    return bits(`${wid}${addr}`);
  };

  const addrInt = (x) => {
    let parts = x.split(":");
    let [wid, addr] = parts.length < 2 ? ["0", parts[0]] : parts;
    wid = Number.parseInt(wid).toString(2).padStart(8, "0");
    addr = BigInt(`0x${addr}`).toString(2).padStart(256, "0");
    return bits(`n100${wid}${addr}`);
  };




  let responce;
  let resultArr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"}));
  let resultArr1 = [];
  resultArr1.push(resultArr[0]);

  const rootAddr = JSON.parse(fs.readFileSync(pathJsonRoot,{encoding: "utf8"})).address;
  const rootAcc = new Account(DEXRootContract, {address: rootAddr,client,});

  for (const item of resultArr) {

    // const item = resultArr[0];
    const clientKeys = item.keys;
    let pubkey = '0x'+clientKeys.keys.public;
    const clientSoArg = item.clientSoArg;
    const { body } = await client.abi.encode_message_body({
      abi: { type: "Contract", value: DEXRootContract.abi },
      signer: { type: "None" },
      is_internal: true,
      call_set: {
        function_name: "createDEXclient",
        input: {
          pubkey:pubkey,
          souint:clientSoArg,
        },
      },
    });

    if (networkSelector == 0) {
      const giver = await Account.getGiverForClient(client);
      await giver.sendTo(rootAddr, 100_000_000_000);
      console.log(`Grams were transferred from giver to ${rootAddr}`);
    } else if (networkSelector == 1) {
      const giverNTDAddress = JSON.parse(fs.readFileSync('./GiverContractNTD1.json',{encoding: "utf8"})).address;;
      const giverNTDKeys = JSON.parse(fs.readFileSync('./GiverContractNTD1.json',{encoding: "utf8"})).keys;
      const giverNTDAcc = new Account(SetcodeMultisigWalletContract, {
        address: giverNTDAddress,
        signer: giverNTDKeys,
        client,
      });

      response = await giverNTDAcc.run("sendTransaction", {
        dest:rootAddr,
        value:2000000000,
        bounce:true,
        flags:3,
        payload:body,
      });
      console.log("Giver send 2 ton to rootAddr and bodyEncodedUsingAbi:", response.decoded.output);

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
