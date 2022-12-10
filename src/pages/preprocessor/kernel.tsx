import styles from "../../styles/Home.module.css";
import {DropdownMenu} from "../../components/common/DropdownMenu";
import {addKernel, changeKernel, setSupports} from "../../redux/actions/preprocessor";
import {useAppDispatch, useAppSelector, usePreprocessorState} from "../../hooks";
import {KernelState, SupportState} from "../../components/common/types";
import Link from "next/link";
import {useState} from "react";
import {KernelModal} from "../../components/KernelsComponent/KernelModal";
import {SupportModal} from "../../components/KernelsComponent/SupportModal";
import {LoadModal} from "../../components/KernelsComponent/LoadModal";


export default function Kernel() {
    const [currentLine, setLine] = useState<{ line: KernelState, id: number }>(null)
    const [showSupportModal, setShowSupport] = useState<boolean>(false)
    const [showLoadModal, setShowLoad] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const lines = usePreprocessorState().lines

    const DropdownList = [
        {
            name: "Добавить стержень",
            callback: () => dispatch(addKernel({A: 1, E: 1, L: 1}))
        },
        {
            name: "Выбрать опоры",
            callback: () => setShowSupport(true)
        },
        {
            name: "Нагрузки",
            callback: () => setShowLoad(true)
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
            <KernelModal showKernelModal={currentLine !== null} currentLine={currentLine} setLine={(state)=>setLine(state)}/>
            <SupportModal showSupportModal={showSupportModal} setShowSupport={(state)=>setShowSupport(state)} lines={lines}/>
            <LoadModal showLoadModal={showLoadModal} setShowLoad={(state)=>setShowLoad(state)} lines={lines}/>
            <div className={"wrapper p-5 " + styles.container}>
                <DropdownMenu className={"dropdown"} properties={DropdownList} title={"Действия"}/>
                <Link className={styles.card} href={"/preprocessor"}><h3>Вернуться</h3></Link>
                {/*Номер стержня и настройки*/}
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