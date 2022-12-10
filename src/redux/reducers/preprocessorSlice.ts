import {KernelState, SupportState} from "../../components/common/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const initialState: {
    lines: KernelState[],
    supports: SupportState[]
} = {
    lines: [],
    supports: [null, null]
}

export const preprocessorSlice = createSlice({
    name: "preprocessor",
    initialState,
    reducers: {
        addKernel: (state, action: PayloadAction<KernelState>) => {
            state.lines.push(action.payload)
        },
        changeKernel: (state, action: PayloadAction<{line: KernelState, index: number}>) => {
           state.lines[action.payload.index] = action.payload.line
        },
        setSupports: (state, action:PayloadAction<{left: SupportState, right: SupportState}>) => {
            state.supports[0] = action.payload.left
            state.supports[1] = action.payload.right
        }
    }
})