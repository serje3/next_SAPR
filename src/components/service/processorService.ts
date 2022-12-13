import {AllLoadStates, KernelState, Load, SupportState} from "../common/types";
import {matrix, inv, multiply} from "mathjs";
import {IService} from "../common/other/interfaces/IService";

export class ProcessorService implements IService{
    constructor(private kernels: KernelState[],
                private loads: AllLoadStates,
                private supports: SupportState[]) {
    }
    get calculate() {
        return {
            A: () => this.ACalculate(),
            b: () => this.bCalculate(),
            delta: () => this.deltaCalculate()
        }
    }

    private getSupports(){
        return [this.supports.find(support => support?.leftSide), this.supports.find(support => !support?.leftSide)]
    }

    private ACalculate(): number[][]{
        const A: number[][] = new Array<number[]>(this.kernels.length + 1)
            .fill([])
            .map(() => new Array<number>(this.kernels.length + 1).fill(0))

        let lastDiagK = 0
        let lastK = null

        const __A = A.map(a => [...a.slice(0, a.length - 1)]).slice(0, A.length - 1)

        __A.forEach((arr, i) => {
            const E = this.kernels[i].E
            const L = this.kernels[i].L
            const _A = this.kernels[i].A
            const K = (E * _A) / L
            if (i == A.length - 1){
                A[i][i] = K
                return
            }
            A[i][i] = K + lastDiagK
            lastDiagK = K
            A[i][i+1] = lastK?lastK:-K
            A[i+1][i] = lastK?lastK:-K
            lastK = K
        })

        const [leftSupport,rightSupport] = this.getSupports()

        if (leftSupport){
            A[0][0] = 1
            A[0][1] = 0
            A[1][0] = 0
        }

        if (rightSupport){
            const id = rightSupport.kernelId + 1
            A[id][id] = 1
            A[id][id - 1] = 0
            A[id - 1][id] = 0
        }

        return A
    }
    private bCalculate(): number[]{
        const concentrated = this.loads.filter(value => value.loadType === Load.Concentrated)
        const distributed = this.loads.filter(value => value.loadType === Load.Distributed)
        const b: number[] = new Array(this.kernels.length + 1).fill(0)
        const Q: number[] = new Array(this.kernels.length).fill(0);
        const L: number[] = [this.kernels[0].L, ...this.kernels.map(kernel => kernel.L)]
        const F = new Array(this.kernels.length + 1).fill(0).map((_,i) => {
            const load = concentrated.find(load => load.id === i)
            return load?load.value:0
        })
        for (const load of distributed) {
            Q[load.id] += load.value
            if (load.id !== Q.length - 1)
                Q[load.id + 1] += load.value
        }
        for (let i = 0; i <b.length; i++) {
            if (i==0){
                // console.log(b, 'F=',F[i],'Q=', Q[i], 'L=',L[i], 'для i=',i)
                b[i] = F[0] + Q[0] * L[0] / 2
                b[i + 1] = Q[0] + L[0] / 2
                // console.log('после = ',b)
            } else if(i === this.kernels.length){
                // console.log(b, 'F=',F[i],'Q=', Q[i-1], 'L=',L[i], 'для i=',i)
                b[i] = F[i]
                b[i] += Q[i-1] * L[i] / 2
                // console.log('после = ',b)
            } else {
                // console.log(b, 'F=',F[i],'Q=', Q[i], 'L=',L[i], 'для i=',i)
                b[i] = F[i] + Q[i] * L[i] / 2
                b[i + 1] = Q[i] * L[i] / 2
                // console.log('после = ',b)
            }
        }

        const [left,right] = this.getSupports()
        if (left)
            b[0] = 0
        if (right)
            b[b.length - 1] = 0

        return b
    }

    private deltaCalculate(): number[] {
        const A = this.calculate.A()
        const b = this.calculate.b()
        const inverse = inv(matrix(A))
        const x = multiply(inverse,b)
        const result = []
        x.forEach(v=>result.push(v))
        return result
    }
}