// filepath: /Users/omersharivker/dev/front_blog/src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/reducer/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;