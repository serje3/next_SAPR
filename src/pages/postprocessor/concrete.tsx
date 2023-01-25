import styles from '../../styles/Home.module.css';
import Link from "next/link";
import {usePreprocessorState, useProcessorState} from "../../hooks";
import {useState} from "react";
import {PostprocessorService} from "../../components/service/postprocessorService";

export default function Concrete() {
    const lines = usePreprocessorState().lines
    const [currentKernel, setKernel] = useState(-1)
    const [L, setL] = useState(-1)
    const preprocessor = usePreprocessorState()
    const processor = useProcessorState()
    const result = new PostprocessorService(preprocessor, processor)
    const getNx = (x) => {
        return result.Nx(x)
    }
    const getUx = (x) => {
        return result.Ux(x)
    }
    const getox = (x) => {
        return result.ox(x)
    }
    return (
        <div className={styles.container}>
            <Link href={"/postprocessor"} className={styles.card}>
                <h3>Вернуться</h3>
            </Link>
            <form className={styles.card} onChange={event => {
                const target = (event.target as HTMLSelectElement)
                if (target.tagName === "SELECT") {
                    const id = parseInt(target.value)
                    setKernel(id)
                }
            }}
                  onSubmit={event => {
                      event.preventDefault()
                      const L = parseFloat(new FormData(event.target as HTMLFormElement).get('L') as string)
                      setL(Math.max(0,Math.min(L,2)))
                  }
                  }
            >
                <select name="kernel">
                    {lines.map((line, i) => {
                        return <option key={i} value={i}>{i + 1} Стержень</option>
                    })}
                </select>
                <input type="number"
                       name={"L"}
                       min={0}
                       step=".01"
                       placeholder={"Введите т. " + `от 0 до ${currentKernel !== -1 ? lines[currentKernel].L : 0}`}/>
                <button type="submit">Посчитать</button>
            </form>
            {currentKernel !== -1?<><div className={styles.card}>
                <h1>Nx</h1>
                <table className="table-fixed">
                    <thead>
                    <tr>
                        <th>{L}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr><td>{getNx(L)[currentKernel].toFixed(2)}</td></tr>
                    </tbody>
                </table>
            </div>
                <div className={styles.card}>
                    <h1>Ux</h1>
                    <table className="table-fixed">
                        <thead>
                        <tr>
                            <th>{L}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr><td>{getUx(L)[currentKernel].toFixed(2)}</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.card}>
                    <h1>ox</h1>
                    <table className="table-fixed">
                        <thead>
                        <tr>
                            <th>{L}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr><td>{getox(L)[currentKernel].toFixed(2)}</td></tr>
                        </tbody>
                    </table>
                </div></>:null}

            </div>
    )
}
