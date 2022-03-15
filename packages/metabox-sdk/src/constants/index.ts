import { utils } from "ethers";

const RELAY_URL = "https://relay.gelato.digital";

const REQUEST_TYPE_HASH = utils.solidityKeccak256(
  ["string"],
  [
    "Request(uint256 chainId,address target,bytes data,address feeToken,address user,address sponsor,uint256 nonce,uint256 deadline,bool isEIP2771)",
  ]
);

export { RELAY_URL, REQUEST_TYPE_HASH };
