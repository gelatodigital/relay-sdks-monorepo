import axios from "axios";
import { BigNumber, BytesLike, utils } from "ethers";
import { _TypedDataEncoder } from "ethers/lib/utils";

import { RELAY_URL, META_BOX_URL, REQUEST_TYPE_HASH } from "../constants";
import { Request, EIP712TypeData } from "../types";
import { getEIP712Domain, getEIP712DomainSeparator } from "../utils";

const sendMetaBoxTransaction = async (
  request: Request,
  userSignature: BytesLike,
  sponsorSignature?: BytesLike
): Promise<string> => {
  try {
    const response = await axios.post(
      `${META_BOX_URL}/metabox-relays/${request.chainId}`,
      {
        ...request,
        userSignature,
        sponsorSignature: sponsorSignature ?? userSignature,
      }
    );

    return response.data.taskId;
  } catch (error) {
    let errorMsg = (error as Error).message ?? String(error);

    if (axios.isAxiosError(error) && error.response) {
      errorMsg = error.response?.data;
    }

    throw new Error(`sendMetaBoxTransaction: Failed with error: ${errorMsg}`);
  }
};

const isChainSupported = async (chainId: number): Promise<boolean> => {
  try {
    const response = await axios.get(`${META_BOX_URL}/metabox-relays/`);
    const chainsSupportedByGelato: string[] = response.data.relays;

    return chainsSupportedByGelato.includes(chainId.toString());
  } catch (error) {
    let errorMsg = (error as Error).message ?? String(error);

    if (axios.isAxiosError(error) && error.response) {
      errorMsg = error.response?.data;
    }

    throw new Error(`isChainSupported: Failed with error: ${errorMsg}`);
  }
};

const getEstimatedFee = async (
  chainId: number,
  feeToken: string,
  gasLimit: number,
  isHighPriority: boolean
): Promise<BigNumber> => {
  try {
    const response = await axios.get(
      `${RELAY_URL}/oracles/${chainId}/estimate`,
      {
        params: {
          feeToken,
          gasLimit,
          isHighPriority,
        },
      }
    );

    return BigNumber.from(response.data.estimatedFee);
  } catch (error) {
    let errorMsg = (error as Error).message ?? String(error);

    if (axios.isAxiosError(error) && error.response) {
      errorMsg = error.response?.data;
    }

    throw new Error(`getEstimatedFee: Failed with error: ${errorMsg}`);
  }
};

const isFeeOracleActive = async (chainId: number): Promise<boolean> => {
  const oracles = await getGelatoFeeOracles();

  return oracles.includes(chainId.toString());
};

const getGelatoFeeOracles = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${RELAY_URL}/oracles/`);

    return response.data.oracles;
  } catch (error) {
    let errorMsg = (error as Error).message ?? String(error);

    if (axios.isAxiosError(error) && error.response) {
      errorMsg = error.response?.data;
    }

    throw new Error(`getGelatoFeeOracles: Failed with error: ${errorMsg}`);
  }
};

const getFeeTokens = async (chainId: number): Promise<string[]> => {
  try {
    const response = await axios.get(
      `${RELAY_URL}/oracles/${chainId}/paymentTokens/`
    );

    return response.data.paymentTokens;
  } catch (error) {
    let errorMsg = (error as Error).message ?? String(error);

    if (axios.isAxiosError(error) && error.response) {
      errorMsg = error.response?.data;
    }

    throw new Error(`getFeeTokens: Failed with error: ${errorMsg}`);
  }
};

const metaBoxRequest = (
  chainId: number,
  target: string,
  data: BytesLike,
  feeToken: string,
  user: string,
  nonce: number,
  isEIP2771: boolean,
  sponsor?: string,
  deadline?: number
): Request => {
  return {
    chainId,
    target,
    data,
    feeToken,
    user,
    sponsor: sponsor ?? user,
    nonce,
    deadline: deadline ?? 0,
    isEIP2771,
  };
};

const getDigestToSign = (request: Request): string => {
  const domainSeparator = getEIP712DomainSeparator(request.chainId);

  const abiCoder = new utils.AbiCoder();

  const hash = utils.solidityKeccak256(
    ["bytes"],
    [
      abiCoder.encode(
        [
          "bytes32",
          "uint256",
          "address",
          "bytes32",
          "address",
          "address",
          "address",
          "uint256",
          "uint256",
          "bool",
        ],
        [
          REQUEST_TYPE_HASH,
          request.chainId,
          request.target,
          utils.solidityKeccak256(["bytes"], [request.data]),
          request.feeToken,
          request.user,
          request.sponsor,
          request.nonce,
          request.deadline,
          request.isEIP2771,
        ]
      ),
    ]
  );

  const digest = utils.solidityKeccak256(
    ["bytes"],
    [utils.hexConcat(["0x1901", domainSeparator, hash])]
  );

  return digest;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getWalletPayloadToSign = (request: Request): any => {
  const domain = getEIP712Domain(request.chainId);

  return _TypedDataEncoder.getPayload(domain, EIP712TypeData, request);
};

export {
  isChainSupported,
  sendMetaBoxTransaction,
  isFeeOracleActive,
  getEstimatedFee,
  getFeeTokens,
  metaBoxRequest,
  getDigestToSign,
  getWalletPayloadToSign,
};
