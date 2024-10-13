import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import "../app/styles/pages/contact.css";
import useContactFormValidation from "../hooks/useContactFormValidation";

export default function Contact() {

    useContactFormValidation();

    return (
        <main id="contact">
            <h1>Contact Us</h1>
            <div className="contactContainer">
                <div className="contactFormContainer">
                    <form action="#" method='post' id='contactForm'>
                        <Input label="Email" labelPlacement={'outside'} placeholder="Enter your email" className="formInput" type="email" />
                        <Input label="Address" labelPlacement={'outside'} placeholder="Enter your address" className="formInput" type="text" />
                        <Input label="Phone" labelPlacement={'outside'} placeholder="Enter your phone number" className="formInput" type="phone" />
                        <Input label="Social Media" labelPlacement={'outside'} placeholder="Enter your LinkedIn profile" className="formInput" type="text" />

                        <button type="submit">Send</button>
                    </form>

                    <div id="formSubmitionMessage">
                        Thank you for contacting us.
                        <br /><br /><br />
                        We will get back to you as soon as possible.
                    </div>
                </div>

                <div className="contactInfo">
                    <ul>
                        <li>
                            <Link href={'mailto:intheknowyyc1@gmail.com'} target="_blank">
                                <div className="iconContainer">
                                    <Image src={'/images/social/email.svg'} width={24} height={24} alt="" />
                                </div>
                                intheknowyyc1@gmail.com
                            </Link>
                        </li>
                        <li>
                            <Link href={'https://x.com/INTHEKNOWYYC'} target="_blank">
                                <div className="iconContainer">
                                    <Image src={'/images/social/x.svg'} width={24} height={24} alt="" />
                                </div>
                                /INTHEKNOWYYC
                            </Link>
                        </li>
                        <li>
                            <Link href={'https://www.linkedin.com/company/in-the-know-yyc/'} target="_blank">
                                <div className="iconContainer">
                                    <Image src={'/images/social/linkedin.svg'} width={24} height={24} alt="" />
                                </div>
                                /in-the-know-yyc
                            </Link>
                        </li>
                        <li>
                            <Link href={'https://www.instagram.com/intheknowyyc/'} target="_blank">
                                <div className="iconContainer">
                                    <Image src={'/images/social/instagram.svg'} width={24} height={24} alt="" />
                                </div>
                                /intheknowyyc
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </main >
    );
};