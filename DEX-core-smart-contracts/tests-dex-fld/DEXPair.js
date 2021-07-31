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
                "name": "getQuotient",
                "inputs": [
                    {
                        "name": "min",
                        "type": "uint128"
                    },
                    {
                        "name": "max",
                        "type": "uint128"
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
                "name": "getRemainder",
                "inputs": [
                    {
                        "name": "min",
                        "type": "uint128"
                    },
                    {
                        "name": "max",
                        "type": "uint128"
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