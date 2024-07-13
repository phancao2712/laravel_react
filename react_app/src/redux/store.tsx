import { configureStore } from '@reduxjs/toolkit'
import toastCounter from './slice/toastSlice'
import authCounter from './slice/authSlice'

export const store = configureStore({
  reducer: {
    toast: toastCounter,
    auth: authCounter
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
