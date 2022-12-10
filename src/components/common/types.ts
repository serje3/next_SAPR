export type Point = {
    x: number
    y: number
}
export type Size = {
    width: number,
    height: number
}
export type Edge = {
    x1: number,
    x2: number
}

export type Line = { start: Edge, end: Edge }


export type KernelState = {
    L: number,
    A: number,
    E: number
}

export type SupportState = {
    kernelId: number,
    leftSide: boolean
}