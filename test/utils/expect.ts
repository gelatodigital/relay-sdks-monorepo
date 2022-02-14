import chai from "chai";
import promised from "chai-as-promised";
import subset from "chai-subset";
import ChaiBigNumber from "chai-bignumber";
import sinonChai from "sinon-chai";
import { ethers } from "ethers";

let chaiPlugin = chai.use(subset);
chaiPlugin = chaiPlugin.use(promised);
chaiPlugin = chaiPlugin.use(sinonChai);
chaiPlugin = chaiPlugin.use(ChaiBigNumber(ethers.BigNumber));

export const expect = chaiPlugin.expect;
