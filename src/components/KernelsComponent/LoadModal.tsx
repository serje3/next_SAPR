import {ConcentratedLoad, DistributedLoad, KernelState, Load} from "../common/types";
import {useAppDispatch, usePreprocessorState} from "../../hooks";
import {setLoads} from "../../redux/actions/preprocessor";

export function LoadModal({showLoadModal, setShowLoad, lines}) {
    // Сосредоточенные для узлов
    // Распределнные для стержней
    const loads = usePreprocessorState().loads
    const distributedLoads: DistributedLoad[] = loads.filter(load => load.loadType === Load.Distributed) as DistributedLoad[]
    const concentratedLoads: ConcentratedLoad[] = loads.filter(load => load.loadType === Load.Concentrated) as ConcentratedLoad[]
    // Массив узлов это количество стержней + 1
    const edges = (lines as KernelState[]).map((_, id) => id)
    edges.length !== 0?edges.push(lines.length):null
    // ------

    const dispatch = useAppDispatch()


    return showLoadModal ? <form className="modal_window" onSubmit={(event) => {
        event.preventDefault()
        const new_line = new FormData(event.target as HTMLFormElement)
        const loads: (DistributedLoad | ConcentratedLoad)[] = []
        for (const line of new_line.entries()) {
            const key = line[0]
            const id: number = parseInt(key.split('-')[0])
            const type: Load = parseInt(key.split('-')[1])
            const value = parseInt(line[1] as string)
            console.log(value)
            if (!isNaN(value))
                loads.push({id: id, loadType: type, value})
        }
        dispatch(setLoads(loads))

    }}>
        <div className="close" onClick={() => setShowLoad(false)}>X</div>
        <fieldset>
            <legend>Сосредоточенные нагрузки</legend>
            {edges.map(edgeId => {
                const load = concentratedLoads.find(load=> load.id === edgeId)?.value
                const defaultLoad = isNaN(load)? null: load
                return(
                    <div key={edgeId}>
                        <input type="number" name={edgeId + "-" + Load.Concentrated} className="load-input"
                               defaultValue={defaultLoad} maxLength={2} id={edgeId + "-ql"} width={'2rem'}/>
                        <label htmlFor={edgeId + "-ql"}>ql - {edgeId + 1} узел</label>
                    </div>
                )
            })}
        </fieldset>
        <fieldset>
            <legend>Распределенные нагрузки</legend>
            {lines.map((_, kernelId) => {
                const load = distributedLoads.find(load => load.id === kernelId)?.value
                const defaultLoad = isNaN(load)? null: load
                return(
                    <div key={kernelId}>
                        <input type="number" name={kernelId + "-" + Load.Distributed} className="load-input"
                               defaultValue={defaultLoad} maxLength={2} id={kernelId + "-q"}/>
                        <label htmlFor={kernelId + "-q"}>q - {kernelId + 1} стержень</label>
                    </div>
                )
            })}
        </fieldset>
        <button type="submit">Сохранить</button>
    </form> : null
}