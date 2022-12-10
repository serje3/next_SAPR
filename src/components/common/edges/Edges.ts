import {ICanvasDrawer} from "../other/interfaces/ICanvasDrawer";
import {Edge, Point} from "../types";
import {dotsArray} from "../../../test_data/dots";
import {getNewPos} from "../utils/getNewPos";

export class Edges implements ICanvasDrawer {
    get dots(): { x1: number; x2: number }[] {
        return this._dots;
    }

    constructor(private readonly _dots: Edge[]) {
    }

    updateCallback(ctx: CanvasRenderingContext2D, zero: Point): void {
        ctx.beginPath()
        ctx.fillStyle = '#18ab3c'
        ctx.strokeStyle = '#120'
        for (let i = 0; i < this._dots.length; i++) {
            const {x, y} = getNewPos(zero.x, zero.y, dotsArray[i].x1, dotsArray[i].x2)
            ctx.moveTo(x, y)
            ctx.strokeText(`${i + 1}`, x + 10, y)
            ctx.arc(x, y, 5, 0, 2 * Math.PI)
        }
        ctx.strokeStyle = ""
        ctx.fill()
        ctx.fillStyle = ""
        ctx.closePath()
    }
}