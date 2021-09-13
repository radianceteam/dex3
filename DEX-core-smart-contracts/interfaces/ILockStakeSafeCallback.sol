pragma ton-solidity >= 0.45.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;
pragma AbiHeader time;

interface ILockStakeSafeCallback {
  function deployLockStakeSafeCallback(address lockStakeSafe, address nftKey, uint128 amount, uint256 period) external;
  function transferOwnershipCallback(address addrFrom, address addrTo) external;
}
