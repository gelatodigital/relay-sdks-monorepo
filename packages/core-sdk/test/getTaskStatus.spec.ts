import axios from "axios";
import { SinonStub, stub } from "sinon";
import { expect } from "./utils/expect";
import { Status } from "../src";

let axiosGetStub: SinonStub;
const taskStatusData = {
  service: "Relay",
  chain: "ropsten",
  taskId: "0xf38e1621103419050f1bc6c62dd6e08cfb423a88a24d99ec6cbaa78a1eaabc93",
  taskState: "ExecSuccess",
  created_at: "2022-03-14T13:37:26.597Z",
  lastCheck: {
    taskState: "ExecPending",
    message: "",
    payload: {
      to: "0x35812744F4F3cc1F445Ff9044D8E6B2C12EBa0f6",
      data: "0x8f0c9a03000000000000000000000000f09df328f6f4aec94130356925d07e5a97af5fdc00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000000000044deaa9cc40000000000000000000000000000000000000000000000000000000000005208000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee00000000000000000000000000000000000000000000000000000000",
      feeData: {
        gasPrice: {
          hex: "0x01702821de",
          type: "BigNumber",
        },
        maxFeePerGas: {
          hex: "0x0170283238",
          type: "BigNumber",
        },
        maxPriorityFeePerGas: {
          hex: "0x017027eb5b",
          type: "BigNumber",
        },
      },
      feeToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      gasLimit: {
        hex: "0x05c9bc",
        type: "BigNumber",
      },
      isFlashbots: false,
    },
    created_at: "2022-03-14T13:38:21.811Z",
  },
  lastExecution: "2022-03-14T13:42:13.124Z",
  execution: {
    status: "success",
    transactionHash:
      "0x708334305103ae422932acc653edf5c964142ef2677039b12b7f37f931f090a0",
    blockNumber: 12084977,
    created_at: "2022-03-14T13:42:13.124Z",
  },
};
const mockGetTaskStatus = {
  data: [taskStatusData],
};

const taskId =
  "0xf38e1621103419050f1bc6c62dd6e08cfb423a88a24d99ec6cbaa78a1eaabc93";

describe("getTaskStatus", () => {
  beforeEach(async () => {
    axiosGetStub = stub(axios, "get");
    axiosGetStub.resetHistory();
    axiosGetStub.resolves({ data: mockGetTaskStatus });
  });

  it("should return task status", async () => {
    expect(await Status.getTaskStatus(taskId)).to.deep.equal(taskStatusData);
  });

  afterEach(async () => {
    axiosGetStub.restore();
  });
});
