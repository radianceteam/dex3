const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXClientContract } = require("./DEXClient.js");
const { DEXPairContract } = require("./DEXPair.js");
const { RootTokenContractContract } = require("./RootTokenContract.js");
const { TONTokenWalletContract } = require("./TONTokenWallet.js");
const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev','https://gql.custler.net'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!","Hello fld dev net TON!"];
const networkSelector = process.env.NET_SELECTOR;

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const fs = require('fs');
const pathJsonRoot = './DEXRootContract.json';
const pathJsonClient = './DEXClientContractLoadTest.json';

const pathJsonPairTonUsdt = './DEXPairContractTonUsdt.json';
const pathJsonWTON = './WTONdata.json';
const pathJsonUSDT = './USDTdata.json';

let currentRootA = pathJsonWTON;
let currentRootB = pathJsonUSDT;
let currentPairPath = pathJsonPairTonUsdt;

function convert(number, decimal) {
  return Math.trunc(number)*(10**decimal) + Math.floor((number - Math.trunc(number))*(10**decimal));
}

TonClient.useBinaryLibrary(libNode);

async function main(client) {
  let response;
  let resultArr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"}));
  const pairAddr = JSON.parse(fs.readFileSync(currentPairPath,{encoding: "utf8"})).address;
  let tonusdData = await CoinGeckoClient.coins.fetch('ton-crystal', {});
  console.log('1 ton = ',tonusdData.data.market_data.current_price.usd,' usd');
  let tonusd = Number(tonusdData.data.market_data.current_price.usd);
  let tonprovide = 300;
  let usdprovide = tonprovide * tonusd;
  tonprovide = convert(tonprovide,9);
  usdprovide = convert(usdprovide,9);
  console.log(tonprovide,' nano wTON');
  console.log(usdprovide,' nano USDT');
  const rootKeysA = JSON.parse(fs.readFileSync(currentRootA,{encoding: "utf8"})).keys;
  const rootAddrA = JSON.parse(fs.readFileSync(currentRootA,{encoding: "utf8"})).address;
  const rootAccA = new Account(RootTokenContractContract, {address: rootAddrA,signer:rootKeysA,client,});
  console.log("rootAddrA:", rootAddrA);
  const rootKeysB = JSON.parse(fs.readFileSync(currentRootB,{encoding: "utf8"})).keys;
  const rootAddrB = JSON.parse(fs.readFileSync(currentRootB,{encoding: "utf8"})).address;
  const rootAccB = new Account(RootTokenContractContract, {address: rootAddrB,signer:rootKeysB,client,});
  console.log("rootAddrB:", rootAddrB);

  const pairAcc = new Account(DEXPairContract, {address: pairAddr,client,});
  response = await pairAcc.runLocal("rootAB", {});
  const rootAddrAB = response.decoded.output.rootAB;

  let clientCount = 0;
  // resultArr.splice(1, 9);
  for (const item of resultArr) {
    // const item = resultArr[0];
    console.log("======DEX client count:", clientCount);
    const clientKeys = item.keys;
    const clientAddr = item.address;
    const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});
    response = await clientAcc.runLocal("rootWallet", {});
    let walletRootA = response.decoded.output.rootWallet[rootAddrA];
    const walletAccA = new Account(TONTokenWalletContract, {address: walletRootA,client,});
    let walletRootB = response.decoded.output.rootWallet[rootAddrB];
    const walletAccB = new Account(TONTokenWalletContract, {address: walletRootB,client,});
    let walletRootAB = response.decoded.output.rootWallet[rootAddrAB];
    const walletAccAB = new Account(TONTokenWalletContract, {address: walletRootAB,client,});

    response = await walletAccA.runLocal("balance", {_answer_id:0});
    console.log("Token A balance:", response.decoded.output);
    response = await walletAccB.runLocal("balance", {_answer_id:0});
    console.log("Token B balance:", response.decoded.output);
    response = await walletAccAB.runLocal("balance", {_answer_id:0});
    console.log("Token AB balance:", response.decoded.output);

    response = await clientAcc.runLocal("getBalance", {_answer_id:0});
    console.log(" TON balance:", response.decoded.output);

    // response = await clientAcc.runLocal("pl", {});
    // console.log(" processLiquidityCallback:", response.decoded.output);
    //
    // response = await clientAcc.runLocal("rl", {});
    // console.log(" returnLiquidityCallback:", response.decoded.output);


    clientCount++;
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
