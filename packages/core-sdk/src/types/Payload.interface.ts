import FeeData from "./FeeData.interface";

interface Payload {
  to: string;
  data: string;
  feeData: FeeData;
}

export default Payload;
