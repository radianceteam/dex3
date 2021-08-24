const TONTokenWalletContract = {
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
                "inputs": [],
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
                "name": "balance",
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
                                "name": "root_address",
                                "type": "address"
                            },
                            {
                                "name": "wallet_public_key",
                                "type": "uint256"
                            },
                            {
                                "name": "owner_address",
                                "type": "address"
                            },
                            {
                                "name": "balance",
                                "type": "uint128"
                            },
                            {
                                "name": "receive_callback",
                                "type": "address"
                            },
                            {
                                "name": "bounced_callback",
                                "type": "address"
                            },
                            {
                                "name": "allow_non_notifiable",
                                "type": "bool"
                            }
                        ],
                        "name": "value0",
                        "type": "tuple"
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
                "name": "accept",
                "inputs": [
                    {
                        "name": "tokens",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "allowance",
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
                                "name": "remaining_tokens",
                                "type": "uint128"
                            },
                            {
                                "name": "spender",
                                "type": "address"
                            }
                        ],
                        "name": "value0",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "approve",
                "inputs": [
                    {
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "name": "remaining_tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "tokens",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "disapprove",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "transferToRecipient",
                "inputs": [
                    {
                        "name": "recipient_public_key",
                        "type": "uint256"
                    },
                    {
                        "name": "recipient_address",
                        "type": "address"
                    },
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "deploy_grams",
                        "type": "uint128"
                    },
                    {
                        "name": "transfer_grams",
                        "type": "uint128"
                    },
                    {
                        "name": "send_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "notify_receiver",
                        "type": "bool"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "transfer",
                "inputs": [
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
                    },
                    {
                        "name": "send_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "notify_receiver",
                        "type": "bool"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "transferFrom",
                "inputs": [
                    {
                        "name": "from",
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
                    },
                    {
                        "name": "send_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "notify_receiver",
                        "type": "bool"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "internalTransfer",
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
                        "name": "notify_receiver",
                        "type": "bool"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "internalTransferFrom",
                "inputs": [
                    {
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "send_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "notify_receiver",
                        "type": "bool"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "burnByOwner",
                "inputs": [
                    {
                        "name": "tokens",
                        "type": "uint128"
                    },
                    {
                        "name": "grams",
                        "type": "uint128"
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
                "name": "burnByRoot",
                "inputs": [
                    {
                        "name": "tokens",
                        "type": "uint128"
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
                "name": "setReceiveCallback",
                "inputs": [
                    {
                        "name": "receive_callback_",
                        "type": "address"
                    },
                    {
                        "name": "allow_non_notifiable_",
                        "type": "bool"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setBouncedCallback",
                "inputs": [
                    {
                        "name": "bounced_callback_",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "destroy",
                "inputs": [
                    {
                        "name": "gas_dest",
                        "type": "address"
                    }
                ],
                "outputs": []
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "root_address",
                "type": "address"
            },
            {
                "key": 2,
                "name": "code",
                "type": "cell"
            },
            {
                "key": 3,
                "name": "wallet_public_key",
                "type": "uint256"
            },
            {
                "key": 4,
                "name": "owner_address",
                "type": "address"
            }
        ],
        "events": []
    },
    tvc: "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",
    code: "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",
    codeHash: "d39b0596be5b6ad11e90eb81ccd0fd4dbdacc7a049a01dc67d21d6d8a57463ae",
};
module.exports = { TONTokenWalletContract };