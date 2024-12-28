import { signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { SubmitButton } from "../SubmitButton";

function SignOutButton() {
  return (
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
    >
      <SubmitButton
        pendingText="Signing out..."
        className="p-2 px-4 mt-4 bg-[hsl(191,52%,30%)] hover:bg-[hsl(191,52%,35%)] rounded-sm"
      >
        Sign Out
      </SubmitButton>
    </form>
  );
}

export default SignOutButton;
