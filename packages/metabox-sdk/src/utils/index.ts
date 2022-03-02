import { getAddress } from "ethers/lib/utils";

import { EIP712Domain } from "../types";

const getEIP712Domain = (chainId: number): EIP712Domain => {
  return {
    name: "GelatoMetaBox",
    version: "V1",
    chainId: chainId,
    verifyingContract: getAddress(""),
  };
};

export { getEIP712Domain };
