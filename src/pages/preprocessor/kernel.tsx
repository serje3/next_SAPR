import styles from "../../styles/Home.module.css";
import {DropdownMenu} from "../../components/common/DropdownMenu";
import {addKernel, changeKernel, setSupports} from "../../redux/actions/preprocessor";
import {useAppDispatch, useAppSelector, usePreprocessorState} from "../../hooks";
import {KernelState, SupportState} from "../../components/common/types";
import Link from "next/link";
import {useState} from "react";


export default function Kernel() {

    const [currentLine, setLine] = useState<{ line: KernelState, id: number }>(null)
    const [showSupportModal, setShowSupport] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const lines = usePreprocessorState().lines

    const DropdownList = [
        {
            name: "Добавить стержень",
            callback: () => dispatch(addKernel({A: 0, E: 0, L: 0}))
        },
        {
            name: "Выбрать опоры",
            callback: () => setShowSupport(true)
        }
    ]

    const getSettingsList = (index: number) => [
        {
            name: "Параметры стержня",
            callback: () => {
                setLine({line: lines[index], id: index})
            }
        }

    ]

    return (
        <>
            {
                currentLine !== null ?
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

            {showSupportModal ?
                <form className="modal_window" onSubmit={(event) => {
                    event.preventDefault()
                    const supports = new FormData(event.target as HTMLFormElement)
                    const left = supports.get("left") === "on"
                    const right = supports.get("right") === "on"
                    dispatch(setSupports({
                        left: left ? {kernelId: 0, leftSide: left} : null,
                        right: right ? {kernelId: lines.length - 1, leftSide: !right} : null
                    }))
                }}>
                    <div className="close" onClick={() => setShowSupport(false)}>X</div>
                    <div>
                        <input type="checkbox" name={'left'} id="left-side"/>
                        <label htmlFor="left-side">Опора слева</label>
                    </div>
                    <div>
                        <input type="checkbox" name={'right'} id="right-side"/>
                        <label htmlFor="right-side">Опора справа</label>
                    </div>
                    <button type="submit">Сохранить</button>
                </form> : null
            }

            <div className={"wrapper p-5 " + styles.container}>
                <DropdownMenu className={"dropdown"} properties={DropdownList} title={"Действия"}/>
                <Link className={styles.card} href={"/preprocessor"}><h3>Вернуться</h3></Link>
                {lines.map((line: KernelState, key) => {
                    return <div key={key} className={"kernel " + styles.card}>
                        <h3>Стержень {1 + key}</h3>
                        <DropdownMenu title={"Настройки"} properties={getSettingsList(key)}/>
                    </div>
                })}
            </div>
        </>
    )
}