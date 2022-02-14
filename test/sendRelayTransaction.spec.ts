import axios from "axios";
import { SinonStub, stub } from "sinon";
import { expect } from "./utils/expect";
import { RelaySDK } from "../src";
import constants from "../src/utils/constants";

let axiosGetStub: SinonStub;
const mockGetSupportedRelays = {
  taskId: constants.ZERO_ADDRESS,
};

const chainId = 1;
const dest: string = constants.ZERO_ADDRESS;
const data = "0x00"; // Encoded function
const token: string = constants.ZERO_ADDRESS;
const relayerFee = "0x01"; // Unused now

describe("sendRelayTransaction", () => {
  beforeEach(async () => {
    axiosGetStub = stub(axios, "post");
    axiosGetStub.resetHistory();
    axiosGetStub.resolves({ data: mockGetSupportedRelays });
  });

  it("should work if a chain is supported by gelato", async () => {
    expect(
      await RelaySDK.sendRelayTransaction(
        chainId,
        dest,
        data,
        token,
        relayerFee
      )
    ).to.deep.equal(mockGetSupportedRelays);
  });

  afterEach(async () => {
    axiosGetStub.restore();
  });
});
