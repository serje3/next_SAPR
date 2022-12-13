import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import {preprocessorSlice} from "./redux/reducers/preprocessorSlice";
import {procesorSlice} from "./redux/reducers/processorSlice";

export function makeStore() {
    return configureStore({
        reducer: {
            preprocessor: preprocessorSlice.reducer,
            processor: procesorSlice.reducer,
            postprocessor: null
        },
    })
}


const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store