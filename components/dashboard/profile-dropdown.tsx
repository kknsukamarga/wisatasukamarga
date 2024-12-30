import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleSignOut } from "@/actions/sign-out";
import { SubmitButton } from "../SubmitButton";
import { LogOut } from "lucide-react";

export function ProfileDropdown() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">satnaing</p>
            <p className="text-xs leading-none text-muted-foreground">
              satnaingdev@gmail.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <form action={handleSignOut}>
          <DropdownMenuItem>
            <Button
              variant="ghost"
              size={"sm"}
              className="w-full h-6 flex justify-between items-center px-0"
            >
              <div className="w-full font-normal flex gap-2 items-center">
                <LogOut />
                Log out
              </div>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </Button>
            {/* <SubmitButton pendingText="Signing out...">Log out</SubmitButton> */}
            {/* Log out */}
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
