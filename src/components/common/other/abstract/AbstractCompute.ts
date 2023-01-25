import {IService} from "../interfaces/IService";

export abstract class AbstractCompute {
    protected abstract service: IService;
    abstract compute(): {[p:string]:any}
}