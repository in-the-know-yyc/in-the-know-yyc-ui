import { useState } from 'react';
import React from "react";
import Image from "next/image";
import Link from 'next/link';
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import "../app/styles/components/footer.css";

import useFooterNewsletterValidation from '../hooks/useFooterNewsletterValidation';
import sendEmailSubscription from "@/api/newsletter";

const Footer = () => {

    // Data validation in newsletter form
    const [isDisabled, setIsDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useFooterNewsletterValidation(setIsDisabled, setErrorMessage, setSuccessMessage);

    /**
     * Handles the newsletter subscription form submission.
     * @param {Event} event - The form submission event.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.elements.newsletter_subscription.value;
        const response = await sendEmailSubscription(email);
        if (response.type === 'success') {
            setSuccessMessage(response.message);
        } else {
            setErrorMessage(response.message);
        }
    };

    // USAR DESCRIPTION PARA OCULTAR FORM DESPUES DE SUBMITEAR??
    return (
        <footer>
            <div className="newsletter-container">
                <div className='col1'>
                    <h3>Subscribe to our Newsletter!</h3>
                    <p>Get information about all the Tech events happening around you</p>
                </div>
                <div className='col2'>
                    {(successMessage !== '') ? <h3 className='successMessage'>{successMessage}</h3> :
                        <form id="footerNewsletterForm" onSubmit={handleSubmit}>
                            <div id="newsletterFormSpaced"></div>
                            <Input
                                id='inputNewsletterFooter'
                                className='inputNewsletterFooter'
                                name="newsletter_subscription"
                                label="Enter your email"
                                labelPlacement={'inside'}
                                type="text"
                                isRequired={true}
                                isInvalid={false}
                                maxLength={256}
                                description={errorMessage}
                                classNames={{
                                    helperWrapper: "inputNewsletterFooter-helperWrapper",
                                    inputWrapper: "inputNewsletterFooter-inputWrapper",
                                    description: "inputNewsletterFooter-descriptionMessage"
                                }}
                            />
                            <Button type="submit" id='buttonNewsletterFooter'>Subscribe</Button>
                        </form>
                    }
                </div>
            </div>
            <div className="nav-container">
                <div>
                    <Link href="/">
                        <Image src="/images/logo-white.svg" alt="In The Know YYC - Logo White" width={168} height={106} />
                    </Link>
                </div>
                {/* <div>
                    <h3>Your Account</h3>
                    <ul>
                        <li><Link href="#">Log In</Link></li>
                        <li><Link href="#">Sign Up</Link></li>
                    </ul>
                </div> */}
                <div>
                    <h3>Legal</h3>
                    <ul>
                        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link href="/terms-and-conditions">Terms and Conditions</Link></li>
                    </ul>
                </div>
                <div>
                    <h3>Company</h3>
                    <ul>
                        <li><Link href="/events">Events</Link></li>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                        <li><Link href="/frequently-asked-questions">FAQ</Link></li>
                    </ul>
                </div>
                <div className="social-container">
                    <h3>Social Media (Follow Us)</h3>
                    <ul>
                        <li>
                            <Link href="https://x.com/INTHEKNOWYYC" target="_blank">
                                <Image src="/images/social/x.svg" alt="X icon" width={19} height={16} />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.linkedin.com/company/in-the-know-yyc/posts/?feedView=all&viewAsMember=true" target="_blank">
                                <Image src="/images/social/facebook.svg" alt="Facebook icon" width={17} height={16} />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.linkedin.com/company/in-the-know-yyc/posts/?feedView=all&viewAsMember=true" target="_blank">
                                <Image src="/images/social/linkedin.svg" alt="Linkedin icon" width={17} height={16} />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.instagram.com/intheknowyyc/" target="_blank">
                                <Image src="/images/social/instagram.svg" alt="Instagram icon" width={16} height={15} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="copyright-container">
                <p>
                    <span>&copy;</span> 2024 Copyright - All rights reserved by <Link href={'/'}>YYC</Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;