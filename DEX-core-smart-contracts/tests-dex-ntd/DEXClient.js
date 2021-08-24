const DEXClientContract = {
    abi: {
        "ABI version": 2,
        "header": [
            "pubkey",
            "time",
            "expire"
        ],
        "functions": [
            {
                "name": "constructor",
                "inputs": [
                    {
                        "name": "ownerAddr",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "connectPair",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "statusConnection",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "setPair",
                "inputs": [
                    {
                        "name": "arg0",
                        "type": "address"
                    },
                    {
                        "name": "arg1",
                        "type": "address"
                    },
                    {
                        "name": "arg2",
                        "type": "address"
                    },
                    {
                        "name": "arg3",
                        "type": "address"
                    },
                    {
                        "name": "arg4",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getConnectorAddress",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    },
                    {
                        "name": "connectorSoArg",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "connectRoot",
                "inputs": [
                    {
                        "name": "root",
                        "type": "address"
                    },
                    {
                        "name": "souint",
                        "type": "uint256"
                    },
                    {
                        "name": "gramsToConnector",
                        "type": "uint128"
                    },
                    {
                        "name": "gramsToRoot",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "statusConnected",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "connectCallback",
                "inputs": [
                    {
                        "name": "wallet",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getAllDataPreparation",
                "inputs": [],
                "outputs": [
                    {
                        "name": "pairKeysR",
                        "type": "address[]"
                    },
                    {
                        "name": "rootKeysR",
                        "type": "address[]"
                    }
                ]
            },
            {
                "name": "processSwapA",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "qtyA",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "processSwapStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "processSwapB",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "qtyB",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "processSwapStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "processLiquidity",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "qtyA",
                        "type": "uint128"
                    },
                    {
                        "name": "qtyB",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "processLiquidityStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "returnLiquidity",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "tokens",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "returnLiquidityStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "tokensReceivedCallback",
                "inputs": [
                    {
                        "name": "token_wallet",
                        "type": "address"
                    },
                    {
                        "name": "token_root",
                        "type": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint128"
                    },
                    {
                        "name": "sender_public_key",
                        "type": "uint256"
                    },
                    {
                        "name": "sender_address",
                        "type": "address"
                    },
                    {
                        "name": "sender_wallet",
                        "type": "address"
                    },
                    {
                        "name": "original_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "updated_balance",
                        "type": "uint128"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getCallback",
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "token_wallet",
                        "type": "address"
                    },
                    {
                        "name": "token_root",
                        "type": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint128"
                    },
                    {
                        "name": "sender_public_key",
                        "type": "uint256"
                    },
                    {
                        "name": "sender_address",
                        "type": "address"
                    },
                    {
                        "name": "sender_wallet",
                        "type": "address"
                    },
                    {
                        "name": "original_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "updated_balance",
                        "type": "uint128"
                    },
                    {
                        "name": "payload_arg0",
                        "type": "uint8"
                    },
                    {
                        "name": "payload_arg1",
                        "type": "address"
                    },
                    {
                        "name": "payload_arg2",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "getBalance",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "createNewPair",
                "inputs": [
                    {
                        "name": "root0",
                        "type": "address"
                    },
                    {
                        "name": "root1",
                        "type": "address"
                    },
                    {
                        "name": "pairSoArg",
                        "type": "uint256"
                    },
                    {
                        "name": "connectorSoArg0",
                        "type": "uint256"
                    },
                    {
                        "name": "connectorSoArg1",
                        "type": "uint256"
                    },
                    {
                        "name": "rootSoArg",
                        "type": "uint256"
                    },
                    {
                        "name": "rootName",
                        "type": "bytes"
                    },
                    {
                        "name": "rootSymbol",
                        "type": "bytes"
                    },
                    {
                        "name": "rootDecimals",
                        "type": "uint8"
                    },
                    {
                        "name": "grammsForPair",
                        "type": "uint128"
                    },
                    {
                        "name": "grammsForRoot",
                        "type": "uint128"
                    },
                    {
                        "name": "grammsForConnector",
                        "type": "uint128"
                    },
                    {
                        "name": "grammsForWallet",
                        "type": "uint128"
                    },
                    {
                        "name": "grammsTotal",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getPairData",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "pairStatus",
                        "type": "bool"
                    },
                    {
                        "name": "pairRootA",
                        "type": "address"
                    },
                    {
                        "name": "pairWalletA",
                        "type": "address"
                    },
                    {
                        "name": "pairRootB",
                        "type": "address"
                    },
                    {
                        "name": "pairWalletB",
                        "type": "address"
                    },
                    {
                        "name": "pairRootAB",
                        "type": "address"
                    },
                    {
                        "name": "curPair",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "sendTokens",
                "inputs": [
                    {
                        "name": "tokenRoot",
                        "type": "address"
                    },
                    {
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "grams",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "sendTokenStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "sendTransaction",
                "inputs": [
                    {
                        "name": "dest",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint128"
                    },
                    {
                        "name": "bounce",
                        "type": "bool"
                    },
                    {
                        "name": "flags",
                        "type": "uint8"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "rootDEX",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootDEX",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "soUINT",
                "inputs": [],
                "outputs": [
                    {
                        "name": "soUINT",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "codeDEXConnector",
                "inputs": [],
                "outputs": [
                    {
                        "name": "codeDEXConnector",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "owner",
                "inputs": [],
                "outputs": [
                    {
                        "name": "owner",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "rootKeys",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootKeys",
                        "type": "address[]"
                    }
                ]
            },
            {
                "name": "rootWallet",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootWallet",
                        "type": "map(address,address)"
                    }
                ]
            },
            {
                "name": "rootConnector",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootConnector",
                        "type": "map(address,address)"
                    }
                ]
            },
            {
                "name": "counterCallback",
                "inputs": [],
                "outputs": [
                    {
                        "name": "counterCallback",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "pairs",
                "inputs": [],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "status",
                                "type": "bool"
                            },
                            {
                                "name": "rootA",
                                "type": "address"
                            },
                            {
                                "name": "walletA",
                                "type": "address"
                            },
                            {
                                "name": "rootB",
                                "type": "address"
                            },
                            {
                                "name": "walletB",
                                "type": "address"
                            },
                            {
                                "name": "rootAB",
                                "type": "address"
                            }
                        ],
                        "name": "pairs",
                        "type": "map(address,tuple)"
                    }
                ]
            },
            {
                "name": "pairKeys",
                "inputs": [],
                "outputs": [
                    {
                        "name": "pairKeys",
                        "type": "address[]"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "rootDEX",
                "type": "address"
            },
            {
                "key": 2,
                "name": "soUINT",
                "type": "uint256"
            },
            {
                "key": 3,
                "name": "codeDEXConnector",
                "type": "cell"
            }
        ],
        "events": []
    },
    tvc: "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",
    code: "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",
    codeHash: "bc4129d2618e82a14f5b4b6f774d5b1b6319a5d97c34cacb373b2096bddad0ee",
};
module.exports = { DEXClientContract };