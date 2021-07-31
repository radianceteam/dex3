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

 * https://github.com/radianceteam/dex2front

## DEX-core-smart-contracts architecture with sharding optimization
![DEX-core-smart-contracts-architecture](DEX-core-smart-contracts-architecture.png)
https://docs.google.com/drawings/d/176G8UEKKl_HBiC55Fq_2GYG0pdHdxxJrvAhbCLuFzhM/edit?usp=sharing

## DEX-core-smart-contracts gas flow schemes
 * swap https://docs.google.com/drawings/d/1sE0ZcyN8adgMlRZC6r6rqtR9Fyq3u4zj7X9kA0ll_bM/edit?usp=sharing
 * provide liquidity https://docs.google.com/drawings/d/1Cekvt35tKauEgWbGVz7-u0D6xJ6hhZux9-bmh0TBH-U/edit?usp=sharing
 * return liquidity https://docs.google.com/drawings/d/1_TZsYPI7mIat6N2wYxS8tSWqMOcsKc3ze1WxeXHZTv8/edit?usp=sharing

## DEX-core-smart-contracts net.ton.dev implementation
- RootTokenContract.sol
  * wTON https://net.ton.live/accounts/accountDetails?id=0%3Ad214d4779f63e062569a39d414a98c9891cf5e97cc790a3e6c62ce5fd0a5e1c9
  * wUSDT https://net.ton.live/accounts/accountDetails?id=0%3A8ed631b2691e55ddc65065e0475d82a0b776307797b31a2683a3af7b5c26b984
  * wBTC https://net.ton.live/accounts/accountDetails?id=0%3A32354f00d4f7c6adea7da52e9300a5aa0321523a85c8e759ccea947578ace4c3
  * wETH https://net.ton.live/accounts/accountDetails?id=0%3Ac58d18098ddc6a469308e41555699384f5f2dc83ff3d55cb61a3bdabcb9d3b01

- DEXRoot.sol
  * https://net.ton.live/accounts/accountDetails?id=0%3Afcbf50fa63a7121565bb8dec1cbb7e75c8e7f7d1222cd4a827ffcb86fbb3fc42

- DEXPair.sol
  * wTON-wUSDT https://net.ton.live/accounts/accountDetails?id=0%3Afff130f6bc7f66a9f6f631fe99513a60c6764cb2cc88309473d3a420ba43fb59
  * wTON-wBTC https://net.ton.live/accounts/accountDetails?id=0%3Afb2268af57152134bc1a7c8b87f288c42a9653ee559b58175cc2d1dfd4aff9c0
  * wTON-wETH https://net.ton.live/accounts/accountDetails?id=0%3Af5438acd3ab1b29007c7784ec8ee400ae350db4fe3dbb8deca60128e795e65dc

## DEX-core-smart-contracts tests

### before

#### `git clone git@github.com:radianceteam/dex2.git`
#### `cd ~/dex2/DEX-core-smart-contracts/tests-dex-ntd`
#### `npm install`
#### `cat selector > .env`

### operation tests for  DEX-core-smart-contracts
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
