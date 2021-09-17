pragma ton-solidity >= 0.45.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;
pragma AbiHeader time;

interface IDEXClient {
  function setPair(address arg0, address arg1, address arg2, address arg3, address arg4) external;
  function processLiquidityCallback(
    address walletA,
    uint128 amountA,
    uint128 provideA,
    uint128 unusedReturnA,
    address walletB,
    uint128 amountB,
    uint128 provideB,
    uint128 unusedReturnB,
    address walletAB,
    uint128 mintAB
  ) external;
  function returnLiquidityCallback(
    address walletAB,
    uint128 burnAB,
    address walletA,
    uint128 returnA,
    address walletB,
    uint128 returnB) external;
}
