import styles from "../../styles/Home.module.css";
import {DropdownMenu} from "../../components/common/DropdownMenu";
import {addKernel} from "../../redux/actions/preprocessor";

export function Loads() {
    // const DropdownList = [{
    //     name: "Добавить стержень",
    //     callback: () => dispatch(addLine({A: 0, E: 0, L: 0}))
    // }]
    //
    return (
        <div className={"wrapper p-5 " + styles.container}>
            {/*<DropdownMenu className={"dropdown"} properties={DropdownList} title={"Действия"}/>*/}
        </div>
            )
}