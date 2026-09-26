"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import type { NavLink } from "./nav-links";

export function NavItem({
  link,
  className,
  onNavigate,
}: {
  link: NavLink;
  className?: string;
  onNavigate?: () => void;
}) {
  if (link.kind === "signout") {
    return (
      <button
        type="button"
        onClick={() => {
          onNavigate?.();
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                window.location.href="/";
              },
            },
          });
        }}
        className={className}
      >
        {link.label}
      </button>
    );
  }

  return (
    <Link href={link.href} className={className} onClick={onNavigate}>
      {link.label}
    </Link>
  );
}
