"use client";

import * as React from "react";
import { SidebarMenu } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  return (
    <SidebarMenu>
      <Link
        href={"/"}
        className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground p-2"
      >
        <Image
          src="/logo-no-text.png"
          alt="logo-putih"
          width={1201}
          height={936}
          className="h-6 w-16"
        />
      </Link>
    </SidebarMenu>
  );
}
