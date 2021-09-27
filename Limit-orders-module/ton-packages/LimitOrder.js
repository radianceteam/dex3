module.exports = {LimitOrderContract:{abi:{"ABI version":2,"header":["time","expire"],"functions":[{"name":"constructor","inputs":[{"name":"codeIndex","type":"cell"},{"name":"addrRouter","type":"address"},{"name":"addrOwner","type":"address"},{"name":"addrPair","type":"address"},{"name":"directionPair","type":"uint8"},{"name":"price","type":"uint128"},{"name":"amount","type":"uint128"},{"name":"walletOwnerRoot","type":"address"},{"name":"walletOwnerFrom","type":"address"},{"name":"walletOwnerTo","type":"address"}],"outputs":[]},{"name":"applyOrder","inputs":[{"name":"receivedAmount","type":"uint128"},{"name":"price","type":"uint128"},{"name":"idCallback","type":"uint256"}],"outputs":[]},{"name":"applyOrderCallback","inputs":[{"name":"result","type":"bool"},{"name":"amount","type":"uint128"},{"name":"originalGasTo","type":"address"}],"outputs":[]},{"name":"transferOwnership","inputs":[{"name":"addrNewOwner","type":"address"},{"name":"walletNewOwnerFrom","type":"address"},{"name":"walletNewOwnerTo","type":"address"}],"outputs":[]},{"name":"changePrice","inputs":[{"name":"newPrice","type":"uint128"}],"outputs":[]},{"name":"cancelOrder","inputs":[],"outputs":[]},{"name":"cancelOrderCallback","inputs":[],"outputs":[]},{"name":"getInfo","inputs":[],"outputs":[{"name":"addrRoot","type":"address"},{"name":"addrRouter","type":"address"},{"name":"addrOwner","type":"address"},{"name":"addrPair","type":"address"},{"name":"directionPair","type":"uint8"},{"name":"price","type":"uint128"},{"name":"amount","type":"uint128"},{"name":"walletOwnerRoot","type":"address"},{"name":"walletOwnerFrom","type":"address"},{"name":"walletOwnerTo","type":"address"},{"name":"status","type":"uint8"}]},{"name":"resolveCodeHashIndex","inputs":[{"name":"addrRoot","type":"address"},{"name":"addrOwner","type":"address"},{"name":"addrPair","type":"address"},{"name":"directionPair","type":"uint8"},{"name":"price","type":"uint128"}],"outputs":[{"name":"codeHashIndex","type":"uint256"}]},{"name":"resolveIndex","inputs":[{"name":"addrRoot","type":"address"},{"name":"addrOwner","type":"address"},{"name":"addrPair","type":"address"},{"name":"directionPair","type":"uint8"},{"name":"price","type":"uint128"},{"name":"addrOrder","type":"address"}],"outputs":[{"name":"addrIndex","type":"address"}]}],"data":[{"key":1,"name":"_id","type":"uint256"}],"events":[]},tvc:"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",code:"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"}};