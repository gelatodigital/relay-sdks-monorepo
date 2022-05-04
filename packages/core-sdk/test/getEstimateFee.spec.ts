import axios from "axios";
import { SinonStub, stub } from "sinon";
import { expect } from "./utils/expect";
import { Oracle, ZERO_ADDRESS } from "../src";
import { BigNumber } from "ethers";

let axiosGetStub: SinonStub;
const mockGetEstimatedFee = {
  estimatedFee: 0xdeadbeef,
};

const chainId = 1;
const paymentToken: string = ZERO_ADDRESS;
const gasLimit = BigNumber.from(25);
const isHighPriority = true;
const gasLimitL1 = BigNumber.from(25);

describe("getEstimatedFee", () => {
  beforeEach(async () => {
    axiosGetStub = stub(axios, "get");
    axiosGetStub.resetHistory();
    axiosGetStub.resolves({ data: mockGetEstimatedFee });
  });

  it("should work if a chain is supported by gelato", async () => {
    expect(
      await Oracle.getEstimatedFee(
        chainId,
        paymentToken,
        gasLimit,
        isHighPriority
      )
    ).to.deep.equal(BigNumber.from("0xdeadbeef"));
  });

  it("should work if a chain is supported by gelato using GasLimitL1 as parameter", async () => {
    expect(
      await Oracle.getEstimatedFee(
        chainId,
        paymentToken,
        gasLimit,
        isHighPriority,
        gasLimitL1
      )
    ).to.deep.equal(BigNumber.from("0xdeadbeef"));
  });

  afterEach(async () => {
    axiosGetStub.restore();
  });
});
