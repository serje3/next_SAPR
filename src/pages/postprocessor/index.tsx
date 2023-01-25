import styles from '../../styles/Home.module.css';
import Link from "next/link";
import {usePreprocessorState, useProcessorState} from "../../hooks";

export default function Postprocessor() {
    const lines = usePreprocessorState().lines
    const procEnded = useProcessorState().b.length !== 0
    return (
        <div className={styles.container}>
            <Link href={"/"} className={styles.card}>
                <h3>Вернуться</h3>
            </Link>
            {
                (lines.length!== 0 && procEnded)?(<>
                    <Link href={"/postprocessor/loads-kernel"} className={styles.card}>
                        <h3>Посмотреть результаты расчётов Nx, Ux, ox</h3>
                    </Link>
                    <Link href={"/postprocessor/concrete"} className={styles.card}>
                        <h3>Посмотреть результаты расчётов Nx, Ux, ox на конкретной точке</h3>
                    </Link></>):"Сначала посчитайте процессор"
            }

        </div>
    )
}