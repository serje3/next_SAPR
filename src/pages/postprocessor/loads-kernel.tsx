import styles from '../../styles/Home.module.css';
import {ComputePostprocessor} from "../../components/postprocessor/computePostprocessor";
import {usePreprocessorState, useProcessorState} from "../../hooks";
import Link from "next/link";

export default function LoadsKernel(){
    const preprocessor = usePreprocessorState()
    const processor = useProcessorState()
    const computePostprocessor = new ComputePostprocessor()
    computePostprocessor.setInputData(preprocessor, processor)
    const result = computePostprocessor.compute()
    return (
        <div className={styles.container}>
            <Link href={"/postprocessor"} className={styles.card}>
                <h3>Вернуться</h3>
            </Link>
            <div className={styles.card}>
                <h1>Nx</h1>
                <table className="table-fixed">
                    <thead>
                    <tr>
                        <th>0</th>
                        <th>L</th>
                    </tr>
                    </thead>
                    <tbody>
                        {result.Nx[0].map((v,i)=>
                            <tr key={i}><td>{result.Nx[0][i].toFixed(2)}</td><td>{result.Nx[1][i].toFixed(2)}</td></tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div className={styles.card}>
                <h1>Ux</h1>
                <table className="table-fixed">
                    <thead>
                    <tr>
                        <th>0</th>
                        <th>L</th>
                    </tr>
                    </thead>
                    <tbody>
                        {result.ux[0].map((v,i)=>
                            <tr key={i}><td>{result.ux[0][i].toFixed(2)}</td><td>{result.ux[1][i].toFixed(2)}</td></tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div className={styles.card}>
                <h1>ox</h1>
                <table className="table-fixed">
                    <thead>
                    <tr>
                        <th>0</th>
                        <th>L</th>
                    </tr>
                    </thead>
                    <tbody>
                        {result.ox[0].map((v,i)=>
                            <tr key={i}><td>{result.ox[0][i].toFixed(2)}</td><td>{result.ox[1][i].toFixed(2)}</td></tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}