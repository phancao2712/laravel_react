import axiosInstance from "../configs/axios"
import { handelAxiosError } from "../helpers/axiosHelpers"
import { User } from "../types/TypeUser"

type LoginPayload = {
    email: string,
    password: string
}

const login = async (payload: LoginPayload) : Promise<User | null> => {
    try {
        const response = await axiosInstance.post('/auth/login', {
            email: payload.email,
            password: payload.password
        })
        return response.data.user
    } catch (error) {
        console.log(error);
        handelAxiosError(error)
        return null;
    }
}

const fetchUser = async () : Promise<User | null> => {
    try {
        const response = await axiosInstance.get('/auth/profile')
        return response.data
    } catch (error) {
        console.log(error);
        handelAxiosError(error)
        return null;
    }
}
export { login, fetchUser }
