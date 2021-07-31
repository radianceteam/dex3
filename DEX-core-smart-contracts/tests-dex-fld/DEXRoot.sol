pragma ton-solidity ^0.45.0;
pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;

import "./DEXClient.sol";
import "./DEXPair.sol";
import "./RootTokenContract.sol";
import "./interfaces/IDEXRoot.sol";

contract DEXroot is IDEXRoot {

	uint256 static public soUINT;

	TvmCell public codeDEXclient;
	TvmCell public codeDEXpair;
	TvmCell public codeDEXconnector;
	TvmCell public codeRootToken;
	TvmCell public codeTONTokenWallet;

	mapping(address => mapping(address => address)) roots;

	// Pair structure
	struct Pair {
		address root0;
		address root1;
		address rootLP;
	}

	mapping(address => Pair) public pairs;
	address[] public pairKeys;

	mapping(uint256 => address) public pubkeys;
	mapping(address => uint256) public clients;
	address[] public clientKeys;

	mapping(address => uint128) public balanceOf;
	mapping(uint256 => address) public creators;


	// Grams constants
	uint128 constant public GRAMS_CREATE_DEX_CLIENT = 1 ton;

	// Modifier that allows public function to accept external calls always.
	modifier alwaysAccept {
		tvm.accept();
		_;
	}

	// Modifier that allows public function to accept external calls only from the contract owner.
	modifier checkOwnerAndAccept {
		require(msg.pubkey() == tvm.pubkey(), 101);
		tvm.accept();
		_;
	}

	// Modifier that allows public function to accept external signed calls only.
	modifier checkCreatorAndAccept {
		require(msg.pubkey() != 0, 103);
		tvm.accept();
		_;
	}

	// Init function.
	constructor() public {
		require(tvm.pubkey() == msg.pubkey(), 102);
		tvm.accept();
	}

	// Function to transfers plain transfers.
	function sendTransfer(address dest, uint128 value, bool bounce) public pure checkOwnerAndAccept {
		dest.transfer(value, bounce, 0);
	}

	// Function to receive plain transfers.
	receive() external {
		balanceOf[msg.sender] += msg.value;
	}

	function setDEXclientCode(TvmCell code) public checkOwnerAndAccept {
		codeDEXclient = code;
	}

	function setDEXpairCode(TvmCell code) public checkOwnerAndAccept {
		codeDEXpair = code;
	}

	function setDEXconnectorCode(TvmCell code) public checkOwnerAndAccept {
		codeDEXconnector = code;
	}

	function setRootTokenCode(TvmCell code) public checkOwnerAndAccept {
		codeRootToken = code;
	}

	function setTONTokenWalletCode(TvmCell code) public checkOwnerAndAccept {
		codeTONTokenWallet = code;
	}

	function setCreator(address giverAddr) public checkCreatorAndAccept {
		uint256 pubkey = msg.pubkey();
		creators[pubkey] = giverAddr;
	}

	function computeClientAddress(uint256 pubkey, uint256 souint) private inline view returns (address) {
		TvmCell stateInit = tvm.buildStateInit({
			contr: DEXClient,
			varInit: {rootDEX:address(this),soUINT:souint,codeDEXConnector:codeDEXconnector},
			code: codeDEXclient,
			pubkey: pubkey
		});
		return address(tvm.hash(stateInit));
	}

	function getClientAddress(uint256 clientPubKey, uint256 clientSoArg) public view responsible returns (address) {
		return { value: 0, bounce: false, flag: 64 } computeClientAddress(clientPubKey,clientSoArg);
	}

	function createDEXclient(uint256 pubkey, uint256 souint) public alwaysAccept returns (address deployedAddress, bool statusCreate){
		statusCreate = false;
		deployedAddress = address(0);
		uint128 prepay = balanceOf[creators[pubkey]];
		require (!pubkeys.exists(pubkey) && !(prepay < GRAMS_CREATE_DEX_CLIENT), 106);
		delete balanceOf[creators[pubkey]];
		TvmCell stateInit = tvm.buildStateInit({
			contr: DEXClient,
			varInit: {rootDEX:address(this),soUINT:souint,codeDEXConnector:codeDEXconnector},
			code: codeDEXclient,
			pubkey: pubkey
		});
		deployedAddress = new DEXClient{
			stateInit: stateInit,
			flag: 0,
			bounce : false,
			value : (prepay - 3100000)
		}();
		pubkeys[pubkey] = deployedAddress;
		clients[deployedAddress] = pubkey;
		clientKeys.push(deployedAddress);
		statusCreate = true;
	}

	function computePairAddress(
		uint256 pubkey,
		uint256 souint,
		address creator,
		address rootA,
		address rootB,
		address rootAB
	) private inline view returns (address){
		TvmCell stateInit = tvm.buildStateInit({
			contr: DEXPair,
			varInit: {
				rootDEX:address(this),
				soUINT:souint,
				creator:creator,
				codeDEXConnector:codeDEXconnector,
				rootA:rootA,
				rootB:rootB,
				rootAB:rootAB
			},
			code: codeDEXpair,
			pubkey : pubkey
		});
		return address(tvm.hash(stateInit));
	}

	function getPairAddress(
		uint256 pairPubKey,
		uint256 pairSoArg,
		address pairCreator,
		address pairRootA,
		address pairRootB,
		address pairRootAB
	) public view responsible returns (address) {
		return { value: 0, bounce: false, flag: 64 } computePairAddress(pairPubKey,pairSoArg,pairCreator,pairRootA,pairRootB,pairRootAB);
	}

	function computeRootTokenAddress(
		uint256 pubkey,
		uint256 souint,
		bytes name,
		bytes symbol,
		uint8 decimals
	) private inline view returns (address){
		TvmCell stateInit = tvm.buildStateInit({
			contr: RootTokenContract,
			varInit: {
				_randomNonce:souint,
				name:name,
				symbol:symbol,
				decimals:decimals,
				wallet_code:codeTONTokenWallet
			},
			code: codeRootToken,
			pubkey : pubkey
		});
		return address(tvm.hash(stateInit));
	}

	function getRootTokenAddress(
		uint256 rootPubKey,
		uint256 rootSoArg,
		bytes rootName,
		bytes rootSymbol,
		uint8 rootDecimals
	) public view responsible returns (address) {
		return { value: 0, bounce: false, flag: 64 } computeRootTokenAddress(rootPubKey,rootSoArg,rootName,rootSymbol,rootDecimals);
	}

	function computeConnectorAddress(uint256 pubkey, uint256 souint, address commander) private inline view returns (address) {
		TvmCell stateInit = tvm.buildStateInit({
			contr: DEXConnector,
			varInit: { soUINT: souint, dexclient: commander },
			code: codeDEXconnector,
			pubkey: pubkey
		});
		return address(tvm.hash(stateInit));
	}

	function getConnectorAddress(uint256 connectorPubKey, uint256 connectorSoArg, address connectorCommander) public view responsible returns (address) {
		return { value: 0, bounce: false, flag: 64 } computeConnectorAddress(connectorPubKey, connectorSoArg, connectorCommander);
	}

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
	) public override {
		require(root0 != address(0) && root1 != address(0) ,104);
		require(!(grammsForPair < 500000000) && !(grammsForRoot < 500000000) && !(grammsForConnector < 500000000) && !(grammsForWallet < 500000000),105);
		tvm.rawReserve(address(this).balance - msg.value, 2);
		uint128 grammsNeeded = grammsForPair + (2 * grammsForConnector) + (2 * grammsForWallet) + grammsForRoot;
		if (clients.exists(msg.sender) && !(msg.value < grammsNeeded) && !(root0 == root1) && !roots[root0].exists(root1) && !roots[root1].exists(root0)) {
			TvmCell stateInitR = tvm.buildStateInit({
				contr: RootTokenContract,
				varInit: {
					_randomNonce:rootSoArg,
					name:rootName,
					symbol:rootSymbol,
					decimals:rootDecimals,
					wallet_code:codeTONTokenWallet
				},
				code: codeRootToken,
				pubkey : clients[msg.sender]
			});
			address root01 = address(tvm.hash(stateInitR));
			TvmCell stateInitP = tvm.buildStateInit({
				contr: DEXPair,
				varInit: {
					rootDEX:address(this),
					soUINT:pairSoArg,
					creator:msg.sender,
					codeDEXConnector:codeDEXconnector,
					rootA:root0,
					rootB:root1,
					rootAB:root01
				},
				code: codeDEXpair,
				pubkey : clients[msg.sender]
			});
			address pairAddress = new DEXPair{
				stateInit: stateInitP,
				flag: 0,
				bounce : false,
				value : grammsForPair + (2 * grammsForConnector) + (2 * grammsForWallet)
			}(connectorSoArg0, connectorSoArg1, grammsForConnector, grammsForWallet);
			address rootAddress = new RootTokenContract{
				stateInit: stateInitR,
				flag: 0,
				bounce : false,
				value : grammsForRoot
			}(0, pairAddress);
			roots[root0][root1] = pairAddress;
			roots[root1][root0] = pairAddress;
			Pair cp = pairs[pairAddress];
			cp.root0 = root0;
			cp.root1 = root1;
			cp.rootLP = rootAddress;
			pairs[pairAddress] = cp;
			pairKeys.push(pairAddress);
			msg.sender.transfer({ value: 0, flag: 128});
		} else {
			msg.sender.transfer({ value: 0, flag: 128});
		}
	}

	function getPairByRoots01(address root0, address root1) public view alwaysAccept returns (address pairAddr) {
		pairAddr = roots[root0][root1];
	}

	function getPairByRoots10(address root1, address root0) public view alwaysAccept returns (address pairAddr) {
		pairAddr = roots[root1][root0];
	}

	function getRootsByPair(address pairAddr) public view alwaysAccept returns (address root0, address root1) {
		Pair cp = pairs[pairAddr];
		root0 = cp.root0;
		root1 = cp.root1;
	}

	function checkPubKey(uint256 pubkey) public view alwaysAccept returns (bool status, address dexclient) {
		status = pubkeys.exists(pubkey);
		dexclient = pubkeys[pubkey];
	}

	// Function to get balance TONgrams for DEXroot.
	function getBalanceTONgrams() public pure alwaysAccept returns (uint128 balanceTONgrams){
		return address(this).balance;
	}

}
