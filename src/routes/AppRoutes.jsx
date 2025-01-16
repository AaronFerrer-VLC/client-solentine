import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import HomePage from '../pages/HomePage/HomePage'
import Error404Page from '../pages/ErrorPage404Page/Error404Page'
import SalesPage from '../pages/Sales/SalesPage/SalesPage'
import UserProfilePage from '../pages/UserPage/UserProfilePage/UserProfilePage'
import UsersPage from '../pages/UserPage/UsersPage/UsersPage'
import ClientPage from '../pages/ClientPage/ClientPage'
import ComercialsPage from '../pages/ComercialPage/ComercialsPage'
import PageSalesByYear from '../pages/ChartsPage/ChartsSales/PageSalesByYear'

const AppRoutes = () => {
    return (
        <div className="AppRoutes">
            <Routes>
                <Route path={'/'} element={<HomePage />} />

                <Route path={'/registro'} element={<SignupPage />} />
                <Route path={'/inicio-sesion'} element={<LoginPage />} />

                <Route path={'/usuarios/:id'} element={<UserProfilePage />} />
                <Route path={'/usuarios'} element={<UsersPage />} />

                <Route path={'/ventas'} element={<SalesPage />} />
                <Route path={'/clientes'} element={<ClientPage />} />
                <Route path={'/comerciales'} element={<ComercialsPage />} />
                <Route path={'/ventas-por-años'} element={<PageSalesByYear />} />

                <Route path={'/*'} element={<Error404Page />} />
            </Routes>

        </div>
    )
}
export default AppRoutes