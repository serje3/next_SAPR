import {ICanvasDrawer} from "../other/interfaces/ICanvasDrawer";
import {KernelState, Point, Size} from "../types";
import {getNewPos} from "../utils/getNewPos";

export class Kernels implements ICanvasDrawer {
    private initialCoefficient = {
        width: 100,
        height: 30
    }

    constructor(private readonly kernels: KernelState[]) {
    }

    private findSumL(width) {
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
            height: Math.abs(Math.round(distY / (maxA - (maxA / 8))))
        }

        return coefficient
    }

    updateCallback(ctx: CanvasRenderingContext2D, zero: Point, size?: Size, end?: Point): void {
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


    getAlignCenterPoint(zero: Point, end: Point) {
        return {
            x: zero.x,
            y: Math.round((zero.y + end.y) / 2)
        };
    }
}