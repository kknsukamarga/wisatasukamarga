import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted py-8 md:py-12">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-4 md:px-6 lg:max-w-7xl">
        <div className="flex flex-col items-start gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">Acme Inc</span>
          </Link>
          <p className="text-muted-foreground">
            Beautifully designed components that you can copy and paste into
            your apps.
          </p>
        </div>
        <div className="grid gap-2">
          <h4 className="text-sm font-semibold">Quick Links</h4>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Home
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Products
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Contact
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="text-sm font-semibold">Resources</h4>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Documentation
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Blog
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Support
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            FAQs
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="text-sm font-semibold">Legal</h4>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Cookie Policy
          </Link>
        </div>
      </div>
      <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground md:mt-12 md:pt-6">
        <p>&copy; 2024 Acme Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

function MountainIcon(props: any) {
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
