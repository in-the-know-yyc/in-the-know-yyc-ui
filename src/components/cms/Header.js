
import Link from "next/link";
import "../../app/styles/cms/header.css";
import Image from "next/image";
import * as Flowbite from "flowbite-react"

export default function cmsHome() {
  return (
    <header id="cmsHeader">


      <nav className="border-gray-900 border-b-2 bg-white">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
          <Image src={'/images/logo.png'} width={160} height={52} alt="In The Know YYC - Logo" />
          <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
            <button data-collapse-toggle="mega-menu" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mega-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div id="mega-menu" className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
              <li>
                <Link href="#" className="block py-2 px-3 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 " aria-current="page">Home</Link>
              </li>
              <li>
                <Link href="#" className="block py-2 px-3 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 ">Events</Link>
              </li>
              <li>
                <Link href="#" className="block py-2 px-3 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 ">Messages</Link>
              </li>
              <li>
                <Link href="#" className="block py-2 px-3 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 ">Users</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </header>
  );
}