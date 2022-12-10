import React from "react";
import {Point} from "../common/types";
import {ICanvasDrawer} from "../common/other/interfaces/ICanvasDrawer";


type CanvasProps = {
    width?: number,
    height?: number,
    className?: string,
    canvasDrawer?: ICanvasDrawer
}


export default class CanvasCoordinatesComponent extends React.Component<CanvasProps> {
    private readonly canvasRef: React.RefObject<HTMLCanvasElement>;
    private posX: number;
    private posY: number;
    private endPosX: number;
    private endPosY: number;

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef()
    }

    componentDidMount() {
        this.endPosX = Math.round(this.canvasRef.current.width / 2 + this.canvasRef.current.width / 3)
        this.endPosY = Math.round(this.canvasRef.current.height / 2 - this.canvasRef.current.height / 3)
        this.posX = Math.round(this.canvasRef.current.width / 2 - this.canvasRef.current.width / 3)
        this.posY = Math.round(this.canvasRef.current.height / 2 + this.canvasRef.current.height / 3)
        this.updateCanvas();

    }

    updateCanvas() {
        const ctx = this.canvasRef.current.getContext('2d');
        // ctx.lineWidth = 5
        this.props.canvasDrawer?.updateCallback(ctx, {x: this.posX, y: this.posY}, {
                width: this.props?.width | 0, height: this.props?.height | 0
            },
            {x:this.endPosX, y: this.endPosY})
    }

    render() {
        return (
            <canvas ref={this.canvasRef}
                    className={this.props.className}
                    width={this.props.width}
                    height={this.props.height}/>
        );
    }
}