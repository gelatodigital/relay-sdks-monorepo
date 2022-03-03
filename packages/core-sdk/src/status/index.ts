import axios from "axios";
import { RELAY_URL } from "../utils/constants";

const getTaskStatus = async (taskId: string): Promise<any> => {
  let result = {};
  try {
    const res = await axios.get(`${RELAY_URL}/tasks/${taskId}`);
    result = res.data.data;
  } catch (error) {} // eslint-disable-line no-empty

  return result;
};

export { getTaskStatus };
