import { createContext, useContext, useState, useEffect } from 'react';
import { API_CONFIG } from '../config/api';

interface AuthContextType {
    userId: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    checkAuth: () => void;
    logout: () => void;
}

// Create the context object with a default value
const AuthContext = createContext<AuthContextType>({
    userId: null,
    isAuthenticated: false,
    isLoading: true,
    checkAuth: () => { },
    logout: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH_INFO}`, { method: "GET", credentials: "include" });
            if (response.ok) {
                const data = await response.json();
                setUserId(data.user_id);
            } else {
                setUserId(null);
            }
        } catch (error) {
            console.error("Error checking authentication status", error);
            setUserId(null);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        checkAuth();
    }, []);

    const logout = async () => {
        try {
            await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGOUT}`, { method: "POST", credentials: "include" });
        } catch (error) {
            console.error("Error logging out", error);
        }
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ userId, isAuthenticated: !!userId, isLoading, checkAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);