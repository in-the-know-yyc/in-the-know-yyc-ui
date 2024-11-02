import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import SearchEventInput from './SearchEventInput'
import "../app/styles/components/header.css";

// HOOK TO OPEN AND CLOSE THE MENU IN MOBILE VERSION
import useMobileMenuToggle from '../hooks/useMobileMenuToggle';


const Header = () => {
  // Functionality for main menu in responsive version
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
        <form action='/events' method='get' id="headerEventSearchForm">
          <SearchEventInput inputId={'inputSearchHeader'} formId={'headerEventSearchForm'} />
        </form>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><a href='/events'>All Events</a></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            {/*
            <li><Link href="/login">Log In</Link></li>
            <li><Link href="/signup" className='button'>Sign Up</Link></li>
            */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 