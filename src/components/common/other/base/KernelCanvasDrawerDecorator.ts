import {CanvasDrawerDecorator} from "../abstract/CanvasDrawerDecorator";
import {IKernelContext} from "../interfaces/IKernelContext";
import {KernelState} from "../../types";
import {ICanvasDrawer} from "../interfaces/ICanvasDrawer";

export class KernelCanvasDrawerDecorator extends CanvasDrawerDecorator implements IKernelContext{
    constructor(protected readonly behaviour: ICanvasDrawer & IKernelContext ) {
        super();
    }
    getKernels(): KernelState[] {
        return this.behaviour.getKernels();
    }

}