const fs = require('fs');
const { exec } = require("child_process");

exec("~/.tondev/solidity/tvm_linker decode --tvc ./build/DEXClient.tvc | grep code: | cut -c 8- > ./build/DEXClient.txt", (error, stdout, stderr) => {
  if (error) {console.log(`error: ${error.message}`);return;}
  if (stderr) {console.log(`stderr: ${stderr}`);return;}
  console.log(`stdout tvm_linker decode DEXClient.tvc: ${stdout}`);
  let abiRaw = fs.readFileSync(`./build/DEXClient.abi.json`);
  let abi = JSON.parse(abiRaw);
  let image = fs.readFileSync(`./build/DEXClient.tvc`, {encoding: "base64",});
  let code = fs.readFileSync(`./build/DEXClient.txt`, {encoding: "utf8",});
  code = code.substring(0, code.length - 1);
  fs.writeFileSync(`./tests-dex-ntd/DEXClient.js`,`module.exports = {DEXClientContract:{abi:${JSON.stringify(abi)},tvc:${JSON.stringify(image)},code:${JSON.stringify(code)}}};`);
  console.log(`create and writeFileSyn ./tests-dex-ntd/DEXClient.js`);
});

exec("~/.tondev/solidity/tvm_linker decode --tvc ./build/DEXConnector.tvc | grep code: | cut -c 8- > ./build/DEXConnector.txt", (error, stdout, stderr) => {
  if (error) {console.log(`error: ${error.message}`);return;}
  if (stderr) {console.log(`stderr: ${stderr}`);return;}
  console.log(`stdout tvm_linker decode DEXConnector.tvc: ${stdout}`);
  abiRaw = fs.readFileSync(`./build/DEXConnector.abi.json`);
  abi = JSON.parse(abiRaw);
  image = fs.readFileSync(`./build/DEXConnector.tvc`, {encoding: "base64",});
  code = fs.readFileSync(`./build/DEXConnector.txt`, {encoding: "utf8",});
  code = code.substring(0, code.length - 1);
  fs.writeFileSync(`./tests-dex-ntd/DEXConnector.js`,`module.exports = {DEXConnectorContract:{abi:${JSON.stringify(abi)},tvc:${JSON.stringify(image)},code:${JSON.stringify(code)}}};`);
  console.log(`create and writeFileSyn ./tests-dex-ntd/DEXConnector.js`);
});

exec("~/.tondev/solidity/tvm_linker decode --tvc ./build/DEXPair.tvc | grep code: | cut -c 8- > ./build/DEXPair.txt", (error, stdout, stderr) => {
  if (error) {console.log(`error: ${error.message}`);return;}
  if (stderr) {console.log(`stderr: ${stderr}`);return;}
  console.log(`stdout tvm_linker decode DEXPair.tvc: ${stdout}`);
  abiRaw = fs.readFileSync(`./build/DEXPair.abi.json`);
  abi = JSON.parse(abiRaw);
  image = fs.readFileSync(`./build/DEXPair.tvc`, {encoding: "base64",});
  code = fs.readFileSync(`./build/DEXPair.txt`, {encoding: "utf8",});
  code = code.substring(0, code.length - 1);
  fs.writeFileSync(`./tests-dex-ntd/DEXPair.js`,`module.exports = {DEXPairContract:{abi:${JSON.stringify(abi)},tvc:${JSON.stringify(image)},code:${JSON.stringify(code)}}};`);
  console.log(`create and writeFileSyn ./tests-dex-ntd/DEXPair.js`);
});

exec("~/.tondev/solidity/tvm_linker decode --tvc ./build/DEXRoot.tvc | grep code: | cut -c 8- > ./build/DEXRoot.txt", (error, stdout, stderr) => {
  if (error) {console.log(`error: ${error.message}`);return;}
  if (stderr) {console.log(`stderr: ${stderr}`);return;}
  console.log(`stdout tvm_linker decode DEXRoot.tvc: ${stdout}`);
  abiRaw = fs.readFileSync(`./build/DEXRoot.abi.json`);
  abi = JSON.parse(abiRaw);
  image = fs.readFileSync(`./build/DEXRoot.tvc`, {encoding: "base64",});
  code = fs.readFileSync(`./build/DEXRoot.txt`, {encoding: "utf8",});
  code = code.substring(0, code.length - 1);
  fs.writeFileSync(`./tests-dex-ntd/DEXRoot.js`,`module.exports = {DEXRootContract:{abi:${JSON.stringify(abi)},tvc:${JSON.stringify(image)},code:${JSON.stringify(code)}}};`);
  console.log(`create and writeFileSyn ./tests-dex-ntd/DEXRoot.js`);
});

exec("~/.tondev/solidity/tvm_linker decode --tvc ./build/RootTokenContract.tvc | grep code: | cut -c 8- > ./build/RootTokenContract.txt", (error, stdout, stderr) => {
  if (error) {console.log(`error: ${error.message}`);return;}
  if (stderr) {console.log(`stderr: ${stderr}`);return;}
  console.log(`stdout tvm_linker decode RootTokenContract.tvc: ${stdout}`);
  abiRaw = fs.readFileSync(`./build/RootTokenContract.abi.json`);
  abi = JSON.parse(abiRaw);
  image = fs.readFileSync(`./build/RootTokenContract.tvc`, {encoding: "base64",});
  code = fs.readFileSync(`./build/RootTokenContract.txt`, {encoding: "utf8",});
  code = code.substring(0, code.length - 1);
  fs.writeFileSync(`./tests-dex-ntd/RootTokenContract.js`,`module.exports = {RootTokenContractContract:{abi:${JSON.stringify(abi)},tvc:${JSON.stringify(image)},code:${JSON.stringify(code)}}};`);
  console.log(`create and writeFileSyn ./tests-dex-ntd/RootTokenContract.js`);
});

exec("~/.tondev/solidity/tvm_linker decode --tvc ./build/TONTokenWallet.tvc | grep code: | cut -c 8- > ./build/TONTokenWallet.txt", (error, stdout, stderr) => {
  if (error) {console.log(`error: ${error.message}`);return;}
  if (stderr) {console.log(`stderr: ${stderr}`);return;}
  console.log(`stdout tvm_linker decode TONTokenWallet.tvc: ${stdout}`);
  abiRaw = fs.readFileSync(`./build/TONTokenWallet.abi.json`);
  abi = JSON.parse(abiRaw);
  image = fs.readFileSync(`./build/TONTokenWallet.tvc`, {encoding: "base64",});
  code = fs.readFileSync(`./build/TONTokenWallet.txt`, {encoding: "utf8",});
  code = code.substring(0, code.length - 1);
  fs.writeFileSync(`./tests-dex-ntd/TONTokenWallet.js`,`module.exports = {TONTokenWalletContract:{abi:${JSON.stringify(abi)},tvc:${JSON.stringify(image)},code:${JSON.stringify(code)}}};`);
  console.log(`create and writeFileSyn ./tests-dex-ntd/TONTokenWallet.js`);
});

// not work now
// tondev js wrap ./build/DEXClient.abi.json -o ../tests-dex-ntd/DEXClient.js &&
// tondev js wrap ./build/DEXConnector.abi.json -o ../tests-dex-ntd/DEXConnector.js &&
// tondev js wrap ./build/DEXPair.abi.json -o ../tests-dex-ntd/DEXPair.js &&
// tondev js wrap ./build/DEXRoot.abi.json -o ../tests-dex-ntd/DEXRoot.js &&
// tondev js wrap ./build/RootTokenContract.abi.json -o ../tests-dex-ntd/RootTokenContract.js &&
// tondev js wrap ./build/TONTokenWallet.abi.json -o ../tests-dex-ntd/TONTokenWallet.js &&
// tondev js wrap ./build/SetcodeMultisigWallet.abi.json -o ../tests-dex-ntd/SetcodeMultisigWallet.js
