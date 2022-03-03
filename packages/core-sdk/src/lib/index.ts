import axios from "axios";
import { BigNumber } from "ethers";
import constants from "../utils/constants";

const { RELAY_URL } = constants;

const getEstimatedFee = async (
  chainId: number,
  paymentToken: string,
  gasLimit: BigNumber,
  isHighPriority: boolean
): Promise<BigNumber> => {
  const result = await _getEstimatedFee(
    chainId,
    paymentToken,
    gasLimit.toString(),
    isHighPriority
  );
  return result;
};

const _getEstimatedFee = async (
  chainId: number,
  paymentToken: string,
  gasLimit: string,
  isHighPriority: boolean
): Promise<BigNumber> => {
  const params = { paymentToken, gasLimit, isHighPriority };
  let result: BigNumber;
  try {
    const res = await axios.get(`${RELAY_URL}/oracles/${chainId}/estimate`, {
      params,
    });
    result = BigNumber.from(res.data.estimatedFee);
  } catch (error) {
    let message = `RelaySdkError: ${(error as Error).message} `;
    if (axios.isAxiosError(error)) {
      message += error.response?.data?.message;
    }
    throw new Error(message);
  }
  return result;
};

const isOracleActive = async (chainId: number): Promise<boolean> => {
  const oracles = await getGelatoOracles();
  return oracles.includes(chainId.toString());
};

const getGelatoOracles = async (): Promise<string[]> => {
  let result = [];
  try {
    const res = await axios.get(`${RELAY_URL}/oracles/`);
    result = res.data.oracles;
  } catch (error) {} // eslint-disable-line no-empty

  return result;
};

const getPaymentTokens = async (chainId: number): Promise<string[]> => {
  let result = [];
  try {
    const res = await axios.get(
      `${RELAY_URL}/oracles/${chainId}/paymentTokens/`
    );
    result = res.data.paymentTokens;
  } catch (error) {} // eslint-disable-line no-empty

  return result;
};

export { isOracleActive, getEstimatedFee, getPaymentTokens };
