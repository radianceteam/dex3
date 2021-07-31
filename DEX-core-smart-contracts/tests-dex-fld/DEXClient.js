const DEXClientContract = {
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
                "name": "connectPair",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "statusConnection",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "setPair",
                "inputs": [
                    {
                        "name": "arg0",
                        "type": "address"
                    },
                    {
                        "name": "arg1",
                        "type": "address"
                    },
                    {
                        "name": "arg2",
                        "type": "address"
                    },
                    {
                        "name": "arg3",
                        "type": "address"
                    },
                    {
                        "name": "arg4",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getConnectorAddress",
                "inputs": [
                    {
                        "name": "_answer_id",
                        "type": "uint32"
                    },
                    {
                        "name": "connectorSoArg",
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
                "name": "connectRoot",
                "inputs": [
                    {
                        "name": "root",
                        "type": "address"
                    },
                    {
                        "name": "souint",
                        "type": "uint256"
                    },
                    {
                        "name": "gramsToConnector",
                        "type": "uint128"
                    },
                    {
                        "name": "gramsToRoot",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "statusConnected",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "connectCallback",
                "inputs": [
                    {
                        "name": "wallet",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getAllDataPreparation",
                "inputs": [],
                "outputs": [
                    {
                        "name": "pairKeysR",
                        "type": "address[]"
                    },
                    {
                        "name": "rootKeysR",
                        "type": "address[]"
                    }
                ]
            },
            {
                "name": "processSwapA",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "qtyA",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "processSwapStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "processSwapB",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "qtyB",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "processSwapStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "processLiquidity",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "qtyA",
                        "type": "uint128"
                    },
                    {
                        "name": "qtyB",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "processLiquidityStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "returnLiquidity",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    },
                    {
                        "name": "tokens",
                        "type": "uint128"
                    }
                ],
                "outputs": [
                    {
                        "name": "returnLiquidityStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "tokensReceivedCallback",
                "inputs": [
                    {
                        "name": "token_wallet",
                        "type": "address"
                    },
                    {
                        "name": "token_root",
                        "type": "address"
                    },
                    {
                        "name": "amount",
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
                        "name": "sender_wallet",
                        "type": "address"
                    },
                    {
                        "name": "original_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "updated_balance",
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
                "name": "getCallback",
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "token_wallet",
                        "type": "address"
                    },
                    {
                        "name": "token_root",
                        "type": "address"
                    },
                    {
                        "name": "amount",
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
                        "name": "sender_wallet",
                        "type": "address"
                    },
                    {
                        "name": "original_gas_to",
                        "type": "address"
                    },
                    {
                        "name": "updated_balance",
                        "type": "uint128"
                    },
                    {
                        "name": "payload_arg0",
                        "type": "uint8"
                    },
                    {
                        "name": "payload_arg1",
                        "type": "address"
                    },
                    {
                        "name": "payload_arg2",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "getBalance",
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
                "name": "createNewPair",
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
                    },
                    {
                        "name": "grammsTotal",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getPairData",
                "inputs": [
                    {
                        "name": "pairAddr",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "pairStatus",
                        "type": "bool"
                    },
                    {
                        "name": "pairRootA",
                        "type": "address"
                    },
                    {
                        "name": "pairWalletA",
                        "type": "address"
                    },
                    {
                        "name": "pairRootB",
                        "type": "address"
                    },
                    {
                        "name": "pairWalletB",
                        "type": "address"
                    },
                    {
                        "name": "pairRootAB",
                        "type": "address"
                    },
                    {
                        "name": "curPair",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "sendTokens",
                "inputs": [
                    {
                        "name": "tokenRoot",
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
                    }
                ],
                "outputs": [
                    {
                        "name": "sendTokenStatus",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "rootDEX",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootDEX",
                        "type": "address"
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
                "name": "codeDEXConnector",
                "inputs": [],
                "outputs": [
                    {
                        "name": "codeDEXConnector",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "rootKeys",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootKeys",
                        "type": "address[]"
                    }
                ]
            },
            {
                "name": "rootWallet",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootWallet",
                        "type": "map(address,address)"
                    }
                ]
            },
            {
                "name": "rootConnector",
                "inputs": [],
                "outputs": [
                    {
                        "name": "rootConnector",
                        "type": "map(address,address)"
                    }
                ]
            },
            {
                "name": "counterCallback",
                "inputs": [],
                "outputs": [
                    {
                        "name": "counterCallback",
                        "type": "uint256"
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
                                "name": "status",
                                "type": "bool"
                            },
                            {
                                "name": "rootA",
                                "type": "address"
                            },
                            {
                                "name": "walletA",
                                "type": "address"
                            },
                            {
                                "name": "rootB",
                                "type": "address"
                            },
                            {
                                "name": "walletB",
                                "type": "address"
                            },
                            {
                                "name": "rootAB",
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
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "rootDEX",
                "type": "address"
            },
            {
                "key": 2,
                "name": "soUINT",
                "type": "uint256"
            },
            {
                "key": 3,
                "name": "codeDEXConnector",
                "type": "cell"
            }
        ],
        "events": []
    },
    tvc: "te6ccgECdAEAIBsAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgBCSK7VMg4wMgwP/jAiDA/uMC8gtyBwRzAQAFAvyNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT4aSHbPNMAAY4dgQIA1xgg+QEB0wABlNP/AwGTAvhC4iD4ZfkQ8qiV0wAB8nri0z8Bjh34QyG5IJ8wIPgjgQPoqIIIG3dAoLnekyD4Y+DyNNgw0x8B+CO88rklBgEU0x8B2zz4R27yfAgBaiLQ0wP6QDD4aak4APhEf29xggiYloBvcm1vc3BvdPhk3CHHANwh1w0f8rwh3QHbPPhHbvJ8CAIoIIIQUGkGo7vjAiCCEHtXi/a74wI3CQM8IIIQY1Nmp7vjAiCCEHJwx4O74wIgghB7V4v2u+MCKBEKAiggghB5q1cIuuMCIIIQe1eL9rrjAg0LAvAw0x/4RFhvdfhk0ds8IcD/jioj0NMB+kAwMcjPhyDOjQQAAAAAAAAAAAAAAAAPtXi/aM8WIc8Lf8lw+wCOM/hEIG8TIW8S+ElVAm8RyHLPQMoAc89AzgH6AvQAgGrPQPhEbxXPCx8hzwt/yfhEbxT7AOIw4wB/+GcMbgAk+ERwb3Jwb3GAQG90+GT4J28QA9ww+Ehu4wDXDf+V1NHQ0//f0ds8K8D/jk4t0NMB+kAwMcjPhyDOcc8LYcjPk+atXCIszxbILM8WK88LfyrPC//IKs8WyCrPFsgqzxYpzwt/KM8LB8gozxbIKM8Wzc3Nzc3Nzclw+wDeXwvjAH/4Z3EObgHcjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEcHCNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQPAdyNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARwcI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBAC3I0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPhFIG6SMHDe+EK68uBm+AAr+FKBAQD0D46AjoDiIG8QPCBvETsgbxI6IG8TOSBvFDggbxU3IG8WNiBvFzUgbxg0IG8ZM28aMWwbMC0EUCCCEGi1Xz+64wIgghBxDZRGuuMCIIIQcmeW7brjAiCCEHJwx4O64wIkIRoSA7gw+Ehu4wD6QZXU0dD6QN/XDX+V1NHQ03/f1w1/ldTR0NN/39HbPCHA/44qI9DTAfpAMDHIz4cgzo0EAAAAAAAAAAAAAAAADycMeDjPFiHPCgDJcPsA3jDjAH/4Z3ETbgS2cPhFIG6SMHDe+EK68uBm+AAwcFMz+FOBAQv0C46AjoDiIG8R+E+BAQv0Co4kjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE3/hQgQEL9AuOgFVTZRQCyo4ojQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEcHBvA+IhbxP4T4EBC/QKjiSNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATf+FCBAQv0C46AZRUBXo4ojQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEcHBvA+IibxAgFgHojmkwIm8R+E6BAQv0CiCRMd4gjlYwIm8T+E6BAQv0CiCRMd4gjkMwIm8V+E6BAQv0CiCRMd4gjjAwIm8R+E+BAQv0CiCRMd4gjh0wIm8T+E+BAQv0CiCRMd4gmzAhbxIglDAgbxLe3t7e3t7ebDExjoDebDEXA/Yj+FOBAQv0C46AjoDiIG8R+E+BAQv0Co4kjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE3yFvE/hPgQEL9AqOJI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABN/IUwNvFfhOgQEL9ApVUxgB/o4kjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE3/goclUCywfOzjEgychTBW8V+E6BAQv0Co4kjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE3/goclUCywfOzjEgycjPkTr7/UYnbxLPFioZAMzPC38jzxTJyM+ROvv9RihvFM8WKs8LfyLPFMknyM+FiM6NBJB3NZQAAAAAAAAAAAAAAAAAAMDPFiLPFMlw+wAmyM+FiM6NBJB3NZQAAAAAAAAAAAAAAAAAAMDPFiHPFMlw+wBfCn8DpDD4SG7jAPpBldTR0PpA39cNf5XU0dDTf9/R2zwhwP+OKiPQ0wH6QDAxyM+HIM6NBAAAAAAAAAAAAAAAAA8meW7YzxYhzwoAyXD7AN4w4wB/+GdxG24EtnD4RSBukjBw3vhCuvLgZvgAMHBTIvhTgQEL9AuOgI6A4iBvEfhPgQEL9AqOJI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABN/4UIEBC/QLjoBVU2UcAsqOKI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABHBwbwPiIW8T+E+BAQv0Co4kjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE3/hQgQEL9AuOgGUdAV6OKI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABHBwbwPiIm8QIB4Bwo5WMCJvEfhOgQEL9AogkTHeII5DMCJvE/hOgQEL9AogkTHeII4wMCJvEfhPgQEL9AogkTHeII4dMCJvE/hPgQEL9AogkTHeIJswIW8SIJQwIG8S3t7e3t7ebDExjoDebCEfA/4i+FOBAQv0C46AjoDiIG8T+E+BAQv0Co4kjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE38hTAm8R+E6BAQv0Co4kjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE3yRvEXFVAssHzs4xIMnIVVMgAHTPkTr7/UYkbxTPFibPC38hzxTJI8jPhYjOjQSQdzWUAAAAAAAAAAAAAAAAAADAzxYhzxTJcPsAXwZ/A5Aw+Ehu4wD6QZXU0dD6QN/R2zwhwP+OKiPQ0wH6QDAxyM+HIM6NBAAAAAAAAAAAAAAAAA8Q2URozxYhzwoAyXD7AN4w2zx/+GdxIm4BRnD4RSBukjBw3vhCuvLgZvgAMHAh+FOBAQv0CiCRMd6OgN8xIwO+IfhTgQEL9AuOgI6A4nBvUCL4UyLbPMlZgQEL9BP4cyL4VG8iIaQDWYAg9BZvAvh0yM+Rixa7rskjyM+FiM6NBJB3NZQAAAAAAAAAAAAAAAAAAMDPFiHPFMlw+wBfA39VUzUCQjD4SG7jAPhG8nNx+GbR+En4SscF8uBn+ABw+HHbPH/4ZyVuAbrtRNAg10nCAY5Q0//TP9MA+kDU0dDT/9TTH/QEWW8CAfQE1NHQ9AT0BNP/9ATU0dD0BNMf9ARZbwIB0fh0+HP4cvhx+HD4b/hu+G34bPhr+Gp/+Gj4Zvhj+GKOgOImAf70BXEhgED0Do4kjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE3/hqciGAQPQOk9cL/5Fw4vhrcyGAQPQPjoDf+GxwbW8C+G1t+G5t+G9t+HBw+HFt+HJt+HNwbW8C+HRwAYBA9A7yvdcL//hicPhjcPhmf/hoJwECiHMEUCCCEFHvZT+64wIgghBU/cVIuuMCIIIQWUEfubrjAiCCEGNTZqe64wI2MiopAVYw0ds8+E4hjh6NBHAAAAAAAAAAAAAAAAA41Nmp4MjOIQH0AMlw+wDef/hncQO0MPhIbuMA+kGV1NHQ+kDf+kGV1NHQ+kDf1w1/ldTR0NN/39cN/5XU0dDT/9/6QZXU0dD6QN/6QZXU0dD6QN/6QZXU0dD6QN/XDX+V1NHQ03/f1NHbPNs8f/hncStuA674APhRpCD4cfhSgQEA9A+OgI6A4ilvUChvUSdvUiZvUyVvVCRvVSNvViJvVyHQINMH+kD6QDRTQm9YNVNBb1k1U0BvWjX4UfhSJts8yVmBAQD0F/hyXw4wLSwAbG8ryCvPFsgrzxYqzwt/Kc8L/8gpzxbIKc8WyCnPFijPC38nzwsHyCfPFsgnzxbNzc3Nzc1ssQHcjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEcHCNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQuAdyNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARwcI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABC8ATI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABG8LAQbQ2zwxAMb6QPpBldTR0PpA39cNf5XU0dDTf9/XDf+V1NHQ0//f+kGV1NHQ+kDf+kGV1NHQ+kDf+kGV1NHQ+kDf1w1/ldTR0NN/39cNB5XU0dDTB9/6QZXU0dD6QN/6QZXU0dD6QN/RbwsDdjD4SG7jAPpBldTR0PpA3/pBldTR0PpA3/pBldTR0PpA3/pBldTR0PpA3/pBldTR0PpA39HbPNs8f/hncTNuASr4APhJIPhTgQEL9AogkTHejoDeXwY0A14g+FOBAQv0C46AjoDif29QJm9RJW9SJG9TI29UIm9VIfhTIts8yVmBAQv0E/hzMFVTNQBAbybIJs8KACXPFsglzxbIJc8WyCXPFsglzxbNzc3NbGEBVDDR2zz4SiGOHY0EcAAAAAAAAAAAAAAAADR72U/gyM4hzxbJcPsA3n/4Z3EEUCCCEBUWsfi74wIgghAzNqVSu+MCIIIQRDh4CrvjAiCCEFBpBqO74wJnWUc4BFAgghBG8mpKuuMCIIIQTKRG9LrjAiCCEE3+ali64wIgghBQaQajuuMCRT49OQPKMPhIbuMA+kGV1NHQ+kDf+kGV1NHQ+kDf1w1/ldTR0NN/39cNf5XU0dDTf9/R2zwhwP+OKiPQ0wH6QDAxyM+HIM6NBAAAAAAAAAAAAAAAAA0GkGo4zxYhzwoAyXD7AN4w4wB/+GdxOm4B2nD4RSBukjBw3vhCuvLgZvgAMHAk+E+BAQv0Co4kjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE340IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMcFjoDfbEE7Afwk+E+BAQv0Co4kjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE38hTBvhOgQEL9AqOJI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABN/4KHRVAssHzs4xIMnIz5E6+/1GJ88WJs8LfyHPFMk8ADBTU8jPhYjOAfoCcc8LaiHPFMlw+wBfBX8BXjDR2zz4TSGOIo0EcAAAAAAAAAAAAAAAADN/mpYgyM4hbyICyx/0AMlw+wDef/hncQOkMPhIbuMA+kGV1NHQ+kDf1w1/ldTR0NN/39HbPCHA/44qI9DTAfpAMDHIz4cgzo0EAAAAAAAAAAAAAAAADMpEb0jPFiHPCgDJcPsA3jDjAH/4Z3E/bgS2cPhFIG6SMHDe+EK68uBm+AAwcFMi+FOBAQv0C46AjoDiIG8R+E+BAQv0Co4kjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE3/hQgQEL9AuOgFVTZUACyo4ojQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEcHBvA+IhbxP4T4EBC/QKjiSNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATf+FCBAQv0C46AZUEBXo4ojQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEcHBvA+IibxAgQgHCjlYwIm8R+E6BAQv0CiCRMd4gjkMwIm8T+E6BAQv0CiCRMd4gjjAwIm8R+E+BAQv0CiCRMd4gjh0wIm8T+E+BAQv0CiCRMd4gmzAhbxIglDAgbxLe3t7e3t5sMTGOgN5sIUMD/iL4U4EBC/QLjoCOgOIgbxH4T4EBC/QKjiSNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATfyFMCbxP4ToEBC/QKjiSNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATfJG8TcVUCywfOzjEgychVU0QAdM+ROvv9RiRvEs8WJs8LfyHPFMkjyM+FiM6NBJB3NZQAAAAAAAAAAAAAAAAAAMDPFiHPFMlw+wBfBn8D/DD4SG7jANMf+ERYb3X4ZNcN/5XU0dDT/9/R2zwhwP+OICPQ0wH6QDAxyM+HIM5xzwthyM+TG8mpKiLPFs3JcPsAjjT4RCBvEyFvEvhJVQJvEchyz0DKAHPPQM4B+gL0AHHPC2nI+ERvFc8LHyLPFs3J+ERvFPsA4jDjAH/4Z3FGbgCW+ERwb3Jwb3GAQG90+GQgbfhCyMv/cFiAQPRDIcjL/3FYgED0Q/gocliAQPQWyPQAyfhMyM+EgPQA9ADPgcn5AMjPigBAy//J0DExBFAgghA2Zz6puuMCIIIQN+ogs7rjAiCCEDwXAGG64wIgghBEOHgKuuMCWFdPSAOkMPhIbuMA+kGV1NHQ+kDf1w1/ldTR0NN/39HbPCHA/44qI9DTAfpAMDHIz4cgzo0EAAAAAAAAAAAAAAAADEOHgKjPFiHPCgDJcPsA3jDjAH/4Z3FJbgS2cPhFIG6SMHDe+EK68uBm+AAwcFMi+FOBAQv0C46AjoDiIG8R+E+BAQv0Co4kjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE3/hQgQEL9AuOgFVTZUoCyo4ojQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEcHBvA+IhbxP4T4EBC/QKjiSNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATf+FCBAQv0C46AZUsBXo4ojQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEcHBvA+IibxAgTAHojmkwIm8R+E6BAQv0CiCRMd4gjlYwIm8T+E6BAQv0CiCRMd4gjkMwIm8V+E6BAQv0CiCRMd4gjjAwIm8R+E+BAQv0CiCRMd4gjh0wIm8T+E+BAQv0CiCRMd4gmzAhbxIglDAgbxLe3t7e3t7ebDExjoDebCFNA/gi+FOBAQv0C46AjoDiyFMBbxP4ToEBC/QKjiSNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATfI28R+E6BAQv0Co4kjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE33NVAssHzs4xIMnIVVNOANDPkbSqOI4lzwt/Js8WIc8UySNvFfhPgQEL9AqOJI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABN/Iz4WIzo0EkHc1lAAAAAAAAAAAAAAAAAAAwM8WIc8UyXD7AF8FfwO4MPhIbuMA+kGV1NHQ+kDf0ds8J8D/jj0p0NMB+kAwMcjPhyDOcc8LYcjPkvBcAYYozwoAJ88WyCfPFsgnzxbIJ88WyCfPFsgnzxbNzc3Nzc3JcPsA3l8H4wB/+GdxUG4B2nCNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARRA/6NCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT4ACf4U4EBC/QLjoCOgOIgbxA4VVNSAC4gbxE3IG8SNiBvEzUgbxQ0bxUyMCZsFwHacI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFQAlI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABG8GAQbQ2zxWAFbSAPpA+kGV1NHQ+kDf+kGV1NHQ+kDf+kGV1NHQ+kDf+kGV1NHQ+kDf0W8GAVYw0ds8+FEhjh6NBHAAAAAAAAAAAAAAAAAt+ogs4MjOIc8L/8lw+wDef/hncQFeMNHbPPhUIY4ijQRwAAAAAAAAAAAAAAAALZnPqmDIziFvIgLLH/QAyXD7AN5/+GdxBFAgghAYg6VSuuMCIIIQLGXZD7rjAiCCEDKmhOG64wIgghAzNqVSuuMCYFxbWgFWMNHbPPhLIY4ejQRwAAAAAAAAAAAAAAAALM2pVKDIziHPC//JcPsA3n/4Z3EBVDDR2zz4TCGOHY0EcAAAAAAAAAAAAAAAACypoThgyM4hzxTJcPsA3n/4Z3EDLjD4SG7jAPpBldTR0PpA39HbPNs8f/hncV1uASj4APhJIPhQgQEL9AogkTHejoDeW14C6iD4UIEBC/QLjoCOKI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABHBwbwPi+E0hbxABbyIhpANZgCD0Fm8C+G34TiFvEAEkWYEBC/QS+G74TyFvEAEjWYEBC/QS+G/Iz5AhwHJ2ySLIz4WIzmVfAcCNBJAX14QAAAAAAAAAAAAAAAAAAMDPFiHPFMlw+wDIz5GAYIgiySPIz4WIzo0EkBfXhAAAAAAAAAAAAAAAAAAAwM8WIc8UyXD7ACJ/b1IzI/hQJNs8yVmBAQv0E/hwXwNkA8ww+Ehu4wD6QZXU0dD6QN/XDf+V1NHQ0//f1w1/ldTR0NN/39cNf5XU0dDTf9/R2zwhwP+OKiPQ0wH6QDAxyM+HIM6NBAAAAAAAAAAAAAAAAAmIOlUozxYhzwoAyXD7AN4w2zx/+GdxYW4BSHD4RSBukjBw3vhCuvLgZvgAMHAk+E6BAQv0CiCRMd6OgN9sQWIC+m34QsjL/3BYgED0QyTIy/9xWIBA9EP4KHJYgED0Fsj0AMn4TMjPhID0APQAz4HJyM+RotV8/slTEfkA+Cj6Qm8SyM+GQMoHy//J0FNgyM+FiM4B+gKL0AAAAAAAAAAAAAAAAAfPFiLPFM+DI88UyXD7ADEg+FCBAQv0C46AZWMBzI4ojQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEcHBvA+Iob1Anb1Fwb1Ih+FAi2zzJWYEBC/QT+HDIz5C6I4sSKc8WyVNiyM+FiM4B+gJxzwtqIc8UyXD7AF8Gf2QAIG8jyCPPFiLPC/8hzwoAbDEBBtDbPGYAEvpA0//SANFvAwROIIILt/s0uuMCIIIQB6fox7rjAiCCEA8OUIq64wIgghAVFrH4uuMCbGtqaAOWMPhIbuMA0ds8IsD/jjYk0NMB+kAwMcjPhyDOjQQAAAAAAAAAAAAAAAAJUWsfiM8WIm8iAssf9AAhbyICyx/0AMlw+wDeW+MAf/hncWluAB5wbW8CcG1vAvgAW/hU+E0BVjDR2zz4TyGOHo0EcAAAAAAAAAAAAAAAACPDlCKgyM4hAfQAyXD7AN5/+GdxAVYw0ds8+FMhjh6NBHAAAAAAAAAAAAAAAAAh6fox4MjOIQH0AMlw+wDef/hncQL2MPhIbuMA+kGV1NHQ+kDf+kGV1NHQ+kDf1w3/ldTR0NP/39cN/5XU0dDT/9/XDf+V1NHQ0//f1w3/ldTR0NP/3yDXSsABk9TR0N7UINdLwAEBwACwk9TR0N7U1w0HldTR0NMH39cNf5XU0dDTf9/XDX+V1NHQ03/f1w1/cW0CRpXU0dDTf9/XDX+V1NHQ03/f1w1/ldTR0NN/39HbPOMAf/hnb24AoPhG+EP4QsjL/8s/ywD4Ss8W+EvIy//4TM8U+E1vIgLLH/QA+E4B9AD4T8j0APhQAfQA+FHPC//4UgH0APhTyPQA+FRvIgLLH/QAzc3Nye1UAf74RSBukjBw3vhCuvLgZvgAUwRyJai1f6C1f3IkqLV/oLV/JaC1f7mzIJowIIIRKgXyALmz3vLgavgnbxAhufLQacjPkTH2Ks4uzxbILs8WLc8L/8gtzwv/LM8L/yvPC/8qzxQpzxQozwsHJ88Lf8gnzwt/Js8LfyXPC3/Nzc3JcAAwIfhKyM+FCM4B+gJxzwtqIc8UyXH7AF8PAKbtRNDT/9M/0wD6QNTR0NP/1NMf9ARZbwIB9ATU0dD0BPQE0//0BNTR0PQE0x/0BFlvAgHR+HT4c/hy+HH4cPhv+G74bfhs+Gv4an/4aPhm+GP4YgEK9KQg9KFzAAA=",
};
module.exports = { DEXClientContract };