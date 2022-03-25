import { utils } from "ethers";

const REQUEST_TYPE_HASH = utils.solidityKeccak256(
  ["string"],
  [
    "Request(uint256 chainId,address target,bytes data,address feeToken,address user,address sponsor,uint256 nonce,uint256 deadline,bool isEIP2771)",
  ]
);

const getMetaBoxAddress = (chainId: number): string => {
  switch (chainId) {
    case 5:
      return utils.getAddress("0xf8Da711e2644415c41E3BD1329477019FC50C490");
    case 137:
      return utils.getAddress("0x0343Af039E2E1c25A9691eEb654Ce0de1910C3e2");
    case 80001:
      return utils.getAddress("0xDf592cB2d32445F8e831d211AB20D3233cA41bD8");
    default:
      throw new Error(`getMetaBoxAddress: chainId ${chainId} not supported`);
  }
};

export { getMetaBoxAddress, REQUEST_TYPE_HASH };
