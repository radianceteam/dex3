pragma ton-solidity >= 0.45.0;
pragma AbiHeader expire;
pragma AbiHeader pubkey;
pragma AbiHeader time;

import "./interfaces/IRootTokenContract.sol";
import "./interfaces/ITONTokenWallet.sol";
import "./interfaces/ITokenWalletDeployedCallback.sol";
import "./interfaces/ITokensReceivedCallback.sol";
import './interfaces/ILimitOrderRoot.sol';
import './interfaces/ILimitOrderRouter.sol';
import './interfaces/IExpectedWalletAddressCallback.sol';

import './libraries/Constants.sol';

contract LimitOrderRouter is ITokenWalletDeployedCallback, ITokensReceivedCallback, IExpectedWalletAddressCallback, ILimitOrderRouter {

  address static public rootLimitOrder;

  mapping(address => address) public walletFor;
  mapping(address => uint128) public balanceFor;

  uint public counterCallback;

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

  modifier checkRoot {
    require(msg.sender == rootLimitOrder, 101);
    _;
  }

  constructor(address[] rootArr) public checkRoot {
    tvm.rawReserve(address(this).balance - msg.value, 2);
    counterCallback = 0;
    for (address root : rootArr) {
      walletFor[root] = address(0);
      TvmCell bodyA = tvm.encodeBody(IRootTokenContract(root).deployEmptyWallet, Constants.TO_WALLET_BALANCE, 0, address(this), address(this));
      root.transfer({value: Constants.FOR_WALLET_DEPLOY, bounce:true, body:bodyA});
      TvmCell bodyB = tvm.encodeBody(IRootTokenContract(root).sendExpectedWalletAddress, 0, address(this), address(this));
      root.transfer({value: Constants.SEND_MSG, bounce:true, body:bodyB});
    }
    TvmCell bodyC = tvm.encodeBody(ILimitOrderRoot(rootLimitOrder).deployRouterCallback, address(this));
    rootLimitOrder.transfer({value: 0, bounce:true, flag: 128, body:bodyC});
  }

  function deployEmptyWalletFor(address root) public override checkRoot {
    tvm.rawReserve(address(this).balance - msg.value, 2);
    require(!walletFor.exists(root) && msg.value >= Constants.FOR_WALLET_DEPLOY + Constants.SEND_MSG, 102);
    walletFor[root] = address(0);
    TvmCell bodyA = tvm.encodeBody(IRootTokenContract(root).deployEmptyWallet, Constants.TO_WALLET_BALANCE, 0, address(this), address(this));
    root.transfer({value: Constants.FOR_WALLET_DEPLOY, bounce:true, body:bodyA});
    TvmCell bodyB = tvm.encodeBody(IRootTokenContract(root).sendExpectedWalletAddress, 0, address(this), address(this));
    root.transfer({value: Constants.SEND_MSG, bounce:true, body:bodyB});

    rootLimitOrder.transfer({value: 0, bounce:true, flag: 128});
  }

  function notifyWalletDeployed(address root) public override {
    root;
  }

  function expectedWalletAddressCallback(address wallet, uint256 wallet_public_key, address owner_address) public override {
  require(walletFor.exists(msg.sender) && wallet_public_key == 0 && owner_address == address(this), 103);
  tvm.rawReserve(address(this).balance - msg.value, 2);
  walletFor[msg.sender] = wallet;
  balanceFor[wallet] = 0;
  TvmCell body = tvm.encodeBody(ITONTokenWallet(wallet).setReceiveCallback, address(this), true);
  wallet.transfer({value: 0.1 ton, bounce:true, flag: 0, body:body});
}

  function getFirstCallback() private view returns (uint) {
    optional(uint, Callback) rc = callbacks.min();
    if (rc.hasValue()) {(uint number, ) = rc.get();return number;} else {return 0;}
  }

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
  ) public override {
    tvm.rawReserve(address(this).balance - msg.value, 2);
    if (balanceFor.exists(msg.sender)) {
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
      if (counterCallback > 10) { delete callbacks[getFirstCallback()];}
      if (arg0 == 4) {
        balanceFor[token_wallet] += amount;
        TvmCell body = tvm.encodeBody(ILimitOrderRoot(rootLimitOrder).createOrder,original_gas_to,arg1,uint8(4),arg3,amount,arg2);
        rootLimitOrder.transfer({value: 0, bounce: true, flag: 128, body:body});
      }
      if (arg0 == 5) {
        balanceFor[token_wallet] += amount;
        TvmCell body = tvm.encodeBody(ILimitOrderRoot(rootLimitOrder).createOrder,original_gas_to,arg1,uint8(4),arg3,arg4,arg2);
        rootLimitOrder.transfer({value: 0, bounce: true, flag: 128, body:body});
      }
    }
  }

  // Function for get callback
  function getCallback(uint id) public view returns (
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

  function thisBalance() private inline  pure returns (uint128) {
    return address(this).balance;
  }

  function getBalance() public pure responsible returns (uint128) {
    return { value: 0, bounce: false, flag: 64 } thisBalance();
  }

  receive() external {
  }

}
