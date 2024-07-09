
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { clearMessage, setMessage } from "../redux/slice/toastSlice"
import { showToast } from "../helpers/myHelper"

const Dashboard = () => {
    // const {message, type, setMessage} = useToast();
    const { message, type } = useSelector((state: RootState) => state.toast)
    const dispatch = useDispatch()

    useEffect(() => {
        showToast(message, type)
        dispatch(clearMessage())
        // showNotify(message, type, setMessage);
    }, [message, type])

    return (
        <>
            <div>Đây là Dashboard</div>
        </>
    )
}
export default Dashboard
