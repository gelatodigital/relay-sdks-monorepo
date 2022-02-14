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

3. Submit transaction
```typescript
  // Generate the function data
  const contractInterface = new Interface(contractABI);
  const data = contractInterface.encodeFunctionData("functionToCall", [args]);

  const relayTx = await RelaySDK.sendRelayTransaction(
    chainId,
    destAddress,
    data,
    daiPolygonAddress,
    estimatedDaiFee.toHexString()
  );
  console.log(`RelayerTransactionId = ${relayTx.taskId}`);
```