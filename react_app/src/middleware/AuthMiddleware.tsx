import { PropsWithChildren } from "react"
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";


type ProtectedRouteProps = PropsWithChildren
const AuthMiddleware = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate();
    if(isAuthenticated === false && user === null) {
        navigate('/login')
    } else {
        return children
    }

    return children;
}

export default AuthMiddleware
