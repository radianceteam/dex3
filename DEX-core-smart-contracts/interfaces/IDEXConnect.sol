pragma ton-solidity >= 0.45.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;
pragma AbiHeader time;

interface IDEXConnect {
  function connectCallback(address wallet) external;
}
