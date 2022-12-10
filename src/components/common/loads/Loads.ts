import {CanvasDrawerDecorator} from "../other/abstract/CanvasDrawerDecorator";
import {ICanvasDrawer} from "../other/interfaces/ICanvasDrawer";
import {AllLoadStates, ConcentratedLoad, DistributedLoad, KernelState, Load, Point, Size} from "../types";
import {IKernelContext} from "../other/interfaces/IKernelContext";
import {KernelCanvasDrawerDecorator} from "../other/base/KernelCanvasDrawerDecorator";
import {Kernels} from "../kernels/Kernels";

export class Loads extends KernelCanvasDrawerDecorator implements ICanvasDrawer{
    private kernelCanvas: Kernels;
    private coefficient: Size;
    constructor(behaviour: ICanvasDrawer & IKernelContext, private readonly loads: AllLoadStates) {
        super(behaviour);
        this.kernelCanvas = new Kernels(this.behaviour.getKernels())
    }

    drawDistributed(ctx: CanvasRenderingContext2D,load: DistributedLoad, zero: Point, end: Point){
        const sign = Math.sign(-load.value)
        const step = 12
        const length = 7
        const alignCenterPoint: Point = this.kernelCanvas.getAlignCenterPoint(zero,end)
        const kernel = this.getKernels()[load.id]
        const startLine: Point = alignCenterPoint
        const endLine: Point = {x: alignCenterPoint.x + this.coefficient.width * kernel.L, y: alignCenterPoint.y}
        ctx.beginPath()
        ctx.strokeStyle="green"
        ctx.moveTo(startLine.x, startLine.y)
        ctx.lineTo(endLine.x, endLine.y)
        ctx.stroke()

        ctx.strokeText(`${Math.abs(load.value) === 1?`${sign > 0?"":"- "}`:load.value}q`, Math.round(startLine.x + endLine.x)/2, alignCenterPoint.y + 20)

        startLine.x += step
        endLine.x -= sign < 0? 0: step
        const y = alignCenterPoint.y
        for (let x = startLine.x; x < endLine.x; x+=step) {
            ctx.moveTo(x, y)
            ctx.lineTo(x + sign*length, y + length)
            ctx.moveTo(x, y)
            ctx.lineTo(x + sign*length, y - length)
        }
        ctx.stroke()

        ctx.closePath()
    }
    drawConcentrated(ctx: CanvasRenderingContext2D,load: ConcentratedLoad, zero: Point, end: Point){
        const sign = Math.sign(load.value)
        const alignCenterPoint: Point = this.kernelCanvas.getAlignCenterPoint(zero,end)
        const length = 12
        const coefficientLength = 4
        ctx.strokeStyle='black'
        ctx.beginPath()
        const posY = alignCenterPoint.y -20
        ctx.moveTo(alignCenterPoint.x, posY)
        const posX = alignCenterPoint.x + sign * coefficientLength * length
        ctx.lineTo(posX, posY)
        ctx.moveTo(posX, posY)
        ctx.lineTo(posX - sign * length, posY + length)
        ctx.moveTo(posX, posY)
        ctx.lineTo(posX - sign * length, posY - length)
        ctx.stroke()
        ctx.strokeText(`${Math.abs(load.value) === 1?`${sign > 0?"":"- "}`:load.value}F`, posX, posY - 10)
        ctx.closePath()
    }

    computeEdgesPosition(zero): number[]{
        const kernels = this.getKernels()
        return kernels.reduce((prev, curr)=> [...prev, prev.slice(-1)[0]+ curr.L * this.coefficient.width],[zero.x])
    }

    updateCallback(ctx: CanvasRenderingContext2D, zero: Point, size: Size | undefined, end: Point | undefined): void {
        this.behaviour.updateCallback(ctx, zero, size, end)
        this.coefficient = this.kernelCanvas.findOptimalCoefficient(zero, end)
        const startDistributed = {...zero}
        const startConcentrated = {...zero}
        const edges = this.computeEdgesPosition(zero)
        console.log(edges, zero)
        for (const load of this.loads) {
            if (load.loadType === Load.Distributed){
                this.drawDistributed(ctx,load, startDistributed,end)
                startDistributed.x = zero.x + this.getKernels()[load.id].L * this.coefficient.width
            } else if(load.loadType === Load.Concentrated){
                startConcentrated.x = edges[load.id]
                this.drawConcentrated(ctx,load, startConcentrated,end)
            }
        }
    }

    getKernels(): KernelState[] {
        return this.behaviour.getKernels();
    }

}