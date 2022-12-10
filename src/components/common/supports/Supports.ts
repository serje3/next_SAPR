import {CanvasDrawerDecorator} from "../other/abstract/CanvasDrawerDecorator";
import {ICanvasDrawer} from "../other/interfaces/ICanvasDrawer";
import {KernelState, Point, Size, SupportState} from "../types";
import {Kernels} from "../kernels/Kernels";

export class Supports extends CanvasDrawerDecorator implements ICanvasDrawer {
    private kernelsCanvas: Kernels;

    constructor(protected readonly behaviour: ICanvasDrawer,
                private readonly supports: SupportState[],
                private readonly kernels: KernelState[]) {
        super();
        this.kernelsCanvas = new Kernels(this.kernels)
    }

    drawSupport(ctx: CanvasRenderingContext2D, support: SupportState, coefficient: Size, alignCenterPoint: Point, x: number) {
        const step = 7
        const length = 7
        const currentKernel = this.kernels[support.kernelId]
        const height = currentKernel.A * coefficient.height
        ctx.beginPath()
        const start = alignCenterPoint.y - Math.round(height / 2)
        console.log(height + alignCenterPoint.y, coefficient, currentKernel.A)
        for (let i = start; i < alignCenterPoint.y + Math.round(height/2); i += step) {
            ctx.moveTo(x, i)
            ctx.lineTo(x - length, support.leftSide? i + length: i - length)
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
        const width = this.kernels[].L * coefficient.width
        if (supportOnLeftSide) {
            console.log('Drawing left support')
            this.drawSupport(ctx, leftSupport, coefficient, alignCenterPoint, zero.x)
        }
        if (supportOnRightSide){
            console.log('Drawing right support')
            this.drawSupport(ctx,leftSupport, coefficient, alignCenterPoint, end.x)
        }
    }

}