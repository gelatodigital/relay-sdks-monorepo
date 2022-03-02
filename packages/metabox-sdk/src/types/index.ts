import { BytesLike } from "ethers";

type EIP712Domain = {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: string;
};

const EIP712TypeData = {
  Request: [
    { name: "chainId", type: "uint256" },
    { name: "target", type: "address" },
    { name: "data", type: "bytes" },
    { name: "feeToken", type: "address" },
    { name: "user", type: "address" },
    { name: "sponsor", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
    { name: "isEIP2771", type: "bool" },
  ],
};

type Request = {
  chainId: number;
  target: string;
  data: BytesLike;
  feeToken: string;
  user: string;
  sponsor: string;
  nonce: number;
  deadline: number;
  isEIP2771: boolean;
};

export { Request, EIP712Domain, EIP712TypeData };
