import axios from "axios";
import { BytesLike, utils } from "ethers";
import { _TypedDataEncoder } from "ethers/lib/utils";
import { RELAY_URL, Oracle } from "@gelatonetwork/core-sdk";

import { REQUEST_TYPE_HASH } from "../constants";
import metaBoxABI from "../constants/abis/GelatoMetaBox.json";
import { Request, EIP712TypeData } from "../types";
import {
  abiCoder,
  getMetaBoxAddress,
  getEIP712Domain,
  getEIP712DomainSeparator,
} from "../utils";

const sendMetaBoxTransaction = async (
  request: Request,
  userSignature: BytesLike,
  sponsorSignature?: BytesLike
): Promise<string> => {
  try {
    const response = await axios.post(
      `${RELAY_URL}/metabox-relays/${request.chainId}`,
      {
        ...request,
        userSignature,
        sponsorSignature: sponsorSignature ?? userSignature,
      }
    );

    return response.data.taskId;
  } catch (error) {
    const errorMsg = (error as Error).message ?? String(error);

    throw new Error(`sendMetaBoxTransaction: Failed with error: ${errorMsg}`);
  }
};

const isChainSupported = async (chainId: number): Promise<boolean> => {
  try {
    const response = await axios.get(`${RELAY_URL}/metabox-relays/`);
    const chainsSupportedByGelato: string[] = response.data.chainIds;

    return chainsSupportedByGelato.includes(chainId.toString());
  } catch (error) {
    const errorMsg = (error as Error).message ?? String(error);

    throw new Error(`isChainSupported: Failed with error: ${errorMsg}`);
  }
};

const getFeeTokens = async (chainId: number): Promise<string[]> => {
  return await Oracle.getPaymentTokens(chainId);
};

const getMetaBoxAddressAndABI = (
  chainId: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): { address: string; abi: any[] } => {
  const metaBoxAddress = getMetaBoxAddress(chainId);

  return { address: metaBoxAddress, abi: metaBoxABI };
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
  getFeeTokens,
  getMetaBoxAddressAndABI,
  metaBoxRequest,
  getDigestToSign,
  getWalletPayloadToSign,
};
