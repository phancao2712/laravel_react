import { Link } from "react-router-dom"

const User = () => {
    return (
        <>
            <div>Đây là User</div>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/login">login</Link>
        </>
    )
}
export default User
