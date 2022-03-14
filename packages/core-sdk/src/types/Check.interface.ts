import { Payload } from "./Payload.interface";
import { TaskState } from "./TaskStatus.enum";

export interface Check {
  taskState: TaskState;
  message?: string;
  payload?: Payload;
}
