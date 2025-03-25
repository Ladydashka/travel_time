import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import registrationReducer from '../auth/registrationSlice.ts'
import authSliceReducer from "../auth/authSlice.ts";
import updateGuideReducer from '../guide/guideSlice.ts'
import getExcursionsReducer from '../excursion/excursionSlice.ts'
import getImagesReducer from '../gallery/gallerySlice.ts'




const store = configureStore({
    reducer: {
        registration: registrationReducer,
        auth: authSliceReducer,
        updateGuide: updateGuideReducer,
        excursions: getExcursionsReducer,
        images : getImagesReducer,
    }
})

 export  type AppDispatch = typeof store.dispatch;
export  const  useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

