"use client";

import Stats from "@/components/dashboard/stats";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <Stats />
    </SidebarProvider>
  );
}
