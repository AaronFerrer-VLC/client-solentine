import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/auth.context"
import Loader from "../components/Loader/Loader"

const PrivateRoute = () => {
    const { loggedUser, isFetchingUser } = useContext(AuthContext)

    if (isFetchingUser) {
        return <Loader text="Verificando autenticación..." fullScreen />
    }

    if (!loggedUser) {
        return <Navigate to="/inicio-sesion" replace />
    }

    return <Outlet />
}

export default PrivateRoute