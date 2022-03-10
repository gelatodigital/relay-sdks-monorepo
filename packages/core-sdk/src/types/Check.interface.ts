import Payload from "./Payload.interface";
import { TaskState } from "./TaskStatus.enum";

interface Check {
  taskState: TaskState;
  message?: string;
  payload?: Payload;
}

export default Check;
