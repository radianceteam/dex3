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
    codeHash: "1e2db90810c5fb5e2df5498c3833362d589956e9b66899e0559e2bf2f67818f7",
};
module.exports = { DEXRootContract };