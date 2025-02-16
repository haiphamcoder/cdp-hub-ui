import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    tokens: {
        accessToken: string;
        refreshToken: string;
    } | null;
    login: (tokens: { access_token: string; refresh_token: string }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tokens, setTokens] = useState<AuthContextType['tokens']>(null);
    const [isLoading, setIsLoading] = useState(true);  // Add loading state

    useEffect(() => {
        const storedTokens = localStorage.getItem('tokens');
        if (storedTokens) {
            const parsedTokens = JSON.parse(storedTokens);
            setTokens({
                accessToken: parsedTokens.access_token,
                refreshToken: parsedTokens.refresh_token,
            });
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = (tokens: { access_token: string; refresh_token: string }) => {
        setIsAuthenticated(true);
        setTokens({
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
        });
        localStorage.setItem('tokens', JSON.stringify(tokens));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setTokens(null);
        localStorage.removeItem('tokens');
    };

    if (isLoading) {
        return null; // or a loading spinner
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, tokens, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};