import {PreprocessorState, SupportState} from "../common/types";
import {ProcessorService} from "../../pages/processor/service/processorService";

export class ComputeProcessor {
    private processorService: ProcessorService;


    set preprocessor(preprocessor: PreprocessorState) {
        this.processorService = new ProcessorService(preprocessor.lines,preprocessor.loads,preprocessor.supports)
    }

    compute() {
        return {
            A: this.processorService.calculate.A(),
            b: this.processorService.calculate.b(),
        }
    }
}