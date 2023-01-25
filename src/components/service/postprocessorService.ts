import {IService} from "../common/other/interfaces/IService";
import {AllLoadStates, KernelState, Load, PreprocessorState, ProcessorState, SupportState} from "../common/types";

export class PostprocessorService implements IService{
    private kernels: KernelState[]
    private loads: AllLoadStates
    private supports: SupportState[]
    private A: number[][]
    private b: number[]
    private readonly delta: number[]
    constructor(preprocessor: PreprocessorState, processor: ProcessorState) {
        this.kernels = preprocessor.lines
        this.loads = preprocessor.loads
        this.supports = preprocessor.supports
        this.A = processor.A
        this.b = processor.b
        this.delta = processor.delta
    }

    get calculate(){
        return {
            Nx: () => this.getNx(),
            ux: () => this.getUx(),
            ox: () => this.getox()
        }
    };


    private getNx(){
        return [this.Nx(0), this.Nx(-1, true)]
    }

    private getUx(){
        return [this.Ux(0), this.Ux(-1,true)]
    }

    private getox(){
        return [this.ox(0), this.ox(-1,true)]
    }


    Nx(x, useL=false){
        const distributed = this.loads.filter(load => load.loadType === Load.Distributed)
        const Q: number[] = new Array(this.kernels.length).fill(0);
        for (const load of distributed) {
            Q[load.id] += load.value
            // if (load.id !== Q.length - 1)
            //     Q[load.id + 1] += load.value
        }
        const delta = this.delta
        return this.kernels.map((kernel,i)=>
            (kernel.E * kernel.A / kernel.L) * (delta[i+1]-delta[i]) + (Q[i]*kernel.L / 2)*(1-2*(
                (useL?kernel.L:x)/kernel.L)))
    }
    Ux(x, useL=false){
        const distributed = this.loads.filter(load => load.loadType === Load.Distributed)
        const Q: number[] = new Array(this.kernels.length).fill(0);
        for (const load of distributed) {
            Q[load.id] += load.value
            // if (load.id !== Q.length - 1)
            //     Q[load.id + 1] += load.value
        }
        const delta = this.delta
        return this.kernels.map((kernel,i)=>{
            x = useL?kernel.L:x
            return delta[i] + (x/kernel.L) *(delta[i+1]-delta[i])
                +((Q[i]*Math.pow(kernel.L, 2)/(2*kernel.E*kernel.A))*x/kernel.L)*(1 - x/kernel.L)
        })
    }

    ox(x, useL=false){
        const Nx = this.Nx(x, useL)
        return this.kernels.map((kernel,i)=>{
            return Nx[i]/kernel.A
        })
    }
}