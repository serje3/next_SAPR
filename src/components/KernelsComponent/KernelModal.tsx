import {changeKernel} from "../../redux/actions/preprocessor";
import {useAppDispatch} from "../../hooks";

export function KernelModal({showKernelModal, currentLine, setLine, }) {
    const dispatch = useAppDispatch()
    return showKernelModal ?
                <form className="modal_window" onSubmit={(event) => {
                    event.preventDefault()
                    const new_line = new FormData(event.target as HTMLFormElement)
                    dispatch(changeKernel({
                        index: currentLine.id,
                        line: {
                            A: parseInt(new_line.get("A") as string),
                            E: parseInt(new_line.get("E") as string),
                            L: parseInt(new_line.get("L") as string)
                        }
                    }))
                }}>
                    <div className="close" onClick={() => setLine(null)}>X</div>
                    <div>
                        <input type="number" name="A" className="coefficient-input"
                               defaultValue={currentLine.line.A} maxLength={1} id={currentLine.id + "-A"}/>
                        <label htmlFor={currentLine.id + "-A"}>A</label>
                    </div>
                    <div>
                        <input type="number" name="E" className="coefficient-input"
                               defaultValue={currentLine.line.E} maxLength={1} id={currentLine.id + "-E"}/>
                        <label htmlFor={currentLine.id + "-E"}>E</label>
                    </div>
                    <div>
                        <input type="number" name="L" className="coefficient-input"
                               defaultValue={currentLine.line.L} maxLength={1} id={currentLine.id + "-L"}/>
                        <label htmlFor={currentLine.id + "-L"}>L</label>
                    </div>
                    <button type="submit">Сохранить</button>
                </form> : null
}