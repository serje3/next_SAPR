import {Line} from "../components/common/types";
import {dotsArray} from "./dots";

export const lines: Line[] = [
    {start: dotsArray[0], end: dotsArray[1]},
    {start: dotsArray[1], end: dotsArray[2]},
    {start: dotsArray[2], end: dotsArray[3]},
    {start: dotsArray[3], end: dotsArray[8]},
    {start: dotsArray[8], end: dotsArray[4]},
    {start: dotsArray[4], end: dotsArray[5]},
    {start: dotsArray[6], end: dotsArray[7]},
    {start: dotsArray[7], end: dotsArray[9]},
    {start: dotsArray[9], end: dotsArray[0]},
    // {start: dotsArray[7], end: dotsArray[8]},
]