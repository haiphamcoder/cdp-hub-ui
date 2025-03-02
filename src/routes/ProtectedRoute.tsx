import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { JSX } from 'react';
import LoadingScreen from '../pages/LoadingScreen';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated , isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/signin" state={{ from: location }} replace />;
    }

    return children;
};