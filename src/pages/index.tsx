import styles from '../styles/Home.module.css';
import CanvasCoordinatesComponent from "../components/index/CanvasCoordinatesComponent";
import {getNewPos} from "../components/common/utils/getNewPos";
import {dotsArray} from "../test_data/dots";
import {lines} from "../test_data/lines";
import {Point} from "../components/common/types";
import {Edges} from "../components/common/edges/Edges";
import {Lines} from "../components/common/lines/Lines";
import Link from "next/link";
import DropdownMenu from "../components/common/DropdownMenu";



export default function Home() {
    return (
        <div className={styles.container}>
            <div className="text-3xl">SAPRbar 4.0</div>
            <div className={styles.description}>Работа Ерина Сергея ИДБ-20-11</div>
            <Link href={"/preprocessor"} className={styles.card}>
                <h3 className={""}>Препроцессор</h3>
            </Link>
            <Link href={"/"} className={styles.card}>
                <h3>Процессор</h3>
                <p>не готов</p>
            </Link>
            <Link href={"/"} className={styles.card}>
                <h3>Постпроцессор</h3>
                <p>не готов</p>
            </Link>
        </div>
    )
}