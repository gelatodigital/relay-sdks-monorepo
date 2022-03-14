import axios from "axios";
import { RELAY_URL } from "../utils/constants";
import { TransactionStatus } from "../types";

const getTaskStatus = async (
  taskId: string
): Promise<TransactionStatus | undefined> => {
  let result: TransactionStatus | undefined;
  try {
    const res = await axios.get(`${RELAY_URL}/tasks/${taskId}`);
    if (Array.isArray(res.data.data) && res.data.data.length > 0) {
      result = res.data.data[0];
    }
  } catch (error) {} // eslint-disable-line no-empty

  return result;
};

export { getTaskStatus };
