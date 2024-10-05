import Link from 'next/link';
import Image from 'next/image';
import "../app/styles/components/header.css";

const Header = () => {
  return (
    <header>
      <div>
        <Image src='/images/logo.svg' alt="In The Know YYC - Logo" width={83} height={54} />
      </div>
      <form action='#' method='get'>
        <div className='headerInputContainer'>
          <input id='inputSearchHeader' type='text' placeholder='Search Event' />
        </div>
        <div className='headerInputContainer'>
          <input id='inputLocationHeader' type='text' placeholder='Calgary, AB' />
        </div>
        <button></button>
      </form>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/events">All Events</Link></li>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/login">Log In</Link></li>
          <li><button>Sign Up</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 