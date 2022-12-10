import {Point} from "../types";

const coef = 90
export const getNewPos = (currentX, currentY, toX, toY): Point => {
    // Return point ready for coordinates
    return {x:(currentX + (toX * coef)),y:(currentY + (-toY * coef))}
}