const DEXConnectorContract = {
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
                "name": "deployEmptyWallet",
                "inputs": [
                    {
                        "name": "root",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "expectedWalletAddressCallback",
                "inputs": [
                    {
                        "name": "wallet",
                        "type": "address"
                    },
                    {
                        "name": "wallet_public_key",
                        "type": "uint256"
                    },
                    {
                        "name": "owner_address",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setTransferCallback",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "setBouncedCallback",
                "inputs": [],
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
                        "name": "payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "burn",
                "inputs": [
                    {
                        "name": "tokens",
                        "type": "uint128"
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
                "name": "getBalance",
                "inputs": [],
                "outputs": [
                    {
                        "name": "balance",
                        "type": "uint128"
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
                "name": "dexclient",
                "inputs": [],
                "outputs": [
                    {
                        "name": "dexclient",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "drivenRoot",
                "inputs": [],
                "outputs": [
                    {
                        "name": "drivenRoot",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "driven",
                "inputs": [],
                "outputs": [
                    {
                        "name": "driven",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "statusConnected",
                "inputs": [],
                "outputs": [
                    {
                        "name": "statusConnected",
                        "type": "bool"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "soUINT",
                "type": "uint256"
            },
            {
                "key": 2,
                "name": "dexclient",
                "type": "address"
            }
        ],
        "events": []
    },
    tvc: "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",
};
module.exports = { DEXConnectorContract };