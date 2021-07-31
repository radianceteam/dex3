pragma ton-solidity ^0.45.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;
pragma AbiHeader time;

interface IDEXConnector {
  function deployEmptyWallet(address root) external;
  function setTransferCallback() external;
  function setBouncedCallback() external;
  function transfer(address to, uint128 tokens, TvmCell payload) external;
  function burn(uint128 tokens, address callback_address, TvmCell callback_payload) external;
}
