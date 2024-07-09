import { configureStore } from '@reduxjs/toolkit'
import toastCounter from './slice/toastSlice'

export const store = configureStore({
  reducer: {
    toast: toastCounter,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
