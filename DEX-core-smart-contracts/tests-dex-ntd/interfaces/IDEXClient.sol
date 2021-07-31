pragma ton-solidity ^0.45.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;
pragma AbiHeader time;

interface IDEXClient {
  function setPair(address arg0, address arg1, address arg2, address arg3, address arg4) external;
}
