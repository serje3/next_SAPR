import {KernelState} from "../../types";

export interface IKernelContext {
    getKernels(): KernelState[]
}