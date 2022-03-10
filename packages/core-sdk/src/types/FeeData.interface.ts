import BigNumber from "./BigNumber.interface";

interface FeeData {
  gasPrice: BigNumber;
  maxFeePerGas: BigNumber;
  maxPriorityFeePerGas: BigNumber;
}

export default FeeData;
