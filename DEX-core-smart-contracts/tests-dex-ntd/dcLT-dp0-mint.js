const {TonClient, abiContract, signerKeys} = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");
const { Account } = require("@tonclient/appkit");
const { DEXClientContract } = require("./DEXClient.js");
const { RootTokenContract } = require("./RootTokenContract.js");
const { TONTokenWalletContract } = require("./TONTokenWallet.js");
const dotenv = require('dotenv').config();
const networks = ["http://localhost",'net.ton.dev','main.ton.dev','rustnet.ton.dev'];
const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!"];
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
  let responce;
  let resultArr = JSON.parse(fs.readFileSync(pathJsonClient,{encoding: "utf8"}));
  const pairAddr = JSON.parse(fs.readFileSync(currentPairPath,{encoding: "utf8"})).address;
  let tonusdData = await CoinGeckoClient.coins.fetch('ton-crystal', {});
  console.log('1 ton = ',tonusdData.data.market_data.current_price.usd,' usd');
  let tonusd = Number(tonusdData.data.market_data.current_price.usd);
  let tonprovide = 10000;
  let usdprovide = tonprovide * tonusd;
  tonprovide = convert(tonprovide,9);
  usdprovide = convert(usdprovide,9);
  console.log(tonprovide,' nano wTON');
  console.log(usdprovide,' nano USDT');
  const rootKeysA = JSON.parse(fs.readFileSync(currentRootA,{encoding: "utf8"})).keys;
  const rootAddrA = JSON.parse(fs.readFileSync(currentRootA,{encoding: "utf8"})).address;
  const rootAccA = new Account(RootTokenContract, {address: rootAddrA,signer:rootKeysA,client,});
  console.log("rootAddrA:", rootAddrA);
  const rootKeysB = JSON.parse(fs.readFileSync(currentRootB,{encoding: "utf8"})).keys;
  const rootAddrB = JSON.parse(fs.readFileSync(currentRootB,{encoding: "utf8"})).address;
  const rootAccB = new Account(RootTokenContract, {address: rootAddrB,signer:rootKeysB,client,});
  console.log("rootAddrB:", rootAddrB);



  for (const item of resultArr) {
    const clientKeys = item.keys;
    const clientAddr = item.address;
    const clientAcc = new Account(DEXClientContract, {address:clientAddr,signer:clientKeys,client,});
    response = await clientAcc.runLocal("rootWallet", {});
    let walletRootA = response.decoded.output.rootWallet[rootAddrA];
    const walletAccA = new Account(TONTokenWalletContract, {address: walletRootA,client,});
    let walletRootB = response.decoded.output.rootWallet[rootAddrB];
    const walletAccB = new Account(TONTokenWalletContract, {address: walletRootB,client,});
    response = await walletAccA.runLocal("balance", {_answer_id:0});
    console.log("walletAccA reacted to your balance:", response.decoded.output);
    response = await walletAccB.runLocal("balance", {_answer_id:0});
    console.log("walletAccB reacted to your balance:", response.decoded.output);
    response = await rootAccA.run("mint", {tokens:tonprovide, to:walletRootA});
    console.log(`Contract rootAccA run mint with tx ${response.decoded.output}, ${response.transaction.id}`);
    response = await rootAccB.run("mint", {tokens:usdprovide, to:walletRootB});
    console.log(`Contract rootAccB run mint with tx ${response.decoded.output}, ${response.transaction.id}`);

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
