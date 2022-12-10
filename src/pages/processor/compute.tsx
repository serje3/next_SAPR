import styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function Compute(){
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