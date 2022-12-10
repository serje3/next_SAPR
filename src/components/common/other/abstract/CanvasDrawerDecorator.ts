import {ICanvasDrawer} from "../interfaces/ICanvasDrawer";

export abstract class CanvasDrawerDecorator {
    protected readonly abstract behaviour: ICanvasDrawer
}