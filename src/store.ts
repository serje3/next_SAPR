import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import {preprocessorSlice} from "./redux/reducers/preprocessorSlice";

export function makeStore() {
    return configureStore({
        reducer: {
            preprocessor: preprocessorSlice.reducer,
            processor: null,
            postprocessor: null
        },
    })
}


const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store