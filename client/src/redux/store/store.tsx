import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import registrationReducer from '../auth/registrationSlice.ts'
import authSliceReducer from "../auth/authSlice.ts";




const store = configureStore({
    reducer: {
        registration: registrationReducer,
        auth: authSliceReducer
    }
})

 export  type AppDispatch = typeof store.dispatch;
export  const  useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

