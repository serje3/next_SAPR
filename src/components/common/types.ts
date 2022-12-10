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

export enum Load {
    Distributed,
    Concentrated
}

export type DistributedLoad = LoadState<Load.Distributed>
export type ConcentratedLoad = LoadState<Load.Concentrated>

export type LoadState<T> = {
    id: number
    value: number
    loadType: T
}

export type AllLoadStates = (DistributedLoad|ConcentratedLoad)[]