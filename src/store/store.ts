// filepath: /Users/omersharivker/dev/front_blog/src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import postSlice from './reducer/postSlice';
import commentsSlice from './reducer/commentSlice';
import userSlice from '../store/reducer/userSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        posts : postSlice,
        comments: commentsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;


