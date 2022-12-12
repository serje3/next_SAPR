import {AllLoadStates, KernelState, Load, SupportState} from "../../../components/common/types";
import {type} from "os";

export class ProcessorService {
    constructor(private kernels: KernelState[],
                private loads: AllLoadStates,
                private supports: SupportState[]) {
    }
    get calculate() {
        return {
            A: () => this.ACalculate(),
            b: () => this.bCalculate()
        }
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

        const leftSupport = this.supports.find(support => support?.leftSide)
        const rightSupport = this.supports.find(support => !support?.leftSide)

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
        const Q: [number,number][] = new Array(this.kernels.length).fill([0,0]);
        for (const load of distributed) {
            const kernel = this.kernels[load.id]
            Q[load.id] = [load.value * kernel.L / 2, load.value * kernel.L / 2 ]
        }
        const F = new Array(this.kernels.length + 1).fill(0).map((_,i) => {
            const load = concentrated.find(load => load.id === i)
            return load?load.value:0
        })
        const b = []
        console.log(Q, F)
        b.push(-Q[0][0] + F[0])
        for (let i = 1; i < this.kernels.length; i++) {
            b.push(-Q[i - 1][1] - Q[i][0] + F[i])
        }
        b.push(-Q.slice(-1)[0][1] + F.slice(-1)[0])

        return b
    }
}