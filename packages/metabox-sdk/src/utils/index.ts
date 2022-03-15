import { utils } from "ethers";

import { getMetaBoxAddress } from "../constants";
import { EIP712Domain } from "../types";

const abiCoder = new utils.AbiCoder();

const getEIP712Domain = (chainId: number): EIP712Domain => {
  return {
    name: "GelatoMetaBox",
    version: "V1",
    chainId: chainId,
    verifyingContract: getMetaBoxAddress(chainId),
  };
};

const getEIP712DomainSeparator = (chainId: number): string => {
  try {
    const gelatoMetaBox = getMetaBoxAddress(chainId);

    const domainSeparator = utils.solidityKeccak256(
      ["bytes"],
      [
        abiCoder.encode(
          ["bytes32", "bytes32", "bytes32", "bytes32", "address"],
          [
            utils.solidityKeccak256(
              ["bytes"],
              [
                utils.toUtf8Bytes(
                  "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
              ]
            ),
            utils.solidityKeccak256(
              ["bytes"],
              [utils.toUtf8Bytes("GelatoMetaBox")]
            ),
            utils.solidityKeccak256(["bytes"], [utils.toUtf8Bytes("V1")]),
            utils.hexZeroPad(utils.hexlify(chainId), 32),
            utils.getAddress(gelatoMetaBox),
          ]
        ),
      ]
    );

    return domainSeparator;
  } catch (error) {
    const errorMsg = (error as Error).message ?? String(error);

    throw new Error(`getEIPDomainSeparator: Failed with error: ${errorMsg}`);
  }
};

export {
  abiCoder,
  getMetaBoxAddress,
  getEIP712Domain,
  getEIP712DomainSeparator,
};
