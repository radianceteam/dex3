Hi, I had a first look at the contracts, and here is a first list of comments:
* Contract DEXRoot:

  * AlwaysAccept modifier should not exist. Accepting without
    conditions is an attack vector and should not be possible.
    All the getters (getPairByRoots01, etc.) should not accept(),
    as they should be called in local mode.

    + remove `AlwaysAccept` from all getters

  * receive() increases the size of balanceOf(), whatever the value
    transferred. An attacker could increase this size to make the
    system unusable using small amounts never spent. A require()
    should check a minimal value (note that createDEXclient will
    fail if this amount is smaller than 0.0031 ton)

    + add `require (!(msg.value < GRAMS_CREATE_DEX_CLIENT), 107)`

 * checkCreatorAndAccept only checks a non-empty pubkey. When used
    in setCreator(), it consumes small amounts of tokens. Attackers
    could use that spend the balance of the contract.

 * setCreator associates any pubkey to a giverAddr. Anybody could use
    it to associate with any giverAddr and spend the balanceOf
    before the real user. setCreator should be called by a contract
    with the pubkey as parameter, instead of the opposite.

 * createDEXclient always accept() without checks. If it later fails
    with require(), it will empty the balance of the contract with
    only a few calls. The contract should check the msg.pubkey instead
    of taking the pubkey as argument.

    Here is an example of attack, where user B uses A's balance to deploy
    his DEXClient:
    A multisig --> transfer --> receive(): balanceOf[A_addr] = 1 ton
    B ---> setCreator( A_addr ): creators[ B_pubkey ] = A_addr
    A ---> setCreator( A_addr ): creators[ A_pubkey ] = A_addr
    B ---> createDEXclient ( B_pubkey, 0 ):
           DEXClient is deployed for B_pubkey
           delete balanceOf[A_addr]
    A ---> createDEXclient ( A_pubkey, 0 ): fails

    + change logic for deposit

        `uint128 constant public GRAMS_CREATE_DEX_CLIENT = 1 ton;`

        `mapping(address => uint128) public balanceOf;`

        `mapping(address => uint256) public hashOf;`

        `receive() external {
          require (!(msg.value < GRAMS_CREATE_DEX_CLIENT), 107);
          balanceOf[msg.sender] += msg.value;
          TvmSlice slice = msg.data;
          if (!slice.empty()) {
            (uint32 functionId, string message) = slice.decode(uint32, string);
            hashOf[msg.sender] = sha256(message);
          }
        }`

        `function hashOfPubKey(uint256 pubKey) private inline pure returns (uint256) {
          string stringFromPubKey = format("{:x}", pubKey);
          return sha256(stringFromPubKey);
        }`

        `function createDEXclient(address giver, uint256 souint) public checkNotEmptyPubkey returns (address deployedAddress, bool statusCreate){
          require (!pubkeys.exists(msg.pubkey()) && hashOf.exists(giver) && !(balanceOf[giver] < GRAMS_CREATE_DEX_CLIENT) && hashOf[giver] == hashOfPubKey(msg.pubkey()), 106);
          tvm.accept();
          uint256 pubkey = msg.pubkey();
          statusCreate = false;
          deployedAddress = address(0);
          uint128 prepay = balanceOf[giver];
          TvmCell stateInit = tvm.buildStateInit({
            contr: DEXClient,
            varInit: {rootDEX:address(this), soUINT:souint, codeDEXConnector:codeDEXconnector},
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
          delete balanceOf[giver];
          delete hashOf[giver];
        }`

 * DEXRoot has a soUINT static fields, so why are all functions
   taking a different souint parameters ? Since createDEXclient
   checks that the pubkey does not already exists in pubkeys,
   it prevents users from creating two DEXClient for the same key,
   even with different souint parameters.


 * In general, we think that amounts should not be written in
   nanotons, because it is hard to count zeroes. 0.5 ton is
   more readable and less errorprone than 500000000.

* Contract DEXClient:
  * function tokensReceivedCallback is "alwaysAccept":
   * An attacker can use it to spend the balance of the contract
     by providing big arguments, especially using the payload
     argument whose size is not bounded
   * An attacker can send random data to delete correct callbacks
     from the callbacks mapping, as it is limited to 10 entries,
     before the user has time to collect them.
  * in general, modifier alwaysAccept should never be used. It can be
     used:
     * to consume the balance of the contract by iterating calls to
       view methods
     * to increase the cost of executing the contract, by storing
       useless information in the contract, that will be deserialized
       everytime the contract is used. For example, setPair and
       connectCallback can be used this way.
  * accept() should never be used before require(): if the require
    fails, every shard in the system will execute the message and
    decrease the balance of the contract. It's an efficent way to
    empty the balance.  createNewPair has such require() after
    checkOwnerAndAccept.
