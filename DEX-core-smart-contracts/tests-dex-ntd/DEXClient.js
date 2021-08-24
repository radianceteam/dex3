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
    codeHash: "474ac1d3b24569abdbeb4293fc628ae203059a42d5df9773958ee0dbd58d894c",
};
module.exports = { DEXClientContract };