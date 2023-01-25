import styles from "../../styles/Home.module.css";
import Link from "next/link";
import {usePreprocessorState} from "../../hooks";

export default function Processor(){
    const lines = usePreprocessorState().lines
    return (
        <div className={styles.container}>
            <Link href={"/"} className={styles.card}>
                <h3>Вернуться</h3>
            </Link>
            {lines.length !== 0? <>
            <Link href={"/processor/compute"} className={styles.card}>
                <h3>Вычислить</h3>
            </Link></>:"Сначала посчитайте препроцессор"}
        </div>
        )
}