import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import AppTheme from '../theme/AppTheme';
import ColorSchemeToggle from '../theme/ColorSchemeToggle';
import ForgotPasswordDialog from '../components/ForgotPasswordDialog';
import MuiCard from '@mui/material/Card';
import CDPLogo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignInPage(props: { disableCustomTheme?: boolean }) {
    const [usernameError, setUsernameError] = React.useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] = React.useState(false);

    const handleForgotPasswordDialogOpen = () => {
        setForgotPasswordDialogOpen(true);
    };

    const handleForgotPasswordDialogClose = () => {
        setForgotPasswordDialogOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (usernameError || passwordError) {
            event.preventDefault();
            return;
        }
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get('username'),
            password: data.get('password'),
        });
    };

    const navigate = useNavigate();

    const handleSignIn = () => {
        if (!validateInputs()) {
            navigate('/dashboard');
        }
    };

    const validateInputs = () => {
        const username = document.getElementById('username') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;

        let isValid = true;

        if (!username.value || username.value.length < 6) {
            setUsernameError(true);
            setUsernameErrorMessage('Please enter a valid username.');
            isValid = false;
        } else {
            setUsernameError(false);
            setUsernameErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                <ColorSchemeToggle sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
                <Card variant="outlined">
                    <img src={CDPLogo} height={25} width={150} alt="CDP Logo" />
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <TextField
                                error={usernameError}
                                helperText={usernameErrorMessage}
                                id="username"
                                type="username"
                                name="username"
                                placeholder="admin"
                                autoComplete="current-username"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={usernameError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Link
                                component="button"
                                type="button"
                                onClick={handleForgotPasswordDialogOpen}
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                            >
                                Forgot your password?
                            </Link>
                        </Box>
                        <ForgotPasswordDialog open={forgotPasswordDialogOpen} handleClose={handleForgotPasswordDialogClose} />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleSignIn}
                        >
                            Sign in
                        </Button>

                    </Box>
                    <Divider>or</Divider>
                    <Typography sx={{ textAlign: 'center' }}>
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/auth/signup"
                            variant="body2"
                            sx={{ alignSelf: 'center' }}
                        >
                            Sign up
                        </Link>
                    </Typography>
                </Card>
            </SignInContainer>
        </AppTheme>
    );
}
