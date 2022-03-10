import axios from "axios";
import { SinonStub, stub } from "sinon";
import { expect } from "./utils/expect";
import { Status } from "../src";
import { BigNumber } from "ethers";

let axiosGetStub: SinonStub;
const mockGetEstimatedFee = {
  estimatedFee: 0xdeadbeef,
};

const txId = "";

describe("getTaskStatus", () => {
  beforeEach(async () => {
    axiosGetStub = stub(axios, "get");
    axiosGetStub.resetHistory();
    axiosGetStub.resolves({ data: mockGetEstimatedFee });
  });

  afterEach(async () => {
    axiosGetStub.restore();
  });
});
