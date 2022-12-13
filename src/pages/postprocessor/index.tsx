import styles from '../../styles/Home.module.css';
import Link from "next/link";

export default function Postprocessor() {
    return (
        <div className={styles.container}>
            <Link href={"/"} className={styles.card}>
                <h3>Вернуться</h3>
            </Link>
            <Link href={"/postprocessor/loads-kernel"} className={styles.card}>
                <h3>Посмотреть результаты расчётов Nx, Ux, ox</h3>
            </Link>
        </div>
    )
}