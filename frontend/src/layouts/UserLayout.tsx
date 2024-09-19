import React, { useState, useEffect } from 'react';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import CircularProgress from "@mui/material/CircularProgress";
import {Box, Button, Typography} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { logout } from "@/store/slices/authSlice";

const UserLayout = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const token = document.cookie.includes('token=');

        if (!token) {
            router.push('/signin');
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
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    zIndex: 9999,
                }}
            >
                <CircularProgress />
            </Box>
        )
    }

    const logoutHandler = async () => {
        await dispatch(logout());
        router.push('/signin');
    }

    return (
        <div>
            <header>
                <Typography sx={{ width: '100%', textAlign: 'right', mb: 10, mt: 4}}>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={logoutHandler}
                        sx={{ mr: 4 }}
                    >
                        Logout
                    </Button>
                </Typography>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default UserLayout;
