import React from 'react';
import GuestLayout from "@/layouts/GuestLayout";
import SignupForm from "@/components/Auth/SignupForm";

const SignUp: React.FC = () => {
    return (
        <GuestLayout>
            <SignupForm />
        </GuestLayout>
    );
};

export default SignUp;

