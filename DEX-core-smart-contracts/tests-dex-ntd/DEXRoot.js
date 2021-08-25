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
                "outputs": []
            },
            {
                "name": "createDEXclientCallback",
                "inputs": [
                    {
                        "name": "pubkey",
                        "type": "uint256"
                    },
                    {
                        "name": "deployedAddress",
                        "type": "address"
                    },
                    {
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "outputs": []
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
                "name": "createDEXpairCallback",
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
                        "name": "root01",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getDetailsCallback",
                "inputs": [
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
                "name": "creatorForPair",
                "inputs": [],
                "outputs": [
                    {
                        "name": "creatorForPair",
                        "type": "map(address,address)"
                    }
                ]
            },
            {
                "name": "dataForRootAB",
                "inputs": [],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "pair",
                                "type": "address"
                            },
                            {
                                "name": "root0",
                                "type": "address"
                            },
                            {
                                "name": "root1",
                                "type": "address"
                            }
                        ],
                        "name": "dataForRootAB",
                        "type": "map(address,tuple)"
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
                "name": "msgOf",
                "inputs": [],
                "outputs": [
                    {
                        "name": "msgOf",
                        "type": "map(address,bytes)"
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
    code: "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",
    codeHash: "e949a3a03c52f681a4b5d57497248a1cd6efe1d1011c4cc11641d2874a031eb4",
};
module.exports = { DEXRootContract };