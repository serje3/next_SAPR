import CanvasCoordinatesComponent from "../../components/index/CanvasCoordinatesComponent";
import styles from "../../styles/Home.module.css";
import {Lines} from "../../components/common/lines/Lines";
import {Edges} from "../../components/common/edges/Edges";
import {dotsArray} from "../../test_data/dots";
import {lines} from "../../test_data/lines";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {crypto} from "next/dist/compiled/@edge-runtime/primitives/crypto";
import {_setPreprocessor} from "../../redux/actions/preprocessor";

const getDataStr = (dataObj) => "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataObj))

export default function Preprocessor() {
    const selector = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const getUUID = () => crypto.randomUUID().slice(0, 5)

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
        <a href={getDataStr(selector)} download={"sapr_" + getUUID() + ".json"} className={styles.card}>Скачать файлы
            проекта</a>
        <div className={styles.card}>
            <p>Загрузить файл проекта</p>
            <input  type="file" accept=".json" onInput={(ev) => {
                const file = (ev.target as HTMLInputElement).files[0]
                const reader = new FileReader()
                reader.readAsText(file)
                reader.onload = () => {
                    const reduxStore = JSON.parse(reader.result as string)

                    dispatch(_setPreprocessor(reduxStore.preprocessor))
                }
            }}/>
        </div>
    </div>
}