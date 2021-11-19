# Defispace-dex-tvl-parcer

## url: https://trade.defispace.com/

## github: https://github.com/radianceteam/dex3

## how to get Defispace-dex-tvl data using TON SDK (ton-client-js)

### Install dependencies

   `npm instal`

### Run script

   `npm start`

### Script result

      Hello main net!
      Defispace DEXroot address: 0:5d0f5a8cb443e00934d1bb632acadc036a6c41b59308e3a36d809449a5e777d9
      all Defispace DEXpairs: [
        '0:5ed8c97d370b1684590e2ba04370734fd5e5fb2c5900d03791aab8b47afd79ef',
        '0:50c00629f4a36672608b441c6e5bc3809be782e3bf1faad4e32e18ad0f4c0bdb',
        '0:5c0e22237dce402a4d26573eec1b83f647bd7ad9ba27f93d9684bcf7780f7030',
        '0:5b0332fa7e6da60a7d545dc8c1a4b479347af8f7c63a8fd6bd3d6317d11e6112',
        '0:550b3e8d40b793d30e7095e1c3fcce2711af1ba82bb82a14c5ba4539a72570c0',
        '0:53f4c3c93d4d23dd2460ae4d7e31d174cbcc333acd4d3299e869e3f11f842024',
        '0:55d9635a8561ed65b2dea2b5f4a7e402886329f5fc8f75041ae2cc8f5af398b4',
        '0:5b7621fd8abd1561c347724e48c83931a221e1dd59cff07f578f5d408d394df5'
      ]
      all Defispace DEXpairs details:
      ===========>
      pair: 0:5ed8c97d370b1684590e2ba04370734fd5e5fb2c5900d03791aab8b47afd79ef
      WTON / USDT
      reserve WTON 273.991783594 / reserve USDT 108.136243
      ReserveWallets:
      0:5d3aef32bf97687d96960d37e5d0f532ac111722a58b7ccecff45579f09c24e5 / 0:5a933144a1edeaafd5bbe9274521c7863fc7bcb0f0ee2a8e930d18947a309f49
      TokenRoots:
      0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37 / 0:751b6e22687891bdc1706c8d91bf77281237f7453d27dc3106c640ec165a2abf
      ===========>
      pair: 0:50c00629f4a36672608b441c6e5bc3809be782e3bf1faad4e32e18ad0f4c0bdb
      WTON / DAI
      reserve WTON 1.571428571 / reserve DAI 1.1e-11
      ReserveWallets:
      0:5fbaee5f74289ba722a88393eb0642c27bd58a303dcaa4bbe736292dd214ea37 / 0:56d6ab45bd8b1825fd1aaf5561c724dea23fd9693da1cc197baa61a968ce0ac2
      TokenRoots:
      0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37 / 0:95934aa6a66cb3eb211a80e99234dfbba6329cfa31600ce3c2b070d8d9677cef
      ===========>
      pair: 0:5c0e22237dce402a4d26573eec1b83f647bd7ad9ba27f93d9684bcf7780f7030
      WTON / USDC
      reserve WTON 5.5 / reserve USDC 1.227943
      ReserveWallets:
      0:527ac733dac2d000954208e512e8438c327329dfb594315c89bc28ed4ef42657 / 0:5d90931f3d8fa75c8797bf5f71304e7acc3e3dc5692c91f2d3a9c3fbd45f0ee6
      TokenRoots:
      0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37 / 0:1ad0575f0f98f87a07ec505c39839cb9766c70a11dadbfc171f59b2818759819
      ===========>
      pair: 0:5b0332fa7e6da60a7d545dc8c1a4b479347af8f7c63a8fd6bd3d6317d11e6112
      WTON / WETH
      reserve WTON 1 / reserve WETH 0.0001
      ReserveWallets:
      0:5cc1c39fda08f9340c66bdbb5588b52e0b3b3b8e23b2a4348be3b2921921a564 / 0:5aa97f972f06fb9aa128f813b638ecb046feb33e9d4dae79791bb7397c92c911
      TokenRoots:
      0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37 / 0:45f682b7e783283caef3f268e10073cf08842bce20041d5224c38d87df9f2e90
      ===========>
      pair: 0:550b3e8d40b793d30e7095e1c3fcce2711af1ba82bb82a14c5ba4539a72570c0
      WTON / WBTC
      reserve WTON 100 / reserve WBTC 0.00001
      ReserveWallets:
      0:564e9b82c1f5d3529336ab8ca0f278d6f85da292011cbf99cbfd0d16479db5bd / 0:5b56be411bb100aead83b1c527c14420f10e1ce0ad46e9be790a81596c880a85
      TokenRoots:
      0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37 / 0:6e76bccb41be2210dc9d7a4d0f3cbf0d5da592d0cb6b87662d5510f5b5efe497
      ===========>
      pair: 0:53f4c3c93d4d23dd2460ae4d7e31d174cbcc333acd4d3299e869e3f11f842024
      TSTTKN / WTON
      reserve TSTTKN 11 / reserve WTON 9.093389107
      ReserveWallets:
      0:53a13de8d83401160f629c0613218e1f6063f6919c29f1d964b2e9a4b257827c / 0:511dbfb753a2f512a6690e4692c0dbe1e5070feb05df961709367b3ea80f3731
      TokenRoots:
      0:e546caae87108be8a90276b36609f4c260145adfd2fbc41b8d0b1d82df563cab / 0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37
      ===========>
      pair: 0:55d9635a8561ed65b2dea2b5f4a7e402886329f5fc8f75041ae2cc8f5af398b4
      USDT / DAI
      reserve USDT 5 / reserve DAI 0.1
      ReserveWallets:
      0:5d6d6885c3abe89e9991eeb26978c1562ef63a5f02ca19c06d24dd1b82150d88 / 0:5af75172e76355afb7bf68372bc68efede69ddb86b635f9d1225e4928498f7c1
      TokenRoots:
      0:751b6e22687891bdc1706c8d91bf77281237f7453d27dc3106c640ec165a2abf / 0:95934aa6a66cb3eb211a80e99234dfbba6329cfa31600ce3c2b070d8d9677cef
      ===========>
      pair: 0:5b7621fd8abd1561c347724e48c83931a221e1dd59cff07f578f5d408d394df5
      VAT / WTON
      reserve VAT 38.1978 / reserve WTON 13.134446592
      ReserveWallets:
      0:5e0a94c2add45d46e36a1007062a52c8d2cbbc31ec8210fe3dcd38854f7a1497 / 0:539d9eedb30afa894a5b310aa1b7354f6ef5c4787b25b3a9688a9e467f19f9ef
      TokenRoots:
      0:a6f395273813e0f23e6f4b637f7934ef6e4da6c1c92cd0e96f5d9d6fbf621215 / 0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37
