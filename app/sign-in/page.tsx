// "use client";
// import { SubmitButton } from "@/components/SubmitButton";
// import { signInAction } from "@/lib/actions";
// import Link from "next/link";
// import { redirect } from "next/navigation";

// export default function SignInPage() {
//   const handleFormSubmit = async (formData: FormData) => {
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     const res = await signInAction({ email, password });
//     if (res.error) {
//       alert(res.error);
//       return;
//     }
//     redirect("/dashboard");
//   };

//   return (
//     <main>
//       <Link className="home-link" href="/">
//         ◄ Home
//       </Link>

//       <form className="main-container" action={handleFormSubmit}>
//         <h1 className="header-text">Sign In</h1>
//         <input name="email" type="email" placeholder="Email" />
//         <input name="password" type="password" placeholder="Password" />
//         <SubmitButton pendingText="Loggin in...">Login</SubmitButton>
//         <Link className="auth-link" href="/sign-up">
//           Don't have an account? Sign Up
//         </Link>
//       </form>
//     </main>
//   );
// }

import { GalleryVerticalEnd } from "lucide-react";

import { SignInForm } from "@/components/auth/sign-in-form";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          {/* <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a> */}
          <Link
            href="/"
            className="gap-4 flex items-center bg-gray px-4 py-2.5 shadow-md rounded-full text-white"
            prefetch={false}
          >
            <Image
              src="/logo-putih.png"
              alt="logo-putih"
              width={1201}
              height={936}
              className="h-8 w-16"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignInForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/wisata/kawah-nirwana.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
