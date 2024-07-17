import axios from "axios"
import { toast } from "react-toastify"
const handelAxiosError = (error: unknown) => {
    if(axios.isAxiosError(error)){
        if(error.response && error.response.data && error.response.data.error){
            toast.error(error.response.data.error)
        } else {
            // toast.error("Network error")
            console.log("Network error");

        }
    } else {
        toast.error("Đã xảy ra lỗi! Vui lòng thử lại")
    }
}

export { handelAxiosError }
