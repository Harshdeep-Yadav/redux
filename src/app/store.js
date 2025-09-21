import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../feature/users/userSlice';

export const store = configureStore({
    reducer: {
        users: userReducer,
    },
});
