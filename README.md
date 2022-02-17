# Gelato Multichain Relay SDK

SDK to integrate into Gelato Multichain Relay.

## Installation

```bash
yarn add @gelatonetwork/relay-sdk
```
or
```bash
npm install @gelatonetwork/relay-sdk
```
## Getting Started

Import the Gelato Multichain Relay into your project

```typescript
import { RelaySDK } from "@gelatonetwork/relay-sdk";
```

1. Check if the Gelato Multichain Relay supports a given ChainId

```typescript
  const chainSupported = await RelaySDK.isChainSupported(chainId);
  if (!chainSupported) {
    console.log("ChainId not supported");
    return;
  }
```

2. Estimate the execution price using the Relay Multichain Oracle
```typescript
  // Check if the Relay has an oracle on this ChainId
  const isActiveOracle = await RelaySDK.isOracleActive(chainId);
  if (!isActiveOracle) {
    console.log("Oracle is not active on this Oracle");
    return;
  }

  // Estimate the Token cost now for the given GasLimit and it's the amount of Token
  // that the function should pay back to the caller
  const estimatedExecutionFeeInToken: BigNumber = await RelaySDK.getEstimatedFee(
    chainId,
    paymentTokenAddress,
    gasLimit,
    isHighPriority // If we want to get a high priority fee
  );
```

3. Get supported payment tokens by chain id
```typescript
  // Get Payment Token Addresses
  const paymentTokensAdresses: string[] = await RelaySDK.getPaymentTokens(
    chainId,
  );
```

4. Submit transaction
```typescript
  import { BigNumber } from "ethers"; 
  import { Interface } from "ethers/lib/utils";

  // Generate the function data
  const contractInterface = new Interface(contractABI);
  const data = contractInterface.encodeFunctionData("functionToCall", [args]);

  const relayTx = await RelaySDK.sendRelayTransaction(
    chainId,
    destAddress, // The contract address that should be whitelisted in the Relay
    data,
    paymentTokenAddress,
    estimatedExecutionFeeInToken.toHexString() // Not used yet
  );
  console.log(`RelayerTransactionId = ${relayTx.taskId}`);
```
## Supported Chains
These are the chain Ids supported by the Gelato Multichain Relay:
```typescript
MAINNET: 1,
ROPSTEN: 3,
RINKEBY: 4,
GOERLI: 5,
OPTIMISM: 10,
BSC: 56,
XDAI: 100,
MATIC: 137,
FANTOM: 250,
MOONBEAM: 1284,
ARBITRUM: 42161,
AVALANCHE: 43114
```

## Gelato Contract Addresses
| Chain     |  Contract Address                           |
|---        |---                                          |
| MAINNET   | 0x3CACa7b48D0573D793d3b0279b5F0029180E83b6  |
| ROPSTEN   | 0xCc4CcD69D31F9FfDBD3BFfDe49c6aA886DaB98d9  |
| RINKEBY   | 0x0630d1b8C2df3F0a68Df578D02075027a6397173  |
| GOERLI    | 0x683913B3A32ada4F8100458A3E1675425BdAa7DF  |
| OPTIMISM  | 0x01051113D81D7d6DA508462F2ad6d7fD96cF42Ef  |
| BSC       | 0x7C5c4Af1618220C090A6863175de47afb20fa9Df  |
| XDAI      | 0x29b6603D17B9D8f021EcB8845B6FD06E1Adf89DE  |
| MATIC     | 0x7598e84B2E114AB62CAB288CE5f7d5f6bad35BbA  |
| FANTOM    | 0xebA27A2301975FF5BF7864b99F55A4f7A457ED10  |
| MOONBEAM  | 0x91f2A140cA47DdF438B9c583b7E71987525019bB  |
| ARBITRUM  | 0x7C5c4Af1618220C090A6863175de47afb20fa9Df  |
| AVALANCHE | 0x7C5c4Af1618220C090A6863175de47afb20fa9Df  |