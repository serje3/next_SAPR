import {AbstractCompute} from "../common/other/abstract/AbstractCompute";
import {PostprocessorService} from "../service/postprocessorService";
import {PreprocessorState, ProcessorState} from "../common/types";
import {ProcessorService} from "../service/processorService";

export class ComputePostprocessor extends AbstractCompute{
    protected service: PostprocessorService;

    constructor() {
        super();
    }

    setInputData(preprocessor: PreprocessorState, processor: ProcessorState) {
        this.service = new PostprocessorService(preprocessor, processor)
    }

    compute() {
    }

}