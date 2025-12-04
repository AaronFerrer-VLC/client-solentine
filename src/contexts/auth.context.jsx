import { createContext, useEffect, useState, useCallback } from "react";
import authServices from "../services/auth.services";
import { handleApiError } from "../utils/errorHandler";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
    const [loggedUser, setLoggedUser] = useState(null);
    const [isFetchingUser, setIsFetchingUser] = useState(true);
    const [error, setError] = useState(null);

    const loginUser = useCallback((userData) => {
        setLoggedUser(userData);
        setError(null);
    }, []);

    const logoutUser = useCallback(() => {
        setLoggedUser(null);
        setIsFetchingUser(false);
        setError(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
    }, []);

    const authenticateUser = useCallback(async () => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            setIsFetchingUser(false);
            return;
        }

        try {
            setIsFetchingUser(true);
            const { data } = await authServices.verifyUser(token);
            
            if (data.loggedUserData) {
                loginUser(data.loggedUserData);
            } else {
                logoutUser();
            }
        } catch (err) {
            console.error("Error verifying user:", err);
            const errorMessage = handleApiError(err, 'Error al verificar usuario');
            setError(errorMessage);
            logoutUser();
        } finally {
            setIsFetchingUser(false);
        }
    }, [loginUser, logoutUser]);

    const hasRole = useCallback((role) => {
        return loggedUser && loggedUser.role === role;
    }, [loggedUser]);

    const isAdmin = useCallback(() => {
        return hasRole('admin');
    }, [hasRole]);

    useEffect(() => {
        authenticateUser();
    }, [authenticateUser]);

    return (
        <AuthContext.Provider 
            value={{ 
                loggedUser, 
                loginUser, 
                logoutUser, 
                authenticateUser, 
                isFetchingUser, 
                hasRole,
                isAdmin,
                error,
                setError
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProviderWrapper };