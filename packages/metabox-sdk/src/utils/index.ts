import { getAddress } from "ethers/lib/utils";

import { EIP712Domain } from "../types";

const getMetaBoxAddress = (chainId: number): string => {
  switch (chainId) {
    case 5:
      return getAddress("0x6be602e1E1629789E64bf30d56139396b232597C");
    default:
      throw new Error(`getMetaBoxAddress: chainId ${chainId} not supported`);
  }
};

const getEIP712Domain = (chainId: number): EIP712Domain => {
  return {
    name: "GelatoMetaBox",
    version: "V1",
    chainId: chainId,
    verifyingContract: getMetaBoxAddress(chainId),
  };
};

const getEIP712DomainSeparator = (chainId: number): string => {
  switch (chainId) {
    case 5:
      return "0xcf59809b26502b6ffdbc26fa7436cb5f1a802418930197cfc52e80e80e955b08";
    default:
      throw new Error(
        `getEIP712DomainSeparator: chainId ${chainId} not supported`
      );
  }
};

export { getEIP712Domain, getEIP712DomainSeparator };
