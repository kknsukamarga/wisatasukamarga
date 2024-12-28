"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  pendingText: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type="submit"
      aria-disabled={pending}
      className="bg-primary text-primary-foreground rounded-md p-2 px-4"
    >
      {pending ? pendingText : children}
    </button>
  );
}
