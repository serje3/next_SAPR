import {ProcessorState} from "../../components/common/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: ProcessorState = {
    A: [[]],
    b: [],
    delta: []
}

export const procesorSlice = createSlice({
    name: "processor",
    initialState,
    reducers: {
        SetComputed: (state,action:PayloadAction<ProcessorState>) => {
            state.A = action.payload.A
            state.b = action.payload.b
            state.delta = action.payload.delta
        }
    }
})

