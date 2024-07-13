import React, { createContext, ReactNode, useContext } from "react";

export type TypeToast = null | "success" | "error" | "warning" | "info"

interface ToastContextType {
    message: string
    type: TypeToast
    setMessage: (message: string, type?: TypeToast) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
    children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [message, setToastMessage] = React.useState<string>("")
    const [type, setType] = React.useState<TypeToast>(null)

    const setMessage = (message: string, type: TypeToast = null) => {
        setToastMessage(message)
        setType(type)
    }
    return (
        <ToastContext.Provider value={{ message, type, setMessage }}>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error("Đã xảy ra lỗi")
    }
    return context
}




