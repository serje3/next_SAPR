import {IService} from "../common/other/interfaces/IService";
import {AllLoadStates, KernelState, PreprocessorState, ProcessorState, SupportState} from "../common/types";

export class PostprocessorService implements IService{
    private kernels: KernelState[]
    private loads: AllLoadStates
    private supports: SupportState[]
    private A: number[][]
    private b: number[]
    private delta: number[]
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
            Nx: () => {}
        }
    };


    private getNx(){

    }
}