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
};
module.exports = { TONTokenWalletContract };