import styles from "../../styles/Home.module.css";
import Link from "next/link";
import {ComputeProcessor} from "../../components/processor/computeProcessor";
import {useAppDispatch, usePreprocessorState} from "../../hooks";
import {ProcessorState} from "../../components/common/types";
import {useEffect} from "react";
import {SetComputed} from "../../redux/actions/processor";

export default function Compute() {

    const preprocessor = usePreprocessorState()
    const dispatch = useAppDispatch()
    const processor = new ComputeProcessor()
    processor.preprocessor = preprocessor
    let data: ProcessorState = {A:null, b:null, delta:null}
    if (preprocessor.lines.length !== 0)
        data = processor.compute()

    useEffect(()=>{
        dispatch(SetComputed(data))
    },[])

    return (
        <div className={styles.container}>
            <Link href={'/processor'} className={styles.card}>
                <h3>Вернуться</h3>
            </Link>
            <div className={styles.card}>
                <h3>Процессор завершил вычисления</h3>
                <div>A={data.A.map((v,i)=><div key={i}>{v.join(', ')}</div>)}</div>
                <div>b={data.b.join(', ')}</div>
                <div>delta={data.delta.join(',')}</div>
            </div>
        </div>
    )
}