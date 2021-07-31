const DEXPairContract = {
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
                        "name": "souintA",
                        "type": "uint256"
                    },
                    {
                        "name": "souintB",
                        "type": "uint256"
                    },
                    {
                        "name": "gramsDeployConnector",
                        "type": "uint128"
                    },
                    {
                        "name": "gramsDeployWallet",
                        "type": "uint128"
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
                "name": "connect",
                "inputs": [],
                "outputs": []
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
                "name": "burnCallback",
                "inputs": [
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
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
                        "name": "wallet_address",
                        "type": "address"
                    },
                    {
                        "name": "send_gas_to",
                        "type": "address"
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
                "name": "creator",
                "inputs": [],
                "outputs": [
                    {
                        "name": "creator",
                        "type": "address"
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
                "name": "rootA",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootA",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "rootB",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootB",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "rootAB",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootAB",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "walletReserve",
                "inputs": [],
                "outputs": [
                    {
                        "name": "walletReserve",
                        "type": "map(address,address)"
                    }
                ]
            },
            {
                "name": "syncStatus",
                "inputs": [],
                "outputs": [
                    {
                        "name": "syncStatus",
                        "type": "map(address,bool)"
                    }
                ]
            },
            {
                "name": "balanceReserve",
                "inputs": [],
                "outputs": [
                    {
                        "name": "balanceReserve",
                        "type": "map(address,uint128)"
                    }
                ]
            },
            {
                "name": "totalSupply",
                "inputs": [],
                "outputs": [
                    {
                        "name": "totalSupply",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "processingStatus",
                "inputs": [],
                "outputs": [
                    {
                        "name": "processingStatus",
                        "type": "map(address,map(address,bool))"
                    }
                ]
            },
            {
                "name": "processingData",
                "inputs": [],
                "outputs": [
                    {
                        "name": "processingData",
                        "type": "map(address,map(address,uint128))"
                    }
                ]
            },
            {
                "name": "processingDest",
                "inputs": [],
                "outputs": [
                    {
                        "name": "processingDest",
                        "type": "map(address,map(address,address))"
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
                "name": "connectors",
                "inputs": [],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "root_address",
                                "type": "address"
                            },
                            {
                                "name": "souint",
                                "type": "uint256"
                            },
                            {
                                "name": "status",
                                "type": "bool"
                            }
                        ],
                        "name": "connectors",
                        "type": "map(address,tuple)"
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
                "name": "creator",
                "type": "address"
            },
            {
                "key": 4,
                "name": "codeDEXConnector",
                "type": "cell"
            },
            {
                "key": 5,
                "name": "rootA",
                "type": "address"
            },
            {
                "key": 6,
                "name": "rootB",
                "type": "address"
            },
            {
                "key": 7,
                "name": "rootAB",
                "type": "address"
            }
        ],
        "events": []
    },
    tvc: "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",
};
module.exports = { DEXPairContract };