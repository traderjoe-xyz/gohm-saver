# Contract to rescue gOHM on ethereum mainnet

Run `yarn hardhat compile` before the below commands to compile
the contracts.

## Saving funds on forked network

Add you alchemy private key to the environment (see .env.example)

In one terminal start a hardhat forked network

```
yarn hardhat node --network hardhat
```

Then from a second terminal run the script to rescue the funds

```
yarn node scrips/deploy_forked.js
```

## Saving funds on mainnet

Add your account private key to the environment (see .env.example)

In one terminal start a hardhat forked network

```
yarn hardhat node --network ethereum
```

Then from a second terminal run the script to rescue the funds

```
yarn node scrips/deploy_mainnet.js
```


