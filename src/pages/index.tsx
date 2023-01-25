import styles from '../styles/Home.module.css';
import Link from "next/link";


export default function Home() {
    return (
        <div className={styles.container}>
            <div className="text-3xl">ТОЧНО НЕ SAPRbar 4.0</div>
            <div className={styles.description}>Работа Ерина Сергея ИДБ-20-11</div>
            <Link href={"/preprocessor"} className={styles.card}>
                <h3 className={""}>Препроцессор</h3>
            </Link>
            <Link href={"/processor"} className={styles.card}>
                <h3>Процессор</h3>
            </Link>
            <Link href={"/postprocessor"} className={styles.card}>
                <h3>Постпроцессор</h3>
            </Link>
        </div>
    )
}
