const RootTokenContract = {
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
                        "name": "root_public_key_",
                        "type": "uint256"
                    },
                    {
                        "name": "root_owner_address_",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getVersion",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint32"
                    }
                ]
            },
            {
                "name": "getDetails",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "name",
                                "type": "bytes"
                            },
                            {
                                "name": "symbol",
                                "type": "bytes"
                            },
                            {
                                "name": "decimals",
                                "type": "uint8"
                            },
                            {
                                "name": "wallet_code",
                                "type": "cell"
                            },
                            {
                                "name": "root_public_key",
                                "type": "uint256"
                            },
                            {
                                "name": "root_owner_address",
                                "type": "address"
                            },
                            {
                                "name": "total_supply",
                                "type": "uint128"
                            }
                        ],
                        "name": "value0",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "getWalletAddress",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    },
                    {
                        "name": "wallet_public_key_",
                        "type": "uint256"
                    },
                    {
                        "name": "owner_address_",
                        "type": "address"
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
                "name": "sendExpectedWalletAddress",
                "inputs": [
                    {
                        "name": "wallet_public_key_",
                        "type": "uint256"
                    },
                    {
                        "name": "owner_address_",
                        "type": "address"
                    },
                    {
                        "name": "to",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "deployWallet",
                "inputs": [
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "deploy_grams",
                        "type": "uint128"
                    },
                    {
                        "name": "wallet_public_key_",
                        "type": "uint256"
                    },
                    {
                        "name": "owner_address_",
                        "type": "address"
                    },
                    {
                        "name": "gas_back_address",
                        "type": "address"
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
                "name": "deployEmptyWallet",
                "inputs": [
                    {
                        "name": "deploy_grams",
                        "type": "uint128"
                    },
                    {
                        "name": "wallet_public_key_",
                        "type": "uint256"
                    },
                    {
                        "name": "owner_address_",
                        "type": "address"
                    },
                    {
                        "name": "gas_back_address",
                        "type": "address"
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
                "name": "mint",
                "inputs": [
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "to",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "proxyBurn",
                "inputs": [
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "sender_address",
                        "type": "address"
                    },
                    {
                        "name": "send_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "callback_address",
                        "type": "address"
                    },
                    {
                        "name": "callback_payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "tokensBurned",
                "inputs": [
                    {
                        "name": "tokens",
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
                        "name": "send_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "callback_address",
                        "type": "address"
                    },
                    {
                        "name": "callback_payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "sendSurplusGas",
                "inputs": [
                    {
                        "name": "to",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setPaused",
                "inputs": [
                    {
                        "name": "value",
                        "type": "bool"
                    }
                ],
                "outputs": []
            },
            {
                "name": "sendPausedCallbackTo",
                "inputs": [
                    {
                        "name": "callback_id",
                        "type": "uint64"
                    },
                    {
                        "name": "callback_addr",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "transferOwner",
                "inputs": [
                    {
                        "name": "root_public_key_",
                        "type": "uint256"
                    },
                    {
                        "name": "root_owner_address_",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "name",
                "inputs": [],
                "outputs": [
                    {
                        "name": "name",
                        "type": "bytes"
                    }
                ]
            },
            {
                "name": "symbol",
                "inputs": [],
                "outputs": [
                    {
                        "name": "symbol",
                        "type": "bytes"
                    }
                ]
            },
            {
                "name": "decimals",
                "inputs": [],
                "outputs": [
                    {
                        "name": "decimals",
                        "type": "uint8"
                    }
                ]
            },
            {
                "name": "wallet_code",
                "inputs": [],
                "outputs": [
                    {
                        "name": "wallet_code",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "total_supply",
                "inputs": [],
                "outputs": [
                    {
                        "name": "total_supply",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "start_gas_balance",
                "inputs": [],
                "outputs": [
                    {
                        "name": "start_gas_balance",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "paused",
                "inputs": [],
                "outputs": [
                    {
                        "name": "paused",
                        "type": "bool"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "_randomNonce",
                "type": "uint256"
            },
            {
                "key": 2,
                "name": "name",
                "type": "bytes"
            },
            {
                "key": 3,
                "name": "symbol",
                "type": "bytes"
            },
            {
                "key": 4,
                "name": "decimals",
                "type": "uint8"
            },
            {
                "key": 5,
                "name": "wallet_code",
                "type": "cell"
            }
        ],
        "events": []
    },
    tvc: "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",
};
module.exports = { RootTokenContract };
