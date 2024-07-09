import axiosInstance from "../configs/axios"
import { handelAxiosError } from "../helpers/axiosHelpers"

type LoginPayload = {
    email: string,
    password: string
}

const login = async (payload: LoginPayload) : Promise<boolean> => {
    try {
        const response = await axiosInstance.post('/auth/login', {
            email: payload.email,
            password: payload.password
        })
        return true;
    } catch (error) {
        console.log(error);
        handelAxiosError(error)
        return false;
    }
}

export default { login }
