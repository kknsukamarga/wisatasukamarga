import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import MorphNav from "../ui/morph-menu/morph-nav";
import { TangoSans } from "@/app/fonts";

const defaultLinks = [
  { href: "#about", label: "About" },
  { href: "#highlight-wisata", label: "Highlight Wisata" },
  { href: "#highlight-umkm", label: "Highlight UMKM" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#interactive-map", label: "Interactive Map" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

function NavbarMobile({ isLoggedIn }: { isLoggedIn: boolean }) {
  const links = [
    ...defaultLinks,
    {
      href: isLoggedIn ? "/dashboard" : "/sign-in",
      label: isLoggedIn ? "Dashboard" : "Sign-In",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <div className="grid gap-2 py-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const links = [
    ...defaultLinks,
    {
      href: isLoggedIn ? "/dashboard" : "/sign-in",
      label: isLoggedIn ? "Dashboard" : "Sign-In",
    },
  ];

  return (
    <header className="flex h-20 w-full shrink-0 fixed items-center px-4 md:px-6 z-50 text-white">
      {/* <NavbarMobile isLoggedIn={isLoggedIn} /> */}
      <Link
        href="/"
        className="mr-6 gap-4 flex items-center bg-gray px-4 py-2.5 shadow-md rounded-full text-white"
        prefetch={false}
      >
        <MountainIcon className="h-6 w-6" />
        <p>Suka Marga</p>
      </Link>
      {/* <nav className="ml-auto hidden lg:flex gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            prefetch={false}
          >
            {link.label}
          </Link>
        ))}
      </nav> */}

      <MorphNav />
    </header>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export default Navbar;
