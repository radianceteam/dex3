pragma ton-solidity ^0.45.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;
pragma AbiHeader time;

interface IDEXRoot {
	function createDEXpair(
		address root0,
		address root1,
		uint256 pairSoArg,
		uint256 connectorSoArg0,
		uint256 connectorSoArg1,
		uint256 rootSoArg,
		bytes rootName,
		bytes rootSymbol,
		uint8 rootDecimals,
		uint128 grammsForPair,
		uint128 grammsForRoot,
		uint128 grammsForConnector,
		uint128 grammsForWallet
	) external;
}
