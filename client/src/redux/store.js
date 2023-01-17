import { configureStore } from '@reduxjs/toolkit';
import loginRegister from './loginRegister';

export const store = configureStore({
  reducer: {
    loginRegister
  },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
