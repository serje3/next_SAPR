import {CanvasDrawerDecorator} from "../other/abstract/CanvasDrawerDecorator";
import {ICanvasDrawer} from "../other/interfaces/ICanvasDrawer";
import {KernelState, Point, Size, SupportState} from "../types";
import {Kernels} from "../kernels/Kernels";
import {IKernelContext} from "../other/interfaces/IKernelContext";
import {KernelCanvasDrawerDecorator} from "../other/base/KernelCanvasDrawerDecorator";

export class Supports extends KernelCanvasDrawerDecorator implements ICanvasDrawer {
    private kernelsCanvas: Kernels;
    private readonly kernels: KernelState[];

    constructor(behaviour: ICanvasDrawer & IKernelContext,
                private readonly supports: SupportState[]) {
        super(behaviour);
        this.kernels = this.behaviour.getKernels()
        this.kernelsCanvas = new Kernels(this.kernels)
    }

    drawSupport(ctx: CanvasRenderingContext2D, support: SupportState, coefficient: Size, alignCenterPoint: Point, x: number) {
        const step = 7
        const length = 7
        const currentKernel = this.kernels[support.kernelId]
        const height = currentKernel.A * coefficient.height
        ctx.beginPath()
        const start = alignCenterPoint.y - Math.round(height / 2)
        for (let i = start; i < alignCenterPoint.y + Math.round(height/2); i += step) {
            ctx.moveTo(x, i)
            ctx.lineTo(support.leftSide?x - length:x + length, support.leftSide?i + length: i- length)
        }
        ctx.stroke()
        ctx.closePath()
    }

    updateCallback(ctx: CanvasRenderingContext2D, zero: Point, size: Size, end: Point): void {
        this.behaviour.updateCallback(ctx, zero, size, end)
        const coefficient = this.kernelsCanvas.findOptimalCoefficient(zero, end)
        const leftSupport = this.supports[0]
        const rightSupport = this.supports[1]
        const supportOnLeftSide = leftSupport !== null
        const supportOnRightSide = rightSupport !== null
        const alignCenterPoint = this.kernelsCanvas.getAlignCenterPoint(zero, end)
        const posEnd = this.kernelsCanvas.findSumL(coefficient.width)
        if (supportOnLeftSide) {
            console.log('Drawing left support')
            this.drawSupport(ctx, leftSupport, coefficient, alignCenterPoint, zero.x)
        }
        if (supportOnRightSide){
            console.log('Drawing right support')
            this.drawSupport(ctx,rightSupport, coefficient, alignCenterPoint, zero.x + posEnd)
        }
    }

    getKernels(): KernelState[] {
        return this.kernels;
    }

}