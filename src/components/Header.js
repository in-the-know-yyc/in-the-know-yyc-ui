import Link from 'next/link';
import Image from 'next/image';
import "../app/styles/components/header.css";

// HOOK TO OPEN AND CLOSE THE MENU IN MOBILE VERSION
import useMobileMenuToggle from '../hooks/useMobileMenuToggle';

const Header = () => {

  useMobileMenuToggle();

  return (
    <header id="mainMenuHeader">
      <div className='headerContainer'>
        <div>
          <Link href="/">
            <Image src='/images/logo.svg' alt="In The Know YYC - Logo" width={83} height={54} />
          </Link>
        </div>
        <button className='onlyMobile toggleMenu' id="toggleMobileMenu"><Image src={'/images/icons/menu.svg'} width={37} height={27} alt='' /></button>
        <form action='/events' method='get'>
          <div className='headerInputContainer'>
            <input id='inputSearchHeader' type='text' placeholder='Search Event' name='search' />
          </div>
          {/* 
        <div className='headerInputContainer'>
          <input id='inputLocationHeader' type='text' placeholder='Calgary, AB' />
        </div>
        */}
          <button></button>
        </form>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/events">All Events</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/login">Log In</Link></li>
            <li><Link href="/signup" className='button'>Sign Up</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 