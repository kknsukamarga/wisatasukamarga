"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import { TeamSwitcher } from "@/components/dashboard/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Wisata",
      url: "/wisata",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Tambah Spot Wisata",
          url: "/dashboard/wisata/create",
        },
        {
          title: "Tambah Daya Tarik",
          url: "/dashboard/wisata/create-dayatarik",
        },
        {
          title: "Data Wisata",
          url: "/dashboard/wisata/list",
        },
        {
          title: "Data Daya Tarik",
          url: "/dashboard/wisata/list-dayatarik",
        },
      ],
    },
    {
      title: "UMKM",
      url: "/umkm",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Tambah UMKM",
          url: "/dashboard/umkm/create",
        },
        {
          title: "Data UMKM",
          url: "/dashboard/umkm/list",
        },
      ],
    },
    {
      title: "Blog/Artikel",
      url: "#",
      isActive: true,
      icon: BookOpen,
      items: [
        {
          title: "Tambah Blog/Artikel",
          url: "/dashboard/blog-article/create",
        },
        {
          title: "Data Blog/Artikel",
          url: "/dashboard/blog-article/list",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
