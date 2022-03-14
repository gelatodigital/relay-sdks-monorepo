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
    paymentTokenAddress,
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
| ARBITRUM  | 0x4775aF8FEf4809fE10bf05867d2b038a4b5B2146  |
| AVALANCHE | 0x7C5c4Af1618220C090A6863175de47afb20fa9Df  |

## RelayTransit Contract Addresses
| Chain     |  Contract Address                           |
|---        |---                                          |
| MAINNET   | 0x36225733276425f5DbA88977Aef45f042BACB953  |
| ROPSTEN   | 0x1908238d294058722D9c27B3DCaffA326F05eDA4  |
| RINKEBY   | 0xfe65B7FA42d7F71C6725b183CAF03b1622F3B69F  |
| GOERLI    | 0x5d61B0425FcEE18C872104ED00477286d7d461dc  |
| OPTIMISM  | 0xb34758F24fFEf132dc5831C2Cd9A0a5e120CD564  |
| BSC       | 0x3652b3D7c814D331974a3Ff70C8038971727cd63  |
| XDAI      | 0x0f92f38A73e8f1f226517C14126F95f5Bd3678e8  |
| MATIC     | 0xAe92F11c3c8BA455e858Fbd50AA29B2db8E57121  |
| FANTOM    | 0x5D6c3f065Ce364Af04f1207Cbad999A7B640921A  |
| MOONBEAM  | 0x24D677f8A59A486BfC6d87E9453C4f1fEfcB0958  |
| ARBITRUM  | 0x79A0cB573D3Db184752511969F1b869A184EA445  |
| AVALANCHE | 0x4efaEe0fAD71A451c6Ca621df5AeFc5c01668a26  |