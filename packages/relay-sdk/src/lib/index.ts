import RelayTransaction from "../types/RelayTransaction.interface";
import axios from "axios";
import { BigNumber } from "ethers";
import constants from "../utils/constants";
const { RELAY_URL } = constants;

const sendRelayTransaction = async (
  chainId: number,
  dest: string,
  data: string,
  token: string,
  relayerFee: string
): Promise<RelayTransaction> => {
  const params = { dest, data, token, relayerFee };

  let output;
  try {
    const res = await axios.post(`${RELAY_URL}/relays/${chainId}`, params);
    output = res.data;
  } catch (error) {
    let message = `RelaySdkError: ${(error as Error).message} `;
    if (axios.isAxiosError(error)) {
      message += error.response?.data?.message;
    }
    throw new Error(message);
  }
  return output;
};

const isChainSupported = async (chainId: number): Promise<boolean> => {
  const chainsSupportedByGelato = await getGelatoRelayChains();
  return chainsSupportedByGelato.includes(chainId.toString());
};

const getGelatoRelayChains = async (): Promise<string[]> => {
  let result = [];
  try {
    const res = await axios.get(`${RELAY_URL}/relays/`);
    result = res.data.relays;
  } catch (error) {} // eslint-disable-line no-empty

  return result;
};

const getEstimatedFee = async (
  chainId: number,
  paymentToken: string,
  gasLimit: number,
  isHighPriority: boolean
): Promise<BigNumber> => {
  const result = await _getEstimatedFee(
    chainId,
    paymentToken,
    gasLimit,
    isHighPriority
  );
  return result;
};

const _getEstimatedFee = async (
  chainId: number,
  paymentToken: string,
  gasLimit: number,
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

export {
  isChainSupported,
  sendRelayTransaction,
  isOracleActive,
  getEstimatedFee,
  getPaymentTokens,
};
