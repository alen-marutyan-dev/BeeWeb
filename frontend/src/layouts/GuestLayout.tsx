"use client"

import React, {useEffect, useState} from 'react';
import {ReactNode} from 'react';
import {useRouter} from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import {Box} from "@mui/material";

const GuestLayout = ({children}: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = document.cookie.includes('token=');

        if (token) {
            router.push('/workspace');
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    zIndex: 9999,
                }}
            >
                <CircularProgress />
            </Box>
        )
    }

    return (
        <div>
            <main>{children}</main>
        </div>
    );
};

export default GuestLayout;
