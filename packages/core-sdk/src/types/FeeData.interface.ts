import { BigNumber } from "./BigNumber.interface";

export interface FeeData {
  gasPrice: BigNumber;
  maxFeePerGas: BigNumber;
  maxPriorityFeePerGas: BigNumber;
}
