import { auth, signOut } from "@/auth";

// import Link from "next/link";

// const DashboardPage = async () => {
//   const session = await auth();
//   return (
//     <main>
//       <Link className="home-link" href="/">
//         ◄ Home
//       </Link>

//       <section className="main-container">
//         <h1 className="header-text">This is a Protected Page</h1>
//         <p>Current User username : {session?.user?.email || "None"}</p>
//       </section>
//     </main>
//   );
// };

// export default DashboardPage;

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import SignOutButton from "@/components/dashboard/sign-out";
import { SubmitButton } from "@/components/SubmitButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  isRedirectError,
  redirect,
} from "next/dist/client/components/redirect";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-1 w-full items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <form
            action={async () => {
              "use server";

              try {
                await signOut({ redirect: false });
              } catch (err) {
                if (isRedirectError(err)) {
                  console.error(err);
                  throw err;
                }
              } finally {
                redirect("/");
              }
            }}
            className="pr-4"
          >
            <SubmitButton
              pendingText="Signing out..."
              className="p-2 px-4 bg-[hsl(191,52%,30%)] hover:bg-[hsl(191,52%,35%)] rounded-sm"
            >
              Sign Out
            </SubmitButton>
          </form>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-h-screen mt-20">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
