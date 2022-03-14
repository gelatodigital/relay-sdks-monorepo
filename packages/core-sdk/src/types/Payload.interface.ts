import { FeeData } from "./FeeData.interface";

export interface Payload {
  to: string;
  data: string;
  feeData: FeeData;
}
