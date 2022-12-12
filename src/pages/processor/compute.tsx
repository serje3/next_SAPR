import styles from "../../styles/Home.module.css";
import Link from "next/link";
import {ComputeProcessor} from "../../components/processor/computeProcessor";
import {usePreprocessorState} from "../../hooks";

export default function Compute(){

    const preprocessor = usePreprocessorState()

    const processor = new ComputeProcessor()
    processor.preprocessor = preprocessor
    console.log(processor.compute().b)

    return (
        <div className={styles.container}>
            <Link href={'/processor'} className={styles.card}>
                <h3>Вернуться</h3>
            </Link>
            <div className={styles.card}>
                <h3>Процессор завершил вычисления</h3>
            </div>
        </div>
    )
}