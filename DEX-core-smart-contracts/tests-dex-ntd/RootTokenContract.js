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
    code: "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",
    codeHash: "5020feaf723931a07921b97696fba4212ce3c60d70ca18a8b7ede24a33313aae",
};
module.exports = { RootTokenContractContract };