import CanvasCoordinatesComponent from "../../components/index/CanvasCoordinatesComponent";
import styles from "../../styles/Preprocessor.module.css";
import homeStyles from "../../styles/Home.module.css";
import {Lines} from "../../components/common/lines/Lines";
import {Edges} from "../../components/common/edges/Edges";
import {dotsArray} from "../../test_data/dots";
import {lines} from "../../test_data/lines";
import Link from "next/link";
import {Kernels} from "../../components/common/kernels/Kernels";
import {useAppSelector, usePreprocessorState} from "../../hooks";
import {Supports} from "../../components/common/supports/Supports";
import {Loads} from "../../components/common/loads/Loads";

export default function ImageConstruction() {
    const preprocessor = usePreprocessorState()
    const kernels = preprocessor.lines
    const supports = preprocessor.supports
    const loads = preprocessor.loads

    const canvasDrawer =
        new Loads(
            new Supports(new Kernels(kernels),
                supports),
            loads)


    return (
        <div className={homeStyles.container}>
            <Link href={'/preprocessor'} className={homeStyles.card}>
                <h3>Вернуться</h3>
            </Link>
            <div className={homeStyles.card}>
                <CanvasCoordinatesComponent className={styles['home-canvas']}
                                            width={900}
                                            height={500}
                                            canvasDrawer={canvasDrawer}/>
            </div>
        </div>
    )
}