import axios from "axios";
import { SinonStub, stub } from "sinon";
import { expect } from "./utils/expect";
import { RelaySDK } from "../src";

let axiosGetStub: SinonStub;
const mockGetActiveOracles = {
  oracles: ["1"],
};

describe("isOracleActive", () => {
  beforeEach(async () => {
    axiosGetStub = stub(axios, "get");
    axiosGetStub.resetHistory();
    axiosGetStub.resolves({ data: mockGetActiveOracles });
  });

  it("should work if an oracle is active", async () => {
    expect(await RelaySDK.isOracleActive(1)).to.be.true;
  });

  it("should work if an oracle is not active", async () => {
    expect(await RelaySDK.isOracleActive(12345)).to.be.false;
  });

  afterEach(async () => {
    axiosGetStub.restore();
  });
});
