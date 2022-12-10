import CanvasCoordinatesComponent from "../../components/index/CanvasCoordinatesComponent";
import styles from "../../styles/Home.module.css";
import {Lines} from "../../components/common/lines/Lines";
import {Edges} from "../../components/common/edges/Edges";
import {dotsArray} from "../../test_data/dots";
import {lines} from "../../test_data/lines";
import Link from "next/link";
import {useAppSelector} from "../../hooks";

const getDataStr = (dataObj) => "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataObj))

export default function Preprocessor() {
    const selector = useAppSelector(state => state)


    return <div className={styles.container}>
        <Link href={"/"} className={styles.card}>
            <h3>Вернуться</h3>
        </Link>
        <Link href={"/preprocessor/kernel"} className={styles.card}>
            <h3>Стержни</h3>
        </Link>
        <Link href={"/preprocessor/image"} className={styles.card}>
            <h3>Перейти к представлению</h3>
        </Link>
        <a href={getDataStr(selector)} download={"pizda.json"} className={styles.card}>Скачать файлы проекта</a>
    </div>
}