// filepath: /Users/omersharivker/dev/front_blog/src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/reducer/userSlice';
import postSlice from './reducer/postSlice';
import commentsSlice from './reducer/commentSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        posts : postSlice,
        comments: commentsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;


