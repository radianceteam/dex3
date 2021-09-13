const { exec } = require("child_process");

exec("tondev sol compile DEXClient.sol -o ./build/", (error, stdout, stderr) => {
  if (error) {console.log(`error: ${error.message}`);return;}
  if (stderr) {console.log(`stderr: ${stderr}`);return;}
  console.log(`stdout sol compile DEXClient.sol: ${stdout}`);
});

exec("tondev sol compile DEXConnector.sol -o ./build/", (error, stdout, stderr) => {
  if (error) {console.log(`error: ${error.message}`);return;}
  if (stderr) {console.log(`stderr: ${stderr}`);return;}
  console.log(`stdout sol compile DEXConnector.sol: ${stdout}`);
});

exec("tondev sol compile DEXPair.sol -o ./build/", (error, stdout, stderr) => {
  if (error) {console.log(`error: ${error.message}`);return;}
  if (stderr) {console.log(`stderr: ${stderr}`);return;}
  console.log(`stdout sol compile DEXPair.sol: ${stdout}`);
});

exec("tondev sol compile DEXRoot.sol -o ./build/", (error, stdout, stderr) => {
  if (error) {console.log(`error: ${error.message}`);return;}
  if (stderr) {console.log(`stderr: ${stderr}`);return;}
  console.log(`stdout sol compile DEXRoot.sol: ${stdout}`);
});

exec("tondev sol compile RootTokenContract.sol -o ./build/", (error, stdout, stderr) => {
  if (error) {console.log(`error: ${error.message}`);return;}
  if (stderr) {console.log(`stderr: ${stderr}`);return;}
  console.log(`stdout sol compile RootTokenContract.sol: ${stdout}`);
});

exec("tondev sol compile TONTokenWallet.sol -o ./build/", (error, stdout, stderr) => {
  if (error) {console.log(`error: ${error.message}`);return;}
  if (stderr) {console.log(`stderr: ${stderr}`);return;}
  console.log(`stdout sol compile TONTokenWallet.sol: ${stdout}`);
});
