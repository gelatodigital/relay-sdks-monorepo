import axios from "axios";
import { SinonStub, stub } from "sinon";
import { expect } from "./utils/expect";
import { RelaySDK } from "../src";

let axiosGetStub: SinonStub;
const mockGetSupportedRelays = {
  relays: ["1"],
};

describe("isChainSupported", () => {
  beforeEach(async () => {
    axiosGetStub = stub(axios, "get");
    axiosGetStub.resetHistory();
    axiosGetStub.resolves({ data: mockGetSupportedRelays });
  });

  it("should work if a chain is supported by gelato", async () => {
    expect(await RelaySDK.isChainSupported(1)).to.be.true;
  });

  it("should work if a chain is not supported by gelato", async () => {
    expect(await RelaySDK.isChainSupported(12345)).to.be.false;
  });

  afterEach(async () => {
    axiosGetStub.restore();
  });
});
