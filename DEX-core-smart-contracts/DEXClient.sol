pragma ton-solidity >= 0.45.0;
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
import "./interfaces/ILockStakeSafeCallback.sol";
import "./interfaces/ILimitOrder.sol";


contract DEXClient is ITokensReceivedCallback, IDEXClient, IDEXConnect, ILockStakeSafeCallback {

  address static public rootDEX;
  uint256 static public soUINT;
  TvmCell static public codeDEXConnector;

  address public owner;

  // Grams constants
  uint128 constant public GRAMS_CONNECT_PAIR = 1.5 ton;
  uint128 constant public GRAMS_SET_CALLBACK_ADDR = 0.3 ton;
  uint128 constant public GRAMS_SWAP = 1.5 ton;
  uint128 constant public GRAMS_PROCESS_LIQUIDITY = 1.5 ton;
  uint128 constant public GRAMS_RETURN_LIQUIDITY = 1.5 ton;
  uint128 constant public MIN_GRAMS_TO_CONNECT_ROOT = 3.0 ton;
  uint128 constant public MIN_GRAMS_TO_CREATE_CONNECTOR = 1.0 ton;
  uint128 constant public MIN_BALANCE = 1 ton;
  uint128 constant public SET_CALLBACK_TO_ROOT = 0.5 ton;

  struct Connector {
    address root_address;
    uint256 souint;
    bool status;
  }

  address[] public rootKeys;
  mapping (address => address) public rootWallet;
  mapping (address => address) public rootConnector;
  mapping (address => Connector) connectors;
  uint256 public souintLast;

  uint public counterCallback;

  // Callback structure.
  struct Callback {
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
    uint128 payload_arg3;
    uint128 payload_arg4;
  }

  mapping (uint => Callback) public callbacks;

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

  // Function for check internal owner.
  function isInternalOwner(address forCheck) private inline view returns (bool) {
    return owner != address(0) && forCheck == owner;
  }

  modifier checkOwnerAndAccept {
    require(msg.pubkey() == tvm.pubkey() || isInternalOwner(msg.sender), 102);
    tvm.accept();
    _;
  }

  modifier checkOwner {
    require(msg.pubkey() == tvm.pubkey(), 107);
    _;
  }

  modifier checkWalletAndAccept {
    require(rootWallet.exists(msg.sender), 104);
    tvm.rawReserve(address(this).balance - msg.value, 2);
    _;
  }

  modifier checkPairAndAccept {
    require(pairs.exists(msg.sender), 108);
    tvm.rawReserve(address(this).balance - msg.value, 2);
    _;
  }

  modifier checkConnectorAndAccept {
    require(connectors.exists(msg.sender), 109);
    tvm.rawReserve(address(this).balance - msg.value, 2);
    _;
  }

  constructor(address ownerAddr) public {
    if (msg.sender == rootDEX) {
      tvm.rawReserve(address(this).balance + MIN_BALANCE - msg.value, 2);
      owner = ownerAddr;
      counterCallback = 0;
      TvmCell body = tvm.encodeBody(IDEXRoot(rootDEX).createDEXclientCallback, tvm.pubkey(), address(this), owner);
      rootDEX.transfer({value: 0, flag: 128, body:body});
    } else {
      tvm.accept();
      owner = address(0);
      counterCallback = 0;
      TvmCell body = tvm.encodeBody(IDEXRoot(rootDEX).createDEXclientCallback, tvm.pubkey(), address(this), owner);
      rootDEX.transfer({value: SET_CALLBACK_TO_ROOT, flag: 0, body:body});
    }
  }

  // Function to connect DEXClient to new DEXPair.
  function connectPair(address pairAddr) public checkOwnerAndAccept  returns (bool statusConnection) {
    require (address(this).balance >= GRAMS_CONNECT_PAIR, 110);
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

  // Function for get first callback id.
  function getFirstCallback() private inline view returns (uint) {
    optional(uint, Callback) rc = callbacks.min();
    if (rc.hasValue()) {(uint number, ) = rc.get();return number;} else {return 0;}
  }

  // Callback for DEXpair to set connection data.
  function setPair(address arg0, address arg1, address arg2, address arg3, address arg4) public checkPairAndAccept override {
    address dexpair = msg.sender;
    Pair cp = pairs[dexpair];
    cp.status = true;
    cp.rootA = arg0;
    cp.walletA = arg1;
    cp.rootB = arg2;
    cp.walletB = arg3;
    cp.rootAB = arg4;
    pairs[dexpair] = cp;
  }

  // Function for compute connector address
  function computeConnectorAddress(uint256 souint) private inline view returns (address) {
    TvmCell stateInit = tvm.buildStateInit({
      contr: DEXConnector,
      varInit: { soUINT: souint, dexclient: address(this) },
      code: codeDEXConnector,
      pubkey: tvm.pubkey()
    });
    return address(tvm.hash(stateInit));
  }

  // Function for get computed connector address
  function getConnectorAddress(uint256 connectorSoArg) public view responsible returns (address) {
    return { value: 0, bounce: false, flag: 64 } computeConnectorAddress( connectorSoArg);
  }

  // Function for connect to Root
  function connectRoot(address root, uint256 souint, uint128 gramsToConnector, uint128 gramsToRoot) public checkOwnerAndAccept returns (bool statusConnected){
    require (gramsToConnector >= MIN_GRAMS_TO_CREATE_CONNECTOR && gramsToRoot >= MIN_GRAMS_TO_CONNECT_ROOT && address(this).balance >= (gramsToConnector + gramsToRoot), 111);
    statusConnected = false;
    if (!rootWallet.exists(root) && souint > souintLast) {
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
      souintLast = souint;
      statusConnected = true;
    }
  }

  // Function for callback from DEX Connector in process connect to Root
  function connectCallback(address wallet) public override checkConnectorAndAccept {
    address connector = msg.sender;
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

  // Function to check DEXclient for swap processing.
  function isReady(address pair) private inline view returns (bool) {
    Pair cp = pairs[pair];
    Connector ccA = connectors[rootConnector[cp.rootA]];
    Connector ccB = connectors[rootConnector[cp.rootB]];
    return cp.status && rootWallet.exists(cp.rootA) && rootWallet.exists(cp.rootB) && rootConnector.exists(cp.rootA)
    && rootConnector.exists(cp.rootB) && ccA.status && ccB.status;
  }

  // Function to check DEXclient for provide liquidity processing.
  function isReadyToProvide(address pair) private inline view returns (bool) {
    Pair cp = pairs[pair];
    Connector ccA = connectors[rootConnector[cp.rootA]];
    Connector ccB = connectors[rootConnector[cp.rootB]];
    return cp.status && rootWallet.exists(cp.rootA) && rootWallet.exists(cp.rootB) && rootWallet.exists(cp.rootAB)
    && rootConnector.exists(cp.rootA) && rootConnector.exists(cp.rootB) && ccA.status && ccB.status;
  }

  // Function to get all connected pairs and created wallets of DEXclient.
  function getAllDataPreparation() public view returns(address[] pairKeysR, address[] rootKeysR){
    pairKeysR = pairKeys;
    rootKeysR = rootKeys;
  }

  // Function to swap A.
  function processSwapA(address pairAddr, uint128 qtyA, uint128 minQtyB, uint128 maxQtyB) public view checkOwnerAndAccept returns (bool processSwapStatus) {
    require (address(this).balance >= GRAMS_SWAP, 112);
    processSwapStatus = false;
    if (isReady(pairAddr)) {
      Pair cp = pairs[pairAddr];
      address connector = rootConnector[cp.rootA];
      TvmBuilder builder;
      builder.store(uint8(1), address(this), rootWallet[cp.rootB], minQtyB, maxQtyB);
      TvmCell payload = builder.toCell();
      TvmCell body = tvm.encodeBody(IDEXConnector(connector).transfer, cp.walletA, qtyA, payload);
      connector.transfer({value: GRAMS_SWAP, bounce:true, body:body});
      processSwapStatus = true;
    }
  }

  // Function to swap B.
  function processSwapB(address pairAddr, uint128 qtyB, uint128 minQtyA, uint128 maxQtyA) public view checkOwnerAndAccept returns (bool processSwapStatus) {
    require (address(this).balance >= GRAMS_SWAP, 112);
    processSwapStatus = false;
    if (isReady(pairAddr)) {
      Pair cp = pairs[pairAddr];
      address connector = rootConnector[cp.rootB];
      TvmBuilder builder;
      builder.store(uint8(1), address(this), rootWallet[cp.rootA], minQtyA, maxQtyA);
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
      builderA.store(uint8(2), address(this), rootWallet[cp.rootAB], uint128(2), uint128(2));
      TvmCell payloadA = builderA.toCell();
      TvmBuilder builderB;
      builderB.store(uint8(2), address(this), rootWallet[cp.rootAB], uint128(2), uint128(2));
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
      builder.store(uint8(3), rootWallet[cp.rootA], rootWallet[cp.rootB], uint128(3), uint128(3));
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
  ) public override checkWalletAndAccept {
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
    (uint8 arg0, address arg1, address arg2, uint128 arg3, uint128 arg4) = slice.decode(uint8, address, address, uint128, uint128);
    cc.payload_arg0 = arg0;
    cc.payload_arg1 = arg1;
    cc.payload_arg2 = arg2;
    cc.payload_arg3 = arg3;
    cc.payload_arg4 = arg4;
    callbacks[counterCallback] = cc;
    counterCallback++;
    if (counterCallback > 10){delete callbacks[getFirstCallback()];}
  }

  // Function for get callback
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
    address payload_arg2,
    uint128 payload_arg3,
    uint128 payload_arg4
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
    payload_arg3 = cc.payload_arg3;
    payload_arg4 = cc.payload_arg4;
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
  ) public view checkOwner  {
    require (!(grammsTotal < (grammsForPair+2*grammsForConnector+2*grammsForWallet+grammsForRoot)) && !(grammsTotal < 5 ton),106);
    require (!(address(this).balance < grammsTotal),105);
    tvm.accept();
    TvmCell body = tvm.encodeBody(IDEXRoot(rootDEX).createDEXpair, root0,root1,pairSoArg,connectorSoArg0,connectorSoArg1,rootSoArg,rootName,rootSymbol,rootDecimals,grammsForPair,grammsForRoot,grammsForConnector,grammsForWallet);
    rootDEX.transfer({value:grammsTotal, bounce: true, flag: 1, body:body});
  }

  // Function to get connected pair data.
  function getPairData(address pairAddr) public view returns (
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
      builder.store(uint8(4), address(this), rootWallet[tokenRoot], uint128(4), uint128(4));
      TvmCell payload = builder.toCell();
      TvmCell body = tvm.encodeBody(IDEXConnector(connector).transfer, to, tokens, payload);
      connector.transfer({value: grams, bounce:true, body:body});
      sendTokenStatus = true;
    }
  }

  // Function to send Transaction with setting bounce, flags and payload.
  function sendTransaction(address dest, uint128 value, bool bounce, uint8 flags, TvmCell payload) public pure checkOwnerAndAccept {
    dest.transfer(value, bounce, flags, payload);
  }

  // Function to receive deploy callbacks from StakeSafe.
  function deployLockStakeSafeCallback(address lockStakeSafe, address nftKey, uint128 amount, uint256 period) public override {
    tvm.rawReserve(address(this).balance - msg.value, 2);
    lockStakeSafe; nftKey; amount; period;
  }

  // Function to receive transferOwnership callbacks from StakeSafe's NFT .
  function transferOwnershipCallback(address addrFrom, address addrTo)  public override {
    tvm.rawReserve(address(this).balance - msg.value, 2);
    addrFrom; addrTo;
  }

  // Callback structure.
  struct ProcessLiquidity {
    address walletA;
    uint128 amountA;
    uint128 provideA;
    uint128 unusedReturnA;
    address walletB;
    uint128 amountB;
    uint128 provideB;
    uint128 unusedReturnB;
    address walletAB;
    uint128 mintAB;
  }

  ProcessLiquidity public pl;

  // Callback structure.
  struct ReturnLiquidity {
    address walletAB;
    uint128 burnAB;
    address walletA;
    uint128 returnA;
    address walletB;
    uint128 returnB;
  }

  ReturnLiquidity public rl;

  // Function to receive processLiquidity callbacks from DEXpair.
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
  )  public override checkPairAndAccept {
    pl = ProcessLiquidity(walletA, amountA,  provideA, unusedReturnA, walletB, amountB, provideB, unusedReturnB, walletAB, mintAB);
  }

  // Function to receive returnLiquidity callbacks from DEXpair.
  function returnLiquidityCallback(
    address walletAB,
    uint128 burnAB,
    address walletA,
    uint128 returnA,
    address walletB,
    uint128 returnB
  )  public override checkPairAndAccept {
    rl = ReturnLiquidity(walletAB, burnAB, walletA, returnA, walletB, returnB);
  }

  // Function to makeLimitOrderA
  function makeLimitOrderA(address routerWalletA, address pairAddr, uint128 qtyA, uint128 priceA) public view checkOwnerAndAccept returns (bool makeLimitOrderStatus) {
    require (address(this).balance >= GRAMS_SWAP, 112);
    makeLimitOrderStatus = false;
    if (isReady(pairAddr)) {
      Pair cp = pairs[pairAddr];
      address connector = rootConnector[cp.rootA];
      TvmBuilder builder;
      builder.store(uint8(4), pairAddr, rootWallet[cp.rootB], priceA, qtyA);
      TvmCell payload = builder.toCell();
      TvmCell body = tvm.encodeBody(IDEXConnector(connector).transfer, routerWalletA, qtyA, payload);
      connector.transfer({value: GRAMS_SWAP, bounce:true, body:body});
      makeLimitOrderStatus = true;
    }
  }

  // Function to makeLimitOrderB
  function makeLimitOrderB(address routerWalletB, address pairAddr, uint128 qtyB, uint128 priceB) public view checkOwnerAndAccept returns (bool makeLimitOrderStatus) {
    require (address(this).balance >= GRAMS_SWAP, 112);
    makeLimitOrderStatus = false;
    if (isReady(pairAddr)) {
      Pair cp = pairs[pairAddr];
      address connector = rootConnector[cp.rootB];
      TvmBuilder builder;
      builder.store(uint8(5), pairAddr, rootWallet[cp.rootA], priceB, qtyB);
      TvmCell payload = builder.toCell();
      TvmCell body = tvm.encodeBody(IDEXConnector(connector).transfer, routerWalletB, qtyB, payload);
      connector.transfer({value: GRAMS_SWAP, bounce:true, body:body});
      makeLimitOrderStatus = true;
    }
  }

  // Function to transferLimitOrder
  function transferLimitOrder(address limitOrder, address addrNewOwner, address walletNewOwnerFrom, address walletNewOwnerTo) public view checkOwnerAndAccept returns (bool transferLimitOrderStatus) {
    require (address(this).balance >= GRAMS_SWAP, 112);
    transferLimitOrderStatus = false;
    TvmCell body = tvm.encodeBody(ILimitOrder(limitOrder).transferOwnership, addrNewOwner, walletNewOwnerFrom, walletNewOwnerTo);
    limitOrder.transfer({value: GRAMS_SWAP, bounce:true, body:body});
    transferLimitOrderStatus = true;
  }

  // Function to changePrice
  function changeLimitOrderPrice(address limitOrder, uint128 newPrice) public view checkOwnerAndAccept returns (bool changePriceStatus) {
    require (address(this).balance >= GRAMS_SWAP, 112);
    changePriceStatus = false;
    TvmCell body = tvm.encodeBody(ILimitOrder(limitOrder).changePrice, newPrice);
    limitOrder.transfer({value: GRAMS_SWAP, bounce:true, body:body});
    changePriceStatus = true;
  }

  // Function to cancelOrder
  function cancelLimitOrder(address limitOrder) public view checkOwnerAndAccept returns (bool cancelOrderStatus) {
    require (address(this).balance >= GRAMS_SWAP, 112);
    cancelOrderStatus = false;
    TvmCell body = tvm.encodeBody(ILimitOrder(limitOrder).cancelOrder);
    limitOrder.transfer({value: GRAMS_SWAP, bounce:true, body:body});
    cancelOrderStatus = true;
  }

  // Function to takeLimitOrderA
  function takeLimitOrderA(address pairAddr, address limitOrderA, address routerWalletB, uint128 qtyB, uint128 priceB) public view checkOwnerAndAccept returns (bool takeLimitOrderStatus) {
    require (address(this).balance >= GRAMS_SWAP, 112);
    takeLimitOrderStatus = false;
    if (isReady(pairAddr)) {
      Pair cp = pairs[pairAddr];
      address connector = rootConnector[cp.rootB];
      TvmBuilder builder;
      builder.store(uint8(6), limitOrderA, rootWallet[cp.rootA], priceB, qtyB);
      TvmCell payload = builder.toCell();
      TvmCell body = tvm.encodeBody(IDEXConnector(connector).transfer, routerWalletB, qtyB, payload);
      connector.transfer({value: GRAMS_SWAP, bounce:true, body:body});
      takeLimitOrderStatus = true;
    }
  }

  // Function to takeLimitOrderB
  function takeLimitOrderB(address pairAddr, address limitOrderB, address routerWalletA, uint128 qtyA, uint128 priceA) public view checkOwnerAndAccept returns (bool takeLimitOrderStatus) {
    require (address(this).balance >= GRAMS_SWAP, 112);
    takeLimitOrderStatus = false;
    if (isReady(pairAddr)) {
      Pair cp = pairs[pairAddr];
      address connector = rootConnector[cp.rootA];
      TvmBuilder builder;
      builder.store(uint8(7), limitOrderB, rootWallet[cp.rootB], priceA, qtyA);
      TvmCell payload = builder.toCell();
      TvmCell body = tvm.encodeBody(IDEXConnector(connector).transfer, routerWalletA, qtyA, payload);
      connector.transfer({value: GRAMS_SWAP, bounce:true, body:body});
      takeLimitOrderStatus = true;
    }
  }

  // Function to receive plain transfers.
  receive() external {
  }

}
