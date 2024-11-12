import axios from "axios";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
//import { useRouter } from 'next/router';

import "../../app/styles/cms/signInUp.css";

export default function LogIn() {

    //const router = useRouter();

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);




    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log('entra...')

        const user = e.target.userEmail.value;
        const pass = e.target.userPassword.value;

        if (user === '' || pass === '') {
            toast.error('Please insert your credentials');
            return;
        }

        try {
            const response = await axios.post('/cms/login', { email: user, password: pass });
            console.log('RESPONSE:', response);

            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                toast.success('Login successful!');
                //router.push('/cms'); // Redirect to protected route
            } else {
                toast.error('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('LOGIN ERROR:', error);
            toast.error('There was an error during login. Please try again later.');
        }
    }


    return (
        <main className="signInUpPage">
            <ToastContainer />
            <section className="formContainer">
                <div className="logo">
                    <Image src="/images/logo-black.svg" alt="In The Know YYC - Logo Black" width={100} height={100} />
                </div>
                <h1>Log In</h1>
                <form action="/#" onSubmit={handleSubmit}>
                    <Input label="Email" labelPlacement={'outside'} placeholder="Enter your email" type="email" id="userEmail" />
                    <Input label="Password" labelPlacement={'outside'} placeholder="Enter your password" id="userPassword" type={isVisible ? "text" : "password"}
                        endContent={
                            <button className="togglePasswordVisibilityButton" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                {isVisible ? (
                                    <Image src={'/images/icons/eye-visibility.svg'} width={24} height={24} alt='' />
                                ) : (
                                    <Image src={'/images/icons/eye-visibility-off.svg'} width={24} height={24} alt='' />
                                )}
                            </button>
                        }
                    />
                    <div className="frmCols">
                        <Checkbox className="inputCheckbox">Keep me logged in</Checkbox>
                        <Link href={'/#'}>Forgot Password</Link>
                    </div>
                    <button type="submit">Log In</button>
                </form>

                <p>or</p>

                <Link href={'/#'} className="socialLoginButton"><Image src={'/images/social/google-color.svg'} width={18} height={18} alt="" /> Log in with Google </Link>
                <Link href={'/#'} className="socialLoginButton"><Image src={'/images/social/facebook-color.svg'} width={16} height={30} alt="" /> Log in with Facebook </Link>
                <Link href={'/#'} className="socialLoginButton"><Image src={'/images/social/linkedin-color.svg'} width={24} height={24} alt="" /> Log in with LinkedIn </Link>

                <div className="changeForm">
                    Don&apos;t have an account? <Link href={'/signup'}>Sign Up</Link>
                </div>
            </section>
        </main>
    );
};

