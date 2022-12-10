import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppState} from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const usePreprocessorState = () => useAppSelector(state => state.preprocessor)
export const useProcessorState = () => useAppSelector(state => state.processor)
export const usePostprocessorState = () => useAppSelector(state => state.postprocessor)