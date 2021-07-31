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
                                "name": "code",
                                "type": "cell"
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