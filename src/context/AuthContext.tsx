import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode
} from "react";
import {
    User,
    LoginCredentials,
    RegisterCredentials
} from "../types/auth";
import { authService } from "../services/authService";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => void;
    authError: string | null;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
                                                                    children
                                                                }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState<string | null>(null);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const userData = await authService.getCurrentUser();
                    setUser(userData);
                } catch (error) {
                    localStorage.removeItem("token");
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        setAuthError(null);
        try {
            const response = await authService.login(credentials);
            localStorage.setItem("token", response.token);
            setUser(response.user);
        } catch (err: any) {
            setAuthError(err.message);
            throw err;
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        setAuthError(null);
        try {
            const response = await authService.register(credentials);
            localStorage.setItem("token", response.token);
            setUser(response.user);
        } catch (err: any) {
            setAuthError(err.message);
            throw err;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setAuthError(null);
    };

    const clearError = () => {
        setAuthError(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                loading,
                login,
                register,
                logout,
                authError,
                clearError
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("useAuth must be used within AuthProvider");
    return context;
};

export default AuthContext;
