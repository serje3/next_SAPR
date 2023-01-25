import {AllLoadStates, KernelState, Load, SupportState} from "../common/types";
import {inv, matrix, multiply} from "mathjs";
import {IService} from "../common/other/interfaces/IService";

export class ProcessorService implements IService {
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

    private getSupports() {
        return [this.supports.find(support => support?.leftSide), this.supports.find(support => !support?.leftSide)]
    }

    private ACalculate(): number[][] {
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
            console.log('K=', K, i)
            if (i == A.length - 2) {
                A[i + 1][i + 1] = K
            }
            A[i][i] = K + lastDiagK
            lastDiagK = K
            console.log(lastK, -K, i, i + 1)

            A[i][i + 1] = -K
            A[i + 1][i] = -K
            lastK = K
        })

        const [leftSupport, rightSupport] = this.getSupports()

        if (leftSupport) {
            A.forEach((_, i) => {
                console.log(i)
                A[0][i] = 0
                A[i][0] = 0
            })
            A[0][0] = 1
        }

        if (rightSupport) {
            const id = rightSupport.kernelId + 1
            for (let i = id; i > 0; i--) {
                A[id][i] = 0
                A[i][id] = 0
            }
            A[id][id] = 1
        }
        console.log('A=', A)

        return A
    }

    private bCalculate(): number[] {
        const concentrated = this.loads.filter(value => value.loadType === Load.Concentrated)
        const distributed = this.loads.filter(value => value.loadType === Load.Distributed)
        const b: number[] = new Array(this.kernels.length + 1).fill(0)
        const Q: number[] = new Array(this.kernels.length).fill(0);
        const L: number[] = [...this.kernels.map(kernel => kernel.L)]
        const F = new Array(this.kernels.length + 1).fill(0).map((_, i) => {
            const load = concentrated.find(load => load.id === i)
            return load ? load.value : 0
        })
        for (const load of distributed) {
            Q[load.id] = load.value
        }
        console.log('Q', Q, L)
        for (let i = 0; i < b.length; i++) {

            if (i === 0) {
                b[i] = F[i] + Q[i] * L[0] / 2
            } else if (i === b.length - 1) {
                b[i] = F[i] + Q[i - 1] * L[i - 1] / 2
            } else {
                b[i] = F[i] + (Q[i - 1] * L[i - 1] / 2) + (Q[i] * L[i] / 2)
            }
            console.log(b)
        }

        const [left, right] = this.getSupports()
        if (left)
            b[0] = 0
        if (right)
            b[b.length - 1] = 0

        return b
    }

    private deltaCalculate(): number[] {
        const A = this.calculate.A()
        const b = matrix(this.calculate.b())
        console.log(A, b)
        const inverse = inv(matrix(A))
        const x = multiply(inverse, b)
        const result = []
        x.forEach(v => result.push(v))
        return result
    }
}
