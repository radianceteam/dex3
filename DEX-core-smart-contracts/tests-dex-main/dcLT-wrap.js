const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXClientContract } = require("./DEXClient.js");
const { WrappedTONVaultContract } = require("./WrappedTONVault.js");
const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev','https://gql.custler.net'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!","Hello fld dev net TON!"];
const networkSelector = 2;

const fs = require('fs');
const pathJsonClient = './DEXClientContractLoadTest.json';

if (networkSelector == 2) {

  const vaultAddr = '0:d0936a9fc29b5175487208b1d07ab8042ce7ddbc2de7e271c4087ca833b865cc';
  const vaultWTONAddr = '0:9ded00aed222ece1b9ce7b4de60b2e1e705dd5b685e25a537a012a988193647d';

  const rootWTONAddr = '0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37';

  const valueTON = 10_000_000_000;

  TonClient.useBinaryLibrary(libNode);

  async function main(client) {
    let responce;
    let resultArr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"}));

    resultArr.splice(1, 9);

    for (const item of resultArr) {
      const clientKeys = item.keys;
      const clientAddr = item.address;

      const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});

      response = await clientAcc.runLocal("rootConnector", {});
      let connectorWTONAddr = response.decoded.output.rootConnector[rootWTONAddr];

      const { body } = await client.abi.encode_message_body({
        abi: { type: "Contract", value: WrappedTONVaultContract.abi },
        signer: { type: "None" },
        is_internal: true,
        call_set: {
          function_name: "wrap",
          input: {
            tokens:valueTON,
            wallet_public_key:0,
            owner_address:connectorWTONAddr,
            gas_back_address:clientAddr,
          },
        },
      });

      responce = await clientAcc.run("sendTransaction", {
        dest:vaultAddr,
        value:valueTON + 1_200_000_000,
        bounce:true,
        flags:3,
        payload:body,
      });
      console.log("Contract reacted to your sendTransaction for wrap:", responce.decoded.output);

    }

  }


} else {console.log("Only for main.ton.dev");}


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
