const RootTokenContractContract = {
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
                "name": "getTotalSupply",
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
                "name": "getWalletCode",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "cell"
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
module.exports = { RootTokenContractContract };