pragma ton-solidity ^0.45.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;
pragma AbiHeader time;

import "./DEXConnector.sol";
import "./interfaces/IRootTokenContract.sol";
import "./interfaces/ITONTokenWallet.sol";
import "./interfaces/ITokensReceivedCallback.sol";
import "./interfaces/IDEXConnector.sol";
import "./interfaces/IDEXConnect.sol";
import "./interfaces/IDEXClient.sol";
import "./interfaces/IDEXPair.sol";
import "./interfaces/IDEXRoot.sol";

contract DEXClient is ITokensReceivedCallback, IDEXClient, IDEXConnect {

  address static public rootDEX;
  uint256 static public soUINT;
  TvmCell static public codeDEXConnector;

  // Grams constants
  uint128 constant GRAMS_CONNECT_PAIR = 500000000;
  uint128 constant GRAMS_SET_CALLBACK_ADDR = 100000000;
  uint128 constant GRAMS_SWAP = 500000000;
  uint128 constant GRAMS_PROCESS_LIQUIDITY = 500000000;
  uint128 constant GRAMS_RETURN_LIQUIDITY = 500000000;

  struct Connector {
    address root_address;
    uint256 souint;
    bool status;
  }

  address[] public rootKeys;
  mapping (address => address) public rootWallet;
  mapping (address => address) public rootConnector;
  mapping (address => Connector) connectors;

  uint public counterCallback;

  // Callback logger only for dev purpose

  // struct Callback {
    address token_wallet;
    address token_root;
    uint128 amount;
    uint256 sender_public_key;
    address sender_address;
    address sender_wallet;
    address original_gas_to;
    uint128 updated_balance;
    uint8 payload_arg0;
    address payload_arg1;
    address payload_arg2;
  }

  mapping (uint => Callback) callbacks;

  // Pair structure
  struct Pair {
    bool status;
    address rootA;
    address walletA;
    address rootB;
    address walletB;
    address rootAB;
  }

  mapping(address => Pair) public pairs;
  address[] public pairKeys;

  // Modifier that allows public function to accept any external calls.
  modifier alwaysAccept {
    tvm.accept();
    _;
  }

  modifier checkOwnerAndAccept {
    require(msg.pubkey() == tvm.pubkey(), 102);
    tvm.accept();
    _;
  }

  constructor() public {
    require(msg.sender == rootDEX, 103);
    tvm.accept();
    counterCallback = 0;
  }

  // Function to connect DEXClient to new DEXPair.
  function connectPair(address pairAddr) public checkOwnerAndAccept  returns (bool statusConnection) {
    statusConnection = false;
    if (!pairs.exists(pairAddr)){
      Pair cp = pairs[pairAddr];
      cp.status = false;
      pairs[pairAddr] = cp;
      pairKeys.push(pairAddr);
      TvmCell body = tvm.encodeBody(IDEXPair(pairAddr).connect);
      pairAddr.transfer({value:GRAMS_CONNECT_PAIR, body:body});
      statusConnection = true;
    }
  }

  // Function to get Quotient of division
  function getQuotient(uint128 arg0, uint128 arg1, uint128 arg2) private inline pure returns (uint128) {
    (uint128 quotient, ) = math.muldivmod(arg0, arg1, arg2);
    return quotient;
  }

  // Function to get Remainder of division
  function getRemainder(uint128 arg0, uint128 arg1, uint128 arg2) private inline pure returns (uint128) {
    (, uint128 remainder) = math.muldivmod(arg0, arg1, arg2);
    return remainder;
  }

  // Callback for DEXpair to set connection data.
  function setPair(address arg0, address arg1, address arg2, address arg3, address arg4) public alwaysAccept override {
    address dexpair = msg.sender;
    if (pairs.exists(dexpair)){
      Pair cp = pairs[dexpair];
      cp.status = true;
      cp.rootA = arg0;
      cp.walletA = arg1;
      cp.rootB = arg2;
      cp.walletB = arg3;
      cp.rootAB = arg4;
      pairs[dexpair] = cp;
    }
  }

  function computeConnectorAddress(uint256 souint) private inline view returns (address) {
    TvmCell stateInit = tvm.buildStateInit({
      contr: DEXConnector,
      varInit: { soUINT: souint, dexclient: address(this) },
      code: codeDEXConnector,
      pubkey: tvm.pubkey()
    });
    return address(tvm.hash(stateInit));
  }

  function getConnectorAddress(uint256 connectorSoArg) public view responsible returns (address) {
    return { value: 0, bounce: false, flag: 64 } computeConnectorAddress( connectorSoArg);
  }

  function connectRoot(address root, uint256 souint, uint128 gramsToConnector, uint128 gramsToRoot) public checkOwnerAndAccept returns (bool statusConnected){
    statusConnected = false;
    if (!rootWallet.exists(root)) {
      TvmCell stateInit = tvm.buildStateInit({
        contr: DEXConnector,
        varInit: { soUINT: souint, dexclient: address(this) },
        code: codeDEXConnector,
        pubkey: tvm.pubkey()
      });
      TvmCell init = tvm.encodeBody(DEXConnector);
      address connector = tvm.deploy(stateInit, init, gramsToConnector, address(this).wid);
      Connector cr = connectors[connector];
      cr.root_address = root;
      cr.souint = souint;
      cr.status = false;
      connectors[connector] = cr;
      TvmCell body = tvm.encodeBody(IDEXConnector(connector).deployEmptyWallet, root);
      connector.transfer({value:gramsToRoot, bounce:true, body:body});
      statusConnected = true;
    }
  }

  function connectCallback(address wallet) public override alwaysAccept {
    address connector = msg.sender;
    if (connectors.exists(connector)) {
      Connector cc = connectors[connector];
      rootKeys.push(cc.root_address);
      rootWallet[cc.root_address] = wallet;
      rootConnector[cc.root_address] = connector;
      TvmCell bodySTC = tvm.encodeBody(IDEXConnector(connector).setTransferCallback);
      connector.transfer({value: GRAMS_SET_CALLBACK_ADDR, bounce:true, flag: 0, body:bodySTC});
      TvmCell bodySBC = tvm.encodeBody(IDEXConnector(connector).setBouncedCallback);
      connector.transfer({value: GRAMS_SET_CALLBACK_ADDR, bounce:true, flag: 0, body:bodySBC});
      cc.status = true;
      connectors[connector] = cc;
    }
  }

  // Function to check DEXclient for swap processing.
  function isReady(address pair) private inline view returns (bool) {
    Pair cp = pairs[pair];
    Connector ccA = connectors[rootConnector[cp.rootA]];
    Connector ccB = connectors[rootConnector[cp.rootB]];
    return cp.status && rootWallet.exists(cp.rootA) && rootWallet.exists(cp.rootB) && rootConnector.exists(cp.rootA) && rootConnector.exists(cp.rootB) && ccA.status && ccB.status;
  }

  // Function to check DEXclient for provide liquidity processing.
  function isReadyToProvide(address pair) private inline view returns (bool) {
    Pair cp = pairs[pair];
    Connector ccA = connectors[rootConnector[cp.rootA]];
    Connector ccB = connectors[rootConnector[cp.rootB]];
    return cp.status && rootWallet.exists(cp.rootA) && rootWallet.exists(cp.rootB) && rootWallet.exists(cp.rootAB) && rootConnector.exists(cp.rootA) && rootConnector.exists(cp.rootB) && ccA.status && ccB.status;
  }


  // Function to get all connected pairs and created wallets of DEXclient.
  function getAllDataPreparation() public view alwaysAccept returns(address[] pairKeysR, address[] rootKeysR){
    pairKeysR = pairKeys;
    rootKeysR = rootKeys;
  }

  // Function to swap A.
  function processSwapA(address pairAddr, uint128 qtyA) public view checkOwnerAndAccept returns (bool processSwapStatus) {
    processSwapStatus = false;
    if (isReady(pairAddr)) {
      Pair cp = pairs[pairAddr];
      address connector = rootConnector[cp.rootA];
      TvmBuilder builder;
      builder.store(uint8(1), cp.rootB, rootWallet[cp.rootB]);
      TvmCell payload = builder.toCell();
      TvmCell body = tvm.encodeBody(IDEXConnector(connector).transfer, cp.walletA, qtyA, payload);
      connector.transfer({value: GRAMS_SWAP, bounce:true, body:body});
      processSwapStatus = true;
    }
  }

  // Function to swap B.
  function processSwapB(address pairAddr, uint128 qtyB) public view checkOwnerAndAccept returns (bool processSwapStatus) {
    processSwapStatus = false;
    if (isReady(pairAddr)) {
      Pair cp = pairs[pairAddr];
      address connector = rootConnector[cp.rootB];
      TvmBuilder builder;
      builder.store(uint8(1), cp.rootA, rootWallet[cp.rootA]);
      TvmCell payload = builder.toCell();
      TvmCell body = tvm.encodeBody(IDEXConnector(connector).transfer, cp.walletB, qtyB, payload);
      connector.transfer({value: GRAMS_SWAP, bounce:true, body:body});
      processSwapStatus = true;
    }
  }

  // Function to provide liquidity to DEXpair.
  function processLiquidity(address pairAddr, uint128 qtyA, uint128 qtyB) public view checkOwnerAndAccept returns (bool processLiquidityStatus) {
    processLiquidityStatus = false;
    if (isReadyToProvide(pairAddr)) {
      Pair cp = pairs[pairAddr];
      address connectorA = rootConnector[cp.rootA];
      address connectorB = rootConnector[cp.rootB];
      TvmBuilder builderA;
      builderA.store(uint8(2), address(this), rootWallet[cp.rootAB]);
      TvmCell payloadA = builderA.toCell();
      TvmBuilder builderB;
      builderB.store(uint8(2), address(this), rootWallet[cp.rootAB]);
      TvmCell payloadB = builderB.toCell();
      TvmCell bodyA = tvm.encodeBody(IDEXConnector(connectorA).transfer, cp.walletA, qtyA, payloadA);
      TvmCell bodyB = tvm.encodeBody(IDEXConnector(connectorB).transfer, cp.walletB, qtyB, payloadB);
      connectorA.transfer({value: GRAMS_PROCESS_LIQUIDITY, bounce:true, body:bodyA});
      connectorB.transfer({value: GRAMS_PROCESS_LIQUIDITY, bounce:true, body:bodyB});
      processLiquidityStatus = true;
    }
  }

  // Function to returm liquidity from DEXpair.
  function returnLiquidity(address pairAddr, uint128 tokens) public view checkOwnerAndAccept returns (bool returnLiquidityStatus) {
    returnLiquidityStatus = false;
    if (isReadyToProvide(pairAddr)) {
    Pair cp = pairs[pairAddr];
    TvmBuilder builder;
    builder.store(uint8(3), rootWallet[cp.rootA], rootWallet[cp.rootB]);
    TvmCell callback_payload = builder.toCell();
    TvmCell body = tvm.encodeBody(IDEXConnector(rootConnector[cp.rootAB]).burn, tokens, pairAddr, callback_payload);
    rootConnector[cp.rootAB].transfer({value:GRAMS_RETURN_LIQUIDITY, body:body});
    returnLiquidityStatus = true;
    }
  }

  // Function to receive callbacks from DEXClient TONToken Wallets and processing.
  function tokensReceivedCallback(
    address token_wallet,
    address token_root,
    uint128 amount,
    uint256 sender_public_key,
    address sender_address,
    address sender_wallet,
    address original_gas_to,
    uint128 updated_balance,
    TvmCell payload
  ) public override alwaysAccept {
    counterCallback++;
    Callback cc = callbacks[counterCallback];
    cc.token_wallet = token_wallet;
    cc.token_root = token_root;
    cc.amount = amount;
    cc.sender_public_key = sender_public_key;
    cc.sender_address = sender_address;
    cc.sender_wallet = sender_wallet;
    cc.original_gas_to = original_gas_to;
    cc.updated_balance = updated_balance;
    TvmSlice slice = payload.toSlice();
    (uint8 arg0, address arg1, address arg2) = slice.decode(uint8, address, address);
    cc.payload_arg0 = arg0;
    cc.payload_arg1 = arg1;
    cc.payload_arg2 = arg2;
    callbacks[counterCallback] = cc;
  }

  function getCallback(uint id) public view checkOwnerAndAccept returns (
    address token_wallet,
    address token_root,
    uint128 amount,
    uint256 sender_public_key,
    address sender_address,
    address sender_wallet,
    address original_gas_to,
    uint128 updated_balance,
    uint8 payload_arg0,
    address payload_arg1,
    address payload_arg2
  ){
    Callback cc = callbacks[id];
    token_wallet = cc.token_wallet;
    token_root = cc.token_root;
    amount = cc.amount;
    sender_public_key = cc.sender_public_key;
    sender_address = cc.sender_address;
    sender_wallet = cc.sender_wallet;
    original_gas_to = cc.original_gas_to;
    updated_balance = cc.updated_balance;
    payload_arg0 = cc.payload_arg0;
    payload_arg1 = cc.payload_arg1;
    payload_arg2 = cc.payload_arg2;
  }

  // Function for get this contract TON gramms balance
  function thisBalance() private inline  pure returns (uint128) {
    return address(this).balance;
  }

  // Function for external get this contract TON gramms balance
  function getBalance() public pure responsible returns (uint128) {
    return { value: 0, bounce: false, flag: 64 } thisBalance();
  }

  // Function to create DEXpair by DEXclient via DEXroot.
  function createNewPair(
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
		uint128 grammsForWallet,
    uint128 grammsTotal
  ) public view checkOwnerAndAccept  {
    require (!(grammsTotal < (grammsForPair+2*grammsForConnector+2*grammsForWallet+grammsForRoot)) && !(grammsTotal < 5 ton),106);
    require (!(address(this).balance < grammsTotal),105);
    TvmCell body = tvm.encodeBody(IDEXRoot(rootDEX).createDEXpair, root0,root1,pairSoArg,connectorSoArg0,connectorSoArg1,rootSoArg,rootName,rootSymbol,rootDecimals,grammsForPair,grammsForRoot,grammsForConnector,grammsForWallet);
    rootDEX.transfer({value:grammsTotal, bounce:false, flag: 1, body:body});
  }

  // Function to get connected pair data.
  function getPairData(address pairAddr) public view alwaysAccept returns (
    bool pairStatus,
    address pairRootA,
    address pairWalletA,
    address pairRootB,
    address pairWalletB,
    address pairRootAB,
    address curPair
  ){
    Pair cp = pairs[pairAddr];
    pairStatus = cp.status;
    pairRootA = cp.rootA;
    pairWalletA = cp.walletA;
    pairRootB = cp.rootB;
    pairWalletB = cp.walletB;
    pairRootAB = cp.rootAB;
    curPair = pairAddr;
  }

  // Function to send Tokens.
  function sendTokens(address tokenRoot, address to, uint128 tokens, uint128 grams) public checkOwnerAndAccept view returns (bool sendTokenStatus){
    sendTokenStatus = false;
    if (rootConnector[tokenRoot] != address(0)) {
      address connector = rootConnector[tokenRoot];
      TvmBuilder builder;
      builder.store(uint8(4), address(this), rootWallet[tokenRoot]);
      TvmCell payload = builder.toCell();
      TvmCell body = tvm.encodeBody(IDEXConnector(connector).transfer, to, tokens, payload);
      connector.transfer({value: grams, bounce:true, body:body});
      sendTokenStatus = true;
    }
  }

  // Function to receive plain transfers.
  receive() external {
  }

}
