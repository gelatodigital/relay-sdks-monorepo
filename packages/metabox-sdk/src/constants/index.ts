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
      return utils.getAddress("0x6be602e1E1629789E64bf30d56139396b232597C");
    case 137:
      return utils.getAddress("0xbeC333EDE1A0687D2b9624F8C073a54c93ba9777");
    case 80001:
      return utils.getAddress("0xeeea839E2435873adA11d5dD4CAE6032742C0445");
    default:
      throw new Error(`getMetaBoxAddress: chainId ${chainId} not supported`);
  }
};

export { getMetaBoxAddress, REQUEST_TYPE_HASH };
