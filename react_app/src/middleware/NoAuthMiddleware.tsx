import { PropsWithChildren, useEffect, useState } from "react"
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../services/AuthService";


type ProtectedRouteProps = PropsWithChildren
const NoAuthMiddleware = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
    const [checkedLogin, setCheckedLogin] = useState<boolean>(false)
    const navigate = useNavigate();
    useEffect(() => {

        const checkLogin = async () => {
            try {
                const userData = await fetchUser();
                if (userData !== null) {
                    navigate('/dashboard')
                } else {
                setCheckedLogin(true)
                }
            } catch (error) {
                setCheckedLogin(true)
            }

        }
        if (!isAuthenticated && user === null) {
            checkLogin()
        } else {
            navigate('/dashboard')
        }

    }, [isAuthenticated, user, navigate])

    return checkedLogin ? children : null
}

export default NoAuthMiddleware
