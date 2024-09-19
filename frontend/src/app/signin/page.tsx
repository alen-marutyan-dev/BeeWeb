import React from 'react';
import GuestLayout from "@/layouts/GuestLayout";
import SigninForm from "@/components/Auth/SigninForm";

const SignIn: React.FC = () => {
    return (
        <GuestLayout>
            <SigninForm />
        </GuestLayout>
    );
};

export default SignIn;

