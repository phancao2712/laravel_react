import { toast } from "react-toastify";
import { TypeToast } from "../contexts/toastContext";

export const showNotify = (
    message: string,
    type: TypeToast,
    setMessage: (message: string, type: TypeToast) => void
) => {
    if (message) {
        switch (type) {
            case 'success':
                toast.success(message)
                break;

            case 'error':
                toast.error(message)
                break;

            case 'warning':
                toast.warning(message)
                break;

            case 'info':
                toast.info(message)
                break;

            default:
                break;
        }
        setMessage("", null)
    }
}

export const showToast = (
    message: string,
    type: TypeToast,
) => {
    if (message) {
        switch (type) {
            case 'success':
                toast.success(message)
                break;

            case 'error':
                toast.error(message)
                break;

            case 'warning':
                toast.warning(message)
                break;

            case 'info':
                toast.info(message)
                break;

            default:
                break;
        }
    }
}
