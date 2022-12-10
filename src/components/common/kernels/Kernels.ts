import {ICanvasDrawer} from "../other/interfaces/ICanvasDrawer";
import {KernelState, Point, Size} from "../types";
import {getNewPos} from "../utils/getNewPos";
import {IKernelContext} from "../other/interfaces/IKernelContext";

export class Kernels implements ICanvasDrawer, IKernelContext {
    private initialCoefficient = {
        width: 200,
        height: 10
    }

    constructor(private readonly kernels: KernelState[], private readonly labels = true) {
    }

    findSumL(width) {
        return this.kernels.map(kernel => kernel.L * width).reduce((prev, current) => prev + current, 0)
    }

    private findMaxA() {
        return Math.max(...this.kernels.map(kernel => kernel.A))
    }

    findOptimalCoefficient(zero: Point, end: Point): Size{
        let coefficient = this.initialCoefficient
        let sumL: number = this.findSumL(coefficient.width)
        const maxA: number = this.findMaxA()
        const distX = end.x - zero.x
        const distY = end.y - zero.y
        while (distX < sumL) {
            coefficient = {
                width: Math.max(1,coefficient.width - 1),
                height: coefficient.height,
            }
            sumL = this.findSumL(coefficient.width)
        }

        coefficient = {
            width: coefficient.width,
            height: Math.abs(Math.round(distY / (maxA + (maxA))))
        }

        return coefficient
    }


    private drawKernels(ctx, zero,end){
        const coefficient = this.findOptimalCoefficient(zero, end)
        const alignCenterPoint: Point = this.getAlignCenterPoint(zero,end)
        ctx.beginPath()
        let endOfKernel: Point = alignCenterPoint
        for (const kernel of this.kernels) {
            const width = kernel.L * coefficient.width
            const height = kernel.A * coefficient.height
            ctx.rect(endOfKernel.x, endOfKernel.y + Math.round(height / 2), width, -height)
            console.log(endOfKernel.y + Math.round(height / 2), coefficient, kernel.A)
            endOfKernel = {
                x: endOfKernel.x + width,
                y: endOfKernel.y
            }
            ctx.stroke()
        }
        ctx.closePath()
    }

    private drawKernelLabels(ctx, zero, end) {
        const lengthDiagonal = (zero.y + end.y) / 3
        const length = (zero.x + end.x) / 16
        const dotRadius = 4
        const coefficient = this.findOptimalCoefficient(zero, end)
        // середина по y, начало координат по x
        let startKernel: Point = this.getAlignCenterPoint(zero,end)
        startKernel.y -= 10
        ctx.beginPath()
        ctx.strokeStyle ="lightgrey"
        ctx.fillStyle="lightgrey"
        for (const kernel of this.kernels) {
            const width = kernel.L * coefficient.width
            const height = kernel.A * coefficient.height
            const posX = startKernel.x + Math.round(width/2)
            const posY = startKernel.y
            ctx.moveTo(posX,posY)
            ctx.moveTo(posX, posY)
            ctx.lineTo(posX + Math.round(lengthDiagonal / 1.5), posY - lengthDiagonal)
            ctx.moveTo(posX+Math.round(lengthDiagonal / 1.5), posY - lengthDiagonal)
            ctx.lineTo(posX + Math.round(lengthDiagonal / 1.5) + length, posY - lengthDiagonal)
            ctx.stroke()
            startKernel.x += width
        }
        ctx.closePath()

        startKernel = this.getAlignCenterPoint(zero,end)
        ctx.beginPath()
        for (const kernel of this.kernels){
            const width = kernel.L * coefficient.width
            const posX = startKernel.x + Math.round(width/2)
            const posY = startKernel.y
            ctx.strokeStyle="black"
            ctx.strokeText(`${kernel.E === 1? "": kernel.E}E ${kernel.A === 1? "": kernel.A}A ${kernel.L === 1?"":kernel.L}L`,
                posX + Math.round(lengthDiagonal / 1.5) + (length / 2) - 16, posY - lengthDiagonal - 13)
            startKernel.x += width
        }
        ctx.closePath()
    }

    updateCallback(ctx: CanvasRenderingContext2D, zero: Point, size?: Size, end?: Point): void {
        this.drawKernels(ctx, zero, end)
        if (this.labels)
            this.drawKernelLabels(ctx, zero, end)
    }


    getAlignCenterPoint(zero: Point, end: Point) {
        return {
            x: zero.x,
            y: Math.round((zero.y + end.y) / 2)
        };
    }

    getKernels(): KernelState[] {
        return this.kernels;
    }



}