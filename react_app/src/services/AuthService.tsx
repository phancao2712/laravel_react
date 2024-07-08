import axiosInstance from "../configs/axios"

type LoginPayload = {
    email: string,
    password: string
}

const login = async (payload: LoginPayload) => {
    try {
        const response = await axiosInstance.post('/auth/login', {
            email: payload.email,
            password: payload.password
        })
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export default { login }
