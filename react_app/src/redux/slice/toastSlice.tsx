import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

type ToastType = 'success' | 'error' | 'warning' | 'info' | null
export interface ToastState {
    message: string
    type: ToastType
}

const initialState: ToastState = {
    message: '',
    type: null
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<{ message: string, type: ToastType }>) => {
            state.message = action.payload.message
            state.type = action.payload.type
        },

        clearMessage: (state) => {
            state.message = ''
            state.type = null
        }
    },
})

// Action creators are generated for each case reducer function
export const { setMessage, clearMessage } = toastSlice.actions

export default toastSlice.reducer
