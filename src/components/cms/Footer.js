import Link from "next/link";


export default function cmsHome() {
  const year = new Date().getFullYear();
  //const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || process.env.WEBSITE_URL;
  const siteUrl = 'http://intheknowyyc.ca';
  return (


    <footer className="bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © {year} <Link href={siteUrl} className="hover:underline">In The Know YYC</Link> | All Rights Reserved.
      </span>
    </footer>

  );
}