"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Header } from "@/components/dashboard/header";
import { Main } from "@/components/dashboard/main";
import { ProfileDropdown } from "@/components/dashboard/profile-dropdown";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Header fixed>
              <div className="ml-auto flex items-center justify-end w-full space-x-4">
                <ProfileDropdown />
              </div>
            </Header>
            <Main>{children}</Main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
