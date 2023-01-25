import {AbstractCompute} from "../common/other/abstract/AbstractCompute";
import {PostprocessorService} from "../service/postprocessorService";
import {PreprocessorState, ProcessorState} from "../common/types";

export class ComputePostprocessor extends AbstractCompute{
    protected service: PostprocessorService;

    constructor() {
        super();
    }

    setInputData(preprocessor: PreprocessorState, processor: ProcessorState) {
        this.service = new PostprocessorService(preprocessor, processor)
    }

    compute(): {Nx: number[][], ux: number[][], ox:number[][]} {
        return {
            Nx: this.service.calculate.Nx(),
            ux: this.service.calculate.ux(),
            ox: this.service.calculate.ox()
        }
    }

}