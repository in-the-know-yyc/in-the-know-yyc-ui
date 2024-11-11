import {useState} from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function CmsHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {name: 'HOME', href: '/cms'},
    {name: 'Events', href: '/cms/events'},
    {name: 'Messages', href: '/cms/messages'},
    {name: 'Users', href: '/cms/users'}
  ];


  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} id="cmsHeader">
      <NavbarContent>
        <NavbarBrand>
          <Image src={'/images/logo.png'} width={160} height={52} alt="In The Know YYC | Logo" />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          id="CmsResponsiveMenuToggle"
        />
      </NavbarContent>

      {/* PC MENU */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => {
          return(
            <NavbarItem key={index}>
              <Link href={item.href} className="block py-2 px-3">{item.name}</Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* MOBILE MENU */}
      <NavbarMenu id="cmsNavbarMenu">
        {menuItems.map((item, index) => {
          return(
            <NavbarMenuItem key={index}>
              <Link href={item.href} className="block py-2 px-3">{item.name}</Link>
            </NavbarMenuItem>
          );
        })}
        
      </NavbarMenu>
    </Navbar>
  );
}
