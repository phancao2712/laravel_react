import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { clearMessage } from "../../redux/slice/toastSlice"
import { showToast } from "../../helpers/myHelper"
import { fetchUser } from "../../services/AuthService"

const Layout = () => {
    const { message, type } = useSelector((state: RootState) => state.toast)
    const dispatch = useDispatch()

    useEffect(() => {
        showToast(message, type)
        dispatch(clearMessage())
    }, [message, type])

    useEffect(() => {
        fetchUser();
    }, [])
    return (
        <>
            <div>Đây là Layout tổng</div>
            <Outlet />
        </>
    )
}

export default Layout
