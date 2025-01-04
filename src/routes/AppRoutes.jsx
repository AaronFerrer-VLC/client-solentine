import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import HomePage from '../pages/HomePage/HomePage'
import Error404Page from '../pages/ErrorPage404Page/Error404Page'
import SalesPage from '../pages/Sales/SalesPage/SalesPage'

const AppRoutes = () => {
    return (
        <div className="AppRoutes">
            <Routes>
                <Route path={'/'} element={<HomePage />} />

                <Route path={'/registro'} element={<SignupPage />} />
                <Route path={'/inicio-sesion'} element={<LoginPage />} />
                <Route path={'/ventas'} element={<SalesPage />} />

                <Route path={'/*'} element={<Error404Page />} />
            </Routes>

        </div>
    )
}
export default AppRoutes