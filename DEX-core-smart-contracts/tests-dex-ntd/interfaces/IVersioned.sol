pragma ton-solidity ^0.45.0;

interface IVersioned {
    function getVersion() external pure responsible returns (uint32);
}
