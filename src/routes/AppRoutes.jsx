import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loader from '../components/Loader/Loader'

// Lazy load pages for better performance and code splitting
const HomePage = lazy(() => import('../pages/HomePage/HomePage'))
const SignupPage = lazy(() => import('../pages/SignupPage/SignupPage'))
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'))
const SalesPage = lazy(() => import('../pages/Sales/SalesPage/SalesPage'))
const UserProfilePage = lazy(() => import('../pages/UserPage/UserProfilePage/UserProfilePage'))
const UsersPage = lazy(() => import('../pages/UserPage/UsersPage/UsersPage'))
const ClientPage = lazy(() => import('../pages/ClientPage/ClientPage'))
const ComercialsPage = lazy(() => import('../pages/ComercialPage/ComercialsPage'))
const PageSalesByYear = lazy(() => import('../pages/ChartsPage/ChartsSales/PageSalesByYear'))
const Error404Page = lazy(() => import('../pages/ErrorPage404Page/Error404Page'))

const AppRoutes = () => {
    return (
        <div className="AppRoutes">
            <Suspense fallback={<Loader fullScreen />}>
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
            </Suspense>
        </div>
    )
}
export default AppRoutes