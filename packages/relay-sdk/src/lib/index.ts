import { RelayTransaction } from "../types/";
import axios from "axios";
import { BigNumber } from "ethers";
import { RELAY_URL, Oracle, Status } from "@gelatonetwork/core-sdk";

const sendRelayTransaction = async (
  chainId: number,
  dest: string,
  data: string,
  token: string,
  relayerFee: BigNumber
): Promise<RelayTransaction> => {
  const params = { dest, data, token, relayerFee: relayerFee.toString() };

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

const isOracleActive = Oracle.isOracleActive;
const getPaymentTokens = Oracle.getPaymentTokens;
const getEstimatedFee = Oracle.getEstimatedFee;
const getTaskStatus = Status.getTaskStatus;

export {
  isChainSupported,
  sendRelayTransaction,
  isOracleActive,
  getPaymentTokens,
  getEstimatedFee,
  getTaskStatus,
};
