import Link from "next/link";
import "../../app/styles/cms/header.css";

export default function cmsHome() {
    return (
      <>
        <header id="cmsHeader">
          <ul>
          <li><Link href='/cms/events'>Events</Link></li>
          <li><Link href='/cms/newsletters'>Newsletter</Link></li>
          <li><Link href='/cms/users'>Users</Link></li>
          <li><Link href='/cms/messages'>Messages</Link></li>
          <li><Link href='/cms/login'>Log out</Link></li>
          </ul>
        </header>
      </>
    );
  }