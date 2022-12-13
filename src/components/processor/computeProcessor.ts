import {PreprocessorState, SupportState} from "../common/types";
import {ProcessorService} from "../service/processorService";
import {AbstractCompute} from "../common/other/abstract/AbstractCompute";

export class ComputeProcessor extends AbstractCompute{
    protected service: ProcessorService;


    set preprocessor(preprocessor: PreprocessorState) {
        this.service = new ProcessorService(preprocessor.lines,preprocessor.loads,preprocessor.supports)
    }

    compute() {
        return {
            A: this.service.calculate.A(),
            b: this.service.calculate.b(),
            delta: this.service.calculate.delta()
        }
    }
}