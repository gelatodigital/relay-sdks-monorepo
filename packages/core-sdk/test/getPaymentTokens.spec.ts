import axios from "axios";
import { SinonStub, stub } from "sinon";
import { expect } from "./utils/expect";
import { Oracle } from "../src";

let axiosGetStub: SinonStub;
const paymentTokens = [
  "0x0000000000000000000000000000000000000000",
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
];
const mockGetPaymentTokens = {
  paymentTokens,
};

const chainId = 1;

describe("getPaymentTokens", () => {
  beforeEach(async () => {
    axiosGetStub = stub(axios, "get");
    axiosGetStub.resetHistory();
    axiosGetStub.resolves({ data: mockGetPaymentTokens });
  });

  it("should work if a chain is supported by gelato", async () => {
    expect(await Oracle.getPaymentTokens(chainId)).to.be.containingAllOf(
      paymentTokens
    );
  });

  afterEach(async () => {
    axiosGetStub.restore();
  });
});
