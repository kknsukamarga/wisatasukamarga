"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Header } from "@/components/dashboard/header";
import { Main } from "@/components/dashboard/main";
import { ProfileDropdown } from "@/components/dashboard/profile-dropdown";
import { ThemeSwitch } from "@/components/theme-switch";
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
              <div className="ml-auto flex items-center space-x-4">
                <ThemeSwitch />
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
