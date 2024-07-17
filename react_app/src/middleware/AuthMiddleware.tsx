import { PropsWithChildren, useEffect } from "react"
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../services/AuthService";
import { setAuthLogin, setAuthLogout } from "../redux/slice/authSlice";


type ProtectedRouteProps = PropsWithChildren
const AuthMiddleware = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuthentication = async () => {
            if (!isAuthenticated && user === null) {
                const userData = await fetchUser();
                if (userData) {
                    dispatch(setAuthLogin(userData))
                } else {
                    dispatch(setAuthLogout())
                    navigate('/login')
                }
            }
        }
        checkAuthentication()
    }, [isAuthenticated, user, dispatch, navigate])


    return isAuthenticated && user ? children : null;
}

export default AuthMiddleware
