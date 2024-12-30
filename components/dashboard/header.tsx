import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  ref?: React.Ref<HTMLElement>;
}

export const Header = ({
  className,
  fixed,
  children,
  ...props
}: HeaderProps) => {
  const { state } = useSidebar(); // Ambil state sidebar untuk menentukan lebar header
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop);
    };

    // Add scroll listener to the body
    document.addEventListener("scroll", onScroll, { passive: true });

    // Clean up the event listener on unmount
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "flex items-center justify-between gap-3 sm:gap-4 bg-transparent p-4 h-16 transition-[width,height] ease-linear",
        fixed && "header-fixed peer/header fixed z-50 rounded-md",
        state === "expanded"
          ? "w-[calc(100%_-_16rem)]" // Lebar saat sidebar diperluas
          : "w-[calc(100%_-_4rem)]", // Lebar saat sidebar dalam mode ikon
        className
      )}
      {...props}
    >
      <SidebarTrigger variant="outline" className="sm:scale-100 scale-125" />
      <Separator orientation="vertical" className="h-6" />
      {children}
    </header>
  );
};

Header.displayName = "Header";
