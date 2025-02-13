import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { IconButton, IconButtonProps, useColorScheme } from "@mui/material";
import React from "react";

export default function ColorSchemeToggle(props: IconButtonProps) {
    const { onClick, ...other } = props;
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);
    return (
        <IconButton
            aria-label="toggle light/dark mode"
            disabled={!mounted}
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            {...other}
        >
            {mode === 'light' ? <DarkModeRounded /> : <LightModeRounded />}
        </IconButton>
    )
}