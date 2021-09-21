pragma ton-solidity >= 0.43.0;

interface ILimitOrderRoot {
    function deployRouterCallback(address router) external;
    function createOrder(
        address addrOwner,
        address addrPair,
        uint8 directionPair,
        uint128 price,
        uint128 amount,
        address walletOwner
    ) external;
}
