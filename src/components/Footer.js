import Image from "next/image";
import Link from 'next/link';
import "../app/styles/components/footer.css";

const Footer = () => {
    return (
      <footer>
        <div className="newsletter-container">
            <div>
                <h3>Subscribe to our Newsletter!</h3>
                <p>Get information about all the Tech events happening around you</p>
            </div>
            <div>
                <form>
                    <input type='text' placeholder='Enter your email' />
                    <button>Subscribe</button>
                </form>
            </div>
        </div>
        <div className="nav-container">
            <div>
                <Image src="images/logo-white.svg" alt="In The Know YYC - Logo White" width={168} height={106} />
            </div>
            <div>
                <h3>Your Account</h3>
                <ul>
                    <li><Link href="#">Log In</Link></li>
                    <li><Link href="#">Sign Up</Link></li>
                </ul>
            </div>
            <div>
                <h3>Legal</h3>
                <ul>
                    <li><Link href="#">Privacy Policy</Link></li>
                    <li><Link href="#">Terms and Conditions</Link></li>
                </ul>
            </div>
            <div>
                <h3>Company</h3>
                <ul>
                    <li><Link href="#">Events</Link></li>
                    <li><Link href="#">About Us</Link></li>
                    <li><Link href="#">Contact Us</Link></li>
                    <li><Link href="#">FAQ</Link></li>
                </ul>
            </div>
            <div className="social-container">
                <h3>Social Media (Follow Us)</h3>
                <ul>
                    <li>
                        <Link href="#">
                            <Image src="images/social/x.svg" alt="X icon" width={19} height={16} />
                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <Image src="images/social/facebook.svg" alt="Facebook icon" width={17} height={16} />
                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <Image src="images/social/linkedin.svg" alt="Linkedin icon" width={17} height={16} />
                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <Image src="images/social/instagram.svg" alt="Instagram icon" width={16} height={15} />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        <div className="copyright-container">
            <p>
                &copy; 2024 Copyright - All rights reserved by <span>YYC</span>
            </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;