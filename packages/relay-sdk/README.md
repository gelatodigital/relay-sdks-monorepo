# Gelato Multichain Relay SDK <!-- omit in toc -->

SDK to integrate into Gelato Multichain Relay.
<br/>

## Table of Contents <!-- omit in toc -->

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Examples](#examples)
- [Supported Chains](#supported-chains)
- [Gelato Contract Addresses](#gelato-contract-addresses)
- [RelayTransit Contract Addresses](#relaytransit-contract-addresses)

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
  console.log("Oracle is not active on this network");
  return;
}

// Estimates the transaction cost in the defined token for the inputted gasLimit
// The paymentTokenAddress is the address of the token used to pay transaction fees
const estimatedExecutionFeeInToken: BigNumber = await RelaySDK.getEstimatedFee(
  chainId,
  paymentTokenAddress,
  gasLimit,
  isHighPriority // If we want to get a high priority fee
);
```

If you are estimating the transaction cost on Optimism, you have to use the
function getEstimatedFee with the GasLimit on L1 as follows:

```typescript
  const estimatedExecutionFeeInToken: BigNumber = await RelaySDK.getEstimatedFee(
    chainId,
    paymentTokenAddress,
    gasLimit,
    isHighPriority // If we want to get a high priority fee
    gasLimitL1 // Estimated Gas Limit on L1
  );
```

3. Get supported payment tokens by chain id

```typescript
// Get Payment Token Addresses
const paymentTokensAdresses: string[] = await RelaySDK.getPaymentTokens(
  chainId
);
```

4. Submit transaction:
   If you want to submit a transaction using the Gelato Multichain Relayer, the transaction should pay to the Gelato contract
   to execute, otherwise the transaction will revert.

```typescript
import { BigNumber } from "ethers";
import { Interface } from "ethers/lib/utils";

// Generate the function data
const contractInterface = new Interface(contractABI);
const data = contractInterface.encodeFunctionData("functionToCall", [args]);

const relayTx = await RelaySDK.sendRelayTransaction(
  chainId,
  destAddress,
  data,
  paymentTokenAddress
);
console.log(`RelayerTransactionId = ${relayTx.taskId}`);
```

5. Check your transaction status:

```typescript
const status = await RelaySDK.getTaskStatus(taskId);
if (status) {
  const state = (status as TransactionStatus).taskState;
  switch (state) {
    case TaskState.CheckPending:
      console.log(`> Task pending relayer verification`);
      break;
    case TaskState.ExecPending:
      console.log(`> Task queued for execution`);
      break;
    case TaskState.ExecSuccess:
      console.log(`> Task successfully executed, tx hash: ${status.execution?.transactionHash}`);
      break;
    case TaskState.ExecReverted:
      console.log(`> Task was reverted with message: ${status.lastCheck?.message}`);
      break;
    case TaskState.Cancelled:
      console.log(`> Task was cancelled with message: ${status.lastCheck?.message}`);
      break;
    default:
      console.log(`> Task status: ${state}`);
  }
```

## Examples

Check out our tutorial repository [relay-sdk-hello-world](https://github.com/gelatodigital/relay-sdk-hello-world) for more in-depth examples.
<br/><br/>

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

| Chain     | Contract Address                           |
| --------- | ------------------------------------------ |
| MAINNET   | 0x3CACa7b48D0573D793d3b0279b5F0029180E83b6 |
| ROPSTEN   | 0xCc4CcD69D31F9FfDBD3BFfDe49c6aA886DaB98d9 |
| RINKEBY   | 0x0630d1b8C2df3F0a68Df578D02075027a6397173 |
| GOERLI    | 0x683913B3A32ada4F8100458A3E1675425BdAa7DF |
| KOVAN     | 0xDf592cB2d32445F8e831d211AB20D3233cA41bD8 |
| OPTIMISM  | 0x01051113D81D7d6DA508462F2ad6d7fD96cF42Ef |
| BSC       | 0x7C5c4Af1618220C090A6863175de47afb20fa9Df |
| XDAI      | 0x29b6603D17B9D8f021EcB8845B6FD06E1Adf89DE |
| MATIC     | 0x7598e84B2E114AB62CAB288CE5f7d5f6bad35BbA |
| MUMBAI    | 0x25aD59adbe00C2d80c86d01e2E05e1294DA84823 |
| FANTOM    | 0xebA27A2301975FF5BF7864b99F55A4f7A457ED10 |
| MOONBEAM  | 0x91f2A140cA47DdF438B9c583b7E71987525019bB |
| ARBITRUM  | 0x4775aF8FEf4809fE10bf05867d2b038a4b5B2146 |
| AVALANCHE | 0x7C5c4Af1618220C090A6863175de47afb20fa9Df |
| BOBA      | 0x91f2A140cA47DdF438B9c583b7E71987525019bB |
| CRONOS    | 0x91f2A140cA47DdF438B9c583b7E71987525019bB |

## RelayTransit Contract Addresses

| Chain     | Contract Address                           |
| --------- | ------------------------------------------ |
| MAINNET   | 0x9B077C59fDe7de5AdCeF8093Bc38B61d43FC7007 |
| ROPSTEN   | 0xE2Fc8F14B6cEb1AD8165623E02953eDB100288bE |
| RINKEBY   | 0x7084d869F0C120957E40D762Ebe3104474D5248f |
| GOERLI    | 0xCDdE9992Fb66038Dd8419b56149a75CC79Df133C |
| KOVAN     | 0xb34758F24fFEf132dc5831C2Cd9A0a5e120CD564 |
| OPTIMISM  | 0xe8a5eE73f3c8F1Cd55915f6Eb5Fc7df4206f3C78 |
| BSC       | 0x43728A95386D64384C76Afd416Dcc8118869BA6c |
| XDAI      | 0x62B1a88CCc6BC5e6FF91FB2FCD29Ab4F819b35C6 |
| MATIC     | 0xE2Fc8F14B6cEb1AD8165623E02953eDB100288bE |
| MUMBAI    | 0x24D677f8A59A486BfC6d87E9453C4f1fEfcB0958 |
| FANTOM    | 0xFbf1CA2be769b79BE01e48F509107dcACb9ae11b |
| MOONBEAM  | 0x36225733276425f5DbA88977Aef45f042BACB953 |
| ARBITRUM  | 0x0ae392879A228B2484D9B1F80A5D0B7080FE79C2 |
| AVALANCHE | 0xa120a7d4EaF1910D38bc934D756DF507943a4C5a |
| BOBA      | 0x4efaEe0fAD71A451c6Ca621df5AeFc5c01668a26 |
| CRONOS    | 0x62B1a88CCc6BC5e6FF91FB2FCD29Ab4F819b35C6 |
