"use client";

import React from 'react';
import {useDispatch} from 'react-redux';
import {Button, TextField, Container, Typography, Box} from '@mui/material';
import {AppDispatch} from "@/store";
import {signup} from "@/store/thunks/authThunks";
import {useRouter} from "next/navigation";

const SignupForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await dispatch(signup({email, password, fullName})).unwrap();
        router.push('/workspace')
    };


    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100vh'
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="fullName"
                        label="Name"
                        name="fullName"
                        autoComplete="fullName"
                        autoFocus
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                </Box>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => router.push('/signin')}
                >
                    Sign In
                </Button>
            </Box>
        </Container>
    );
};

export default SignupForm;
