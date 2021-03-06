# DEX-core-smart-contracts

## Glossary
* AMM — An automated market maker (AMM) is a type of decentralized exchange (DEX) protocol that relies on a mathematical formula to price assets. Instead of using an order book like a traditional exchange, assets are priced according to a ratio between assets in Liquidity Pools.
* Liquidity Pools - liquidity pool is a trading venue for a pair of tokens.
* Liquidity Provider – a user of the AMM DEX that add funds to pairs in return for a Liquidity Provider fees paid by traders for every trade.
* Pair – a smart-contract system that manages DEX token reserves. A user can connect his client wallet to a pair to automatically deploy the respective TIP-3 wallets to perform token swap and provide liquidity.
* TIP-3 token standard - Free TON standard interface for distributed tokens, provides basic functionality to mint and transfer tokens between token wallets.
* Debot – special smart-contract, which intended to be run locally on client with full abilities to access blockchain. Primary goal is E2ED support.

## Description
* User guides: https://docs.defispace.com

## DEX-core-smart-contracts stage2 develop goal
1. DEX-core-smart-contracts developed for speed optimization dex operations. During stage 1 tested speed of msg between smartcontracts deployed in different shard of freeTON is about 15-20 sec. For dex operations which consist from more then 8 consecutive msgs it leads for operation time > 120 sec. Using sharding optimization we decreased this 10 times to 5-15 sec.
2. DEX-core-smart-contracts developed for gas manegment optimization dex operations.

## DEX-core-smart-contracts web interface
 * https://trade.defispace.com

 * https://github.com/radianceteam/defispace-front

## DEX-core-smart-contracts architecture with sharding optimization
![DEX-core-smart-contracts-architecture](https://user-images.githubusercontent.com/12598254/134993988-8595c44d-571d-4837-9574-4ad0c9e38ed3.jpg)
https://drive.google.com/file/d/1QfCY30uvazWHvqbWBDTOQcAFd7k_g9RD/view?usp=sharing

## DEX-core-smart-contracts gas flow schemes
 * swap 
 ![SWAP-GAS](https://user-images.githubusercontent.com/12598254/134994429-f6b0bde0-c148-480f-89b1-e1fea7d98da4.jpg)
  https://drive.google.com/file/d/1h6kc_-AXlDqwdMq7CPHBwTZZL9U5DBH2/view?usp=sharing
 * provide liquidity 
  ![LIQUID-PROV](https://user-images.githubusercontent.com/12598254/134994459-351a3c5c-7a45-443b-9cf8-15a0e5fcbcbd.jpg)
  https://drive.google.com/file/d/1Rv7pejdHFlaekS7hrNkZMNwOL09p-ecb/view?usp=sharing
 * return liquidity
 ![LIQ-WITHDRW](https://user-images.githubusercontent.com/12598254/134994491-4336299a-24cf-4fc7-90ba-d67ca7d2800a.jpg)
  https://drive.google.com/file/d/12Lo0zotoMmfQxaEW-t4LRHcXS3UGcWfd/view?usp=sharing

## Limit orders diagrams
 * Maker 
 ![limitOrders3-maker](https://user-images.githubusercontent.com/12598254/134994564-a03edd63-f4c5-49c4-b926-af3dc5f6e1c7.jpg)
 https://drive.google.com/file/d/1K-4rtYQGT_1-XMnBpvi5pR9a5TIXbd7s/view?usp=sharing
 * Taker 
 ![limitOrders3-taker](https://user-images.githubusercontent.com/12598254/134994575-18b22d69-0e35-47b5-a70e-24cc26c563d3.jpg)
 https://drive.google.com/file/d/1xPOhv0BNXHayXwJRZS5thwWJFBq7DpK6/view?usp=sharing

## DEX-core-smart-contracts main.ton.dev implementation
- RootTokenContract.sol
  * WTON https://ton.live/accounts/accountDetails?id=0%3A0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37
  * USDT https://ton.live/accounts/accountDetails?id=0%3A751b6e22687891bdc1706c8d91bf77281237f7453d27dc3106c640ec165a2abf

- DEXRoot.sol
  * https://ton.live/accounts/accountDetails?id=0%3A5d0f5a8cb443e00934d1bb632acadc036a6c41b59308e3a36d809449a5e777d9

- DEXPair.sol
  * wTON-wUSDT https://ton.live/accounts/accountDetails?id=0%3A5ed8c97d370b1684590e2ba04370734fd5e5fb2c5900d03791aab8b47afd79ef

## DEX-core-smart-contracts tests

### before

#### `git clone git@github.com:radianceteam/dex2.git`
#### `cd ~/dex2/DEX-core-smart-contracts/tests-dex-ntd`
#### `npm install`
#### `cat selector > .env`

### net.ton.dev operation tests for  DEX-core-smart-contracts
Tests for dex operations: swap tokenA / tokenB, swap tokenB / tokenA, provde liquidity and return liquidity. During tests observe that the change in the DEX client's wallet balances during operations is equal to the mathematics embedded in the smart contract.

#### `npm run test:swapA`
* before run can change on line`1` of `dcLT-dp0-swapA.test.js` swap qty `const qtyA = 5000000000000;`
* after the test:
  - DEX root address:  0:fcbf50fa63a7121565bb8dec1cbb7e75c8e7f7d1222cd4a827ffcb86fbb3fc42
  - current dexclient address:  0:f69a29461766ed144a0c00be74770a717875b4baa448a27078b34a5325b64326
  - current dexpair address:  0:fff130f6bc7f66a9f6f631fe99513a60c6764cb2cc88309473d3a420ba43fb59
  - rate B / A before:  0.37995261398500463
  - swapA qty:10000000000
  - % qtyA from reserveA:  0.0004999667198439735
  - ((qtyA-fee(0.3%))*reserveB) / reserveA):  3788127561
  - computed getAmountOut:  3788108678
  - shift %:  0.0004984809467032392
  - client TON gramm balance before: 12798932564
  - swapA status: true
  - swap speed ms: 8418
  - rate B / A after: :  0.37994882043907985
  - client TON gramm balance after: 12601312701
  - swapB operation cost: 0.197619863
  - client balanceB changed, computed getAmountOut 3788108678,3788108678
  - `SwapA test`
  - the array to be checked:  3788108678,3788108678
  ✔ should check equal client balanceB changed and computed getAmountOut

#### `npm run test:swapB`
* before run can change on line`1` of `dcLT-dp0-swapB.test.js` swap qty `const qtyB = 3000000000;`
* after the test:
  - DEX root address:  0:fcbf50fa63a7121565bb8dec1cbb7e75c8e7f7d1222cd4a827ffcb86fbb3fc42
  - current dexclient address:  0:f69a29461766ed144a0c00be74770a717875b4baa448a27078b34a5325b64326
  - current dexpair address:  0:fff130f6bc7f66a9f6f631fe99513a60c6764cb2cc88309473d3a420ba43fb59
  - rate A / B before:  2.6319334242026886
  - swapB qty:3000000000
  - % qtyB from reserveB:  0.00039476176260646494
  - ((qtyB-fee(0.3%))*reserveB) / reserveA):  7872112872
  - computed getAmountOut:  7872081889
  - shift %:  0.0003935807634718458
  - client TON gramm balance before: 12601312701
  - swapB status: true
  - swap speed ms: 12696
  - rate A / B after: :  2.6319126757614133
  - client TON gramm balance after: 12402112204
  - swapB operation cost: 0.199200497
  - client balanceA changed, computed getAmountOut 7872081889,7872081889
  - `SwapB test`
  - the array to be checked:  7872081889,7872081889
  ✔ should check equal client balanceA changed and computed getAmountOut

#### `npm run test:provide`
* before run can change on line`1` of `dcLT-dp0-provide.test.js` swap qty `const qtyA = 100000000000;`
* before run can change on line`2` of `dcLT-dp0-provide.test.js` swap qty `const qtyB = 30000000000;`
* after the test:
  - reserveA before:  2000135257403357
  - reserveB before:  759955022757249
  - totalSupply before:  759964175793533
  - ask to provide qtyA:100000000000
  - ask to provide qtyB:30000000000
  - should be provide qtyA:78957380272
  - should be provide qtyB:30000000000
  - should get LP tokens:  30000361325
  - client TON gramm balance before: 12402112204
  - provide status: true
  - provide speed ms: 12134
  - totalSupply after:  759994176154858
  - totalSupply changed:  30000361325
  - client income qty LP token to balanceAB:  30000361325
  - provided qtyA:78957380272
  - provided qtyB:30000000000
  - client TON gramm balance after: 11946845634
  - provideLiquidity operation cost: 0.45526657
  - client balanceA changed, pair balanceA changed:  78957380272 78957380272
  - client balanceB changed, pair balanceB changed:  30000000000 30000000000
  - client balanceAB changed, expected qty LP tokens:  30000361325 30000361325
  - `Provide test`
  - the array to be checked:  78957380272 78957380272
  ✔ should check equal client balanceA changed, pair balanceA changed
  - the array to be checked:  30000000000 30000000000
  ✔ should check equal client balanceB changed, pair balanceB changed
  - the array to be checked:  30000361325 30000361325
  ✔ should check equal client balanceAB changed, expected qty LP tokens

#### `npm run test:return`
* before run can change on line`1` of `dcLT-dp0-return.test.js` burning qty `let qtyAB = 30000000000;`
* after the test:
  - reserveA before:  2000214214783629
  - reserveB before:  759985022757249
  - totalSupply before:  759994176154858
  - ask to return qtyAB:30000000000
  - balance AB:759994176154858
  - expected returning qtyAB:30000000000
  - expected receiving qtyA:78956429307
  - expected receiving qtyB:29999638678
  - client TON gramm balance before: 11946845634
  - return status: true
  - return speed ms: 13196
  - totalSupply after:  759964176154858
  - totalSupply changed:  30000000000
  - client outgoing qty LP token from balanceAB:  30000000000
  - client get qtyA:78956429307
  - client get qtyB:29999638678
  - client TON gramm balance after: 11671789785
  - returnLiquidity operation cost: 0.275055849
  - client balanceA changed, pair balanceA changed:  78956429307 78956429307
  - client balanceB changed, pair balanceB changed:  29999638678 29999638678
  - client balanceAB changed, expected returning qty LP tokens:  30000000000 30000000000
  - `Return test`
  - the array to be checked:  78956429307 78956429307
  ✔ should check equal client balanceA changed, pair balanceA changed
  - the array to be checked:  29999638678 29999638678
  ✔ should check equal client balanceB changed, pair balanceB changed
  - the array to be checked:  30000000000 30000000000
  ✔ should check equal client balanceAB changed, expected returning LP tokens
  - the array to be checked:  78956429307 78956429307
  ✔ should check equal client balanceA changed, expected receiving qtyA
  - the array to be checked:  29999638678 29999638678
  ✔ should check equal client balanceB changed, expected receiving qtyB

### load test for  DEX-core-smart-contracts
Testing several simultaneous swaps to observe their parallel execution from different DEX clients smart contract to one DEX pair smart contract, during this test each script add msgs load about 0.5 - 1 msg/sec. During test observe stable DEXpair working under load level about 5-10  msg/sec and average swap speed 10 sec, which means that concurrent requests will be processed correctly

#### in separate console windows `npm run test:load1`,then ... ,then `npm run test:load10`
#### `npm run test:load1`
* before run can change on line`1` of `dcLT-dp0-swaptest-client0.js` token A qty for one swap`const qtyA = 10000000000;`
* before run can change on line`2` of `dcLT-dp0-swaptest-client0.js` token B qty for one swap `const qtyB = 3783810000;`
* before run can change on line`3` of `dcLT-dp0-swaptest-client0.js` iteration qty `const testIteration = 200;`
* during the test showing logs:
  - DEX root address:  0:fcbf50fa63a7121565bb8dec1cbb7e75c8e7f7d1222cd4a827ffcb86fbb3fc42
  - current dexclient address:  0:f69a29461766ed144a0c00be74770a717875b4baa448a27078b34a5325b64326
  - current dexpair address:  0:fff130f6bc7f66a9f6f631fe99513a60c6764cb2cc88309473d3a420ba43fb59
  - timestamp:  1623944316210
  - 0  ========> test count: 1  time:  Thu, 17 Jun 2021 15:38:36 GMT
  - rate B / A before:  0.37994001333702637
  - swapA qty:10000000000
  - % qtyA from reserveA:  0.0004999582091471015
  - ((qtyA-fee(0.3%))*reserveB) / reserveA):  3788001933
  - computed getAmountOut:  3787983051
  - shift %:  0.0004984710793394243
  - client TON gramm balance before: 20092806705
  - swapA status: true
  - swapA speed ms: 9211
  - rate B / A after: :  0.3799362199814826
  - client TON gramm balance after: 19894586894
  - swapB operation cost: 0.198219811
  - client balanceB changed, computed getAmountOut 3787983051,3787983051
  - rate A / B before:  2.632020711393976
  - swapB qty:3783810000
  - % qtyB from reserveB:  0.0004979092052736114
  - ((qtyB-fee(0.3%))*reserveB) / reserveA):  9929189089
  - computed getAmountOut:  9929139799
  - shift %:  0.000496417625271306
  - client TON gramm balance before: 19894586894
  - swapB status: true
  - swapB speed ms: 10146
  - rate A / B after: :  2.6319945407575496
  - client TON gramm balance after: 19695386778
  - swapB operation cost: 0.199200116
  - client balanceB changed, computed getAmountOut 9929139799,9929139799
  -   ========> cumulutive data:
  - test count: 1
  - load msg count: 16
  - work duration sec: 22.976
  - msg/sec speed: 0.6963788300835655
  - average swap time sec: 9.6785
  - TON spend: 0.397419927

  ... and then script make next iteration

#### `npm run test:load2`
* same settings as for `npm run test:load1`

#### `npm run test:load3`
* same settings as for `npm run test:load1`

#### `npm run test:load4`
* same settings as for `npm run test:load1`

#### `npm run test:load5`
* same settings as for `npm run test:load1`

#### `npm run test:load6`
* same settings as for `npm run test:load1`

#### `npm run test:load7`
* same settings as for `npm run test:load1`

#### `npm run test:load8`
* same settings as for `npm run test:load1`

#### `npm run test:load9`
* same settings as for `npm run test:load1`

#### `npm run test:load10`
* same settings as for `npm run test:load1`
