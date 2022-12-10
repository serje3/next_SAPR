import {Point, Size} from "../../types";

export interface ICanvasDrawer {
    updateCallback: (ctx: CanvasRenderingContext2D, zero: Point, size?: Size, end?: Point) => void
}
