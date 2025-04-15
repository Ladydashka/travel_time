import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import registrationReducer from '../auth/registrationSlice.ts';
import authSliceReducer from '../auth/authSlice.ts';
import updateGuideReducer, { findOneGuideReducer } from '../guide/guideSlice.ts';
import getExcursionsReducer from '../excursion/excursionSlice.ts';
import getImagesReducer from '../gallery/gallerySlice.ts';
import { commentReducer } from '../comments/CommentsSlice.ts';
import { allCommentsReducer } from '../comments/CommentsSlice.ts';
import updateUserReducer from '../user/userSlice.ts'

const store = configureStore({
    reducer: {
        registration: registrationReducer,
        auth: authSliceReducer,
        updateGuide: updateGuideReducer,
        updateUser: updateUserReducer,
        excursions: getExcursionsReducer,
        images: getImagesReducer,
        comment: commentReducer,
        allComments : allCommentsReducer,
        oneGuide: findOneGuideReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
