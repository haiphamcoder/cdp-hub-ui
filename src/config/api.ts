
export const API_CONFIG = {
    BASE_URL: 'http://localhost:8080',
    OAUTH2_REDIRECT_URI: 'http://localhost:5173/oauth2/redirect',
    ENDPOINTS: {
        AUTHENTICATE: '/api/v1/auth/authenticate',
        REDIRECT_LOGIN_GOOGLE: '/oauth2/authorization/google?redirect-uri=http://localhost:5173/oauth2/redirect',
        AUTH_INFO: '/api/v1/auth/me',
        LOGOUT: '/api/v1/auth/logout',
        USER: '/api/v1/user',
    }
} as const;
