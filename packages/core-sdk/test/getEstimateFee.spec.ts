import axios from "axios";
import { SinonStub, stub } from "sinon";
import { expect } from "./utils/expect";
import { RelaySDK } from "../src";
import constants from "../src/utils/constants";
import { BigNumber } from "ethers";

let axiosGetStub: SinonStub;
const mockGetEstimatedFee = {
  estimatedFee: 0xdeadbeef,
};

const chainId = 1;
const paymentToken: string = constants.ZERO_ADDRESS;
const gasLimit = BigNumber.from(25);
const isHighPriority = true;

describe("getEstimatedFee", () => {
  beforeEach(async () => {
    axiosGetStub = stub(axios, "get");
    axiosGetStub.resetHistory();
    axiosGetStub.resolves({ data: mockGetEstimatedFee });
  });

  it("should work if a chain is supported by gelato", async () => {
    expect(
      await RelaySDK.getEstimatedFee(
        chainId,
        paymentToken,
        gasLimit,
        isHighPriority
      )
    ).to.deep.equal(BigNumber.from("0xdeadbeef"));
  });

  afterEach(async () => {
    axiosGetStub.restore();
  });
});
