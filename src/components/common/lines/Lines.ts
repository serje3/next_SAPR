import {ICanvasDrawer} from "../other/interfaces/ICanvasDrawer";
import {Line, Point} from "../types";
import {CanvasDrawerDecorator} from "../other/abstract/CanvasDrawerDecorator";
import {getNewPos} from "../utils/getNewPos";

export class Lines extends CanvasDrawerDecorator implements ICanvasDrawer{
    constructor(protected readonly behaviour: ICanvasDrawer,
                private readonly lines: Line[]) {
        super();
    }

    updateCallback(ctx: CanvasRenderingContext2D, zero: Point): void {
        this.behaviour.updateCallback(ctx, zero);
        ctx.beginPath()
        ctx.strokeStyle='#18c'
        for (let i = 0; i < this.lines.length; i++) {
            const start= getNewPos(zero.x,zero.y, this.lines[i].start.x1,this.lines[i].start.x2)
            const end= getNewPos(zero.x,zero.y, this.lines[i].end.x1,this.lines[i].end.x2)
            ctx.moveTo(start.x, start.y)
            ctx.lineTo(start.x, start.y)
            this.drawLabelOnLine(ctx, i+1, start, end)
            ctx.lineTo(end.x, end.y)
        }
        ctx.stroke()
        ctx.strokeStyle=''
        ctx.closePath()
    }

    drawLabelOnLine(ctx, num: number, start: Point, end: Point) {
        ctx.strokeText(`${num}`, Math.round((start.x + end.x) / 2) + 5, Math.round((start.y + end.y) / 2) - 5)
    }
}