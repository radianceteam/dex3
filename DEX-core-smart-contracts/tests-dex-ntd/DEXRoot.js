const DEXRootContract = {
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
                "name": "sendTransfer",
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
                    }
                ],
                "outputs": []
            },
            {
                "name": "setDEXclientCode",
                "inputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setDEXpairCode",
                "inputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setDEXconnectorCode",
                "inputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setRootTokenCode",
                "inputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setTONTokenWalletCode",
                "inputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setCreator",
                "inputs": [
                    {
                        "name": "giverAddr",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getClientAddress",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    },
                    {
                        "name": "clientPubKey",
                        "type": "uint256"
                    },
                    {
                        "name": "clientSoArg",
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
                "name": "createDEXclient",
                "inputs": [
                    {
                        "name": "pubkey",
                        "type": "uint256"
                    },
                    {
                        "name": "souint",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "deployedAddress",
                        "type": "address"
                    },
                    {
                        "name": "statusCreate",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "getPairAddress",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    },
                    {
                        "name": "pairPubKey",
                        "type": "uint256"
                    },
                    {
                        "name": "pairSoArg",
                        "type": "uint256"
                    },
                    {
                        "name": "pairCreator",
                        "type": "address"
                    },
                    {
                        "name": "pairRootA",
                        "type": "address"
                    },
                    {
                        "name": "pairRootB",
                        "type": "address"
                    },
                    {
                        "name": "pairRootAB",
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
                "name": "getRootTokenAddress",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    },
                    {
                        "name": "rootPubKey",
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
                "name": "getConnectorAddress",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    },
                    {
                        "name": "connectorPubKey",
                        "type": "uint256"
                    },
                    {
                        "name": "connectorSoArg",
                        "type": "uint256"
                    },
                    {
                        "name": "connectorCommander",
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
                "name": "createDEXpair",
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
                    }
                ],
                "outputs": []
            },
            {
                "name": "getPairByRoots01",
                "inputs": [
                    {
                        "name": "root0",
                        "type": "address"
                    },
                    {
                        "name": "root1",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "getPairByRoots10",
                "inputs": [
                    {
                        "name": "root1",
                        "type": "address"
                    },
                    {
                        "name": "root0",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "getRootsByPair",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "root0",
                        "type": "address"
                    },
                    {
                        "name": "root1",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "checkPubKey",
                "inputs": [
                    {
                        "name": "pubkey",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "status",
                        "type": "bool"
                    },
                    {
                        "name": "dexclient",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "getBalanceTONgrams",
                "inputs": [],
                "outputs": [
                    {
                        "name": "balanceTONgrams",
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
                "name": "codeDEXclient",
                "inputs": [],
                "outputs": [
                    {
                        "name": "codeDEXclient",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "codeDEXpair",
                "inputs": [],
                "outputs": [
                    {
                        "name": "codeDEXpair",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "codeDEXconnector",
                "inputs": [],
                "outputs": [
                    {
                        "name": "codeDEXconnector",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "codeRootToken",
                "inputs": [],
                "outputs": [
                    {
                        "name": "codeRootToken",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "codeTONTokenWallet",
                "inputs": [],
                "outputs": [
                    {
                        "name": "codeTONTokenWallet",
                        "type": "cell"
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
                                "name": "root0",
                                "type": "address"
                            },
                            {
                                "name": "root1",
                                "type": "address"
                            },
                            {
                                "name": "rootLP",
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
            },
            {
                "name": "pubkeys",
                "inputs": [],
                "outputs": [
                    {
                        "name": "pubkeys",
                        "type": "map(uint256,address)"
                    }
                ]
            },
            {
                "name": "clients",
                "inputs": [],
                "outputs": [
                    {
                        "name": "clients",
                        "type": "map(address,uint256)"
                    }
                ]
            },
            {
                "name": "clientKeys",
                "inputs": [],
                "outputs": [
                    {
                        "name": "clientKeys",
                        "type": "address[]"
                    }
                ]
            },
            {
                "name": "balanceOf",
                "inputs": [],
                "outputs": [
                    {
                        "name": "balanceOf",
                        "type": "map(address,uint128)"
                    }
                ]
            },
            {
                "name": "creators",
                "inputs": [],
                "outputs": [
                    {
                        "name": "creators",
                        "type": "map(uint256,address)"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "soUINT",
                "type": "uint256"
            }
        ],
        "events": []
    },
    tvc: "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",
};
module.exports = { DEXRootContract };