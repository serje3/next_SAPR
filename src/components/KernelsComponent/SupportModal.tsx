import {setSupports} from "../../redux/actions/preprocessor";
import {useAppDispatch} from "../../hooks";

export function SupportModal({showSupportModal, setShowSupport, lines}) {
    const dispatch = useAppDispatch()
    return showSupportModal ?
        <form className="modal_window" onSubmit={(event) => {
            event.preventDefault()
            const supports = new FormData(event.target as HTMLFormElement)
            const left = supports.get("left") === "on"
            const right = supports.get("right") === "on"
            dispatch(setSupports({
                left: left ? {kernelId: 0, leftSide: left} : null,
                right: right ? {kernelId: lines.length - 1, leftSide: !right} : null
            }))
        }}>
            <div className="close" onClick={() => setShowSupport(false)}>X</div>
            <div>
                <input type="checkbox" name={'left'} id="left-side"/>
                <label htmlFor="left-side">Опора слева</label>
            </div>
            <div>
                <input type="checkbox" name={'right'} id="right-side"/>
                <label htmlFor="right-side">Опора справа</label>
            </div>
            <button type="submit">Сохранить</button>
        </form> : null
}