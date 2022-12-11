import {AllLoadStates, KernelState, PreprocessorState, SupportState} from "../common/types";

export class ComputeProcessor {
    private loads: AllLoadStates;
    private kernels: KernelState[];
    private supports: SupportState[];
    set preprocessor(preprocessor: PreprocessorState) {
        this.supports = preprocessor.supports;
        this.loads = preprocessor.loads;
        this.kernels = preprocessor.lines;
    }

    compute(){
        return {
            A: this.ACalculate()
        }
    }

    private ACalculate(): number[][]{
        const A: number[][] = new Array<number[]>(this.kernels.length)
            .fill([])
            .map(()=>new Array<number>(this.kernels.length).fill(0))

        console.log(A)

        for (let i = 0; i < this.kernels.length; i++) {

        }

        return [[]]
    }
}