import styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function Processor(){
    return (
        <div className={styles.container}>
            <Link href={"/"} className={styles.card}>
                <h3>Вернуться</h3>
            </Link>
            <Link href={"/processor/compute"} className={styles.card}>
                <h3>Вычислить</h3>
            </Link>
        </div>
        )
}