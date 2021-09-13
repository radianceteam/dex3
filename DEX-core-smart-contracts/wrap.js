const fs = require('fs');

let abiRaw = fs.readFileSync(`./build/DEXClient.abi.json`);
let abi = JSON.parse(abiRaw);
let image = fs.readFileSync(`./build/DEXClient.tvc`, {encoding: "base64",});
let code = fs.readFileSync(`./build/DEXClient.txt`, {encoding: "utf8",});
code = code.substring(0, code.length - 1);
fs.writeFileSync(`./tests-dex-ntd/DEXClient.js`,`module.exports = {DEXClientContract:{abi:${JSON.stringify(abi)},tvc:${JSON.stringify(image)},code:${JSON.stringify(code)}}};`);

abiRaw = fs.readFileSync(`./build/DEXPair.abi.json`);
abi = JSON.parse(abiRaw);
image = fs.readFileSync(`./build/DEXPair.tvc`, {encoding: "base64",});
code = fs.readFileSync(`./build/DEXPair.txt`, {encoding: "utf8",});
code = code.substring(0, code.length - 1);
fs.writeFileSync(`./tests-dex-ntd/DEXPair.js`,`module.exports = {DEXPairContract:{abi:${JSON.stringify(abi)},tvc:${JSON.stringify(image)},code:${JSON.stringify(code)}}};`);

abiRaw = fs.readFileSync(`./build/DEXConnector.abi.json`);
abi = JSON.parse(abiRaw);
image = fs.readFileSync(`./build/DEXConnector.tvc`, {encoding: "base64",});
code = fs.readFileSync(`./build/DEXConnector.txt`, {encoding: "utf8",});
code = code.substring(0, code.length - 1);
fs.writeFileSync(`./tests-dex-ntd/DEXConnector.js`,`module.exports = {DEXConnectorContract:{abi:${JSON.stringify(abi)},tvc:${JSON.stringify(image)},code:${JSON.stringify(code)}}};`);

abiRaw = fs.readFileSync(`./build/DEXRoot.abi.json`);
abi = JSON.parse(abiRaw);
image = fs.readFileSync(`./build/DEXRoot.tvc`, {encoding: "base64",});
code = fs.readFileSync(`./build/DEXRoot.txt`, {encoding: "utf8",});
code = code.substring(0, code.length - 1);
fs.writeFileSync(`./tests-dex-ntd/DEXRoot.js`,`module.exports = {DEXRootContract:{abi:${JSON.stringify(abi)},tvc:${JSON.stringify(image)},code:${JSON.stringify(code)}}};`);

abiRaw = fs.readFileSync(`./build/RootTokenContract.abi.json`);
abi = JSON.parse(abiRaw);
image = fs.readFileSync(`./build/RootTokenContract.tvc`, {encoding: "base64",});
code = fs.readFileSync(`./build/RootTokenContract.txt`, {encoding: "utf8",});
code = code.substring(0, code.length - 1);
fs.writeFileSync(`./tests-dex-ntd/RootTokenContract.js`,`module.exports = {RootTokenContractContract:{abi:${JSON.stringify(abi)},tvc:${JSON.stringify(image)},code:${JSON.stringify(code)}}};`);

abiRaw = fs.readFileSync(`./build/TONTokenWallet.abi.json`);
abi = JSON.parse(abiRaw);
image = fs.readFileSync(`./build/TONTokenWallet.tvc`, {encoding: "base64",});
code = fs.readFileSync(`./build/TONTokenWallet.txt`, {encoding: "utf8",});
code = code.substring(0, code.length - 1);
fs.writeFileSync(`./tests-dex-ntd/TONTokenWallet.js`,`module.exports = {TONTokenWalletContract:{abi:${JSON.stringify(abi)},tvc:${JSON.stringify(image)},code:${JSON.stringify(code)}}};`);
