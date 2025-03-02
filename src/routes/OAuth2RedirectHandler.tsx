import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import LoadingScreen from "../pages/LoadingScreen";

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const { checkAuth } = useAuth();

    useEffect(() => {
        const handleOAuth2Login = async () => {
            await checkAuth();
            navigate("/dashboard");
        }

        handleOAuth2Login();
    }, [navigate, checkAuth]);

    return <LoadingScreen text="Logging in..." />;
};

export default OAuth2RedirectHandler;
