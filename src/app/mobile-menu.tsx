"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { NavLink } from "./nav-links";
import { NavItem } from "./nav-item";
import { ThemeToggle } from "./theme-toggle";

export function MobileMenu({ navLinks }: { navLinks: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="p-2 text-stone-700 dark:text-stone-300"
      >
        <Menu size={24} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-0 right-0 flex h-full w-64 flex-col gap-6 bg-white p-6 dark:bg-stone-950">
            <button
              onClick={() => setOpen(false)}
              aria-label="Sluit menu"
              className="self-end p-2 text-stone-700 dark:text-stone-300"
            >
              <X size={24} />
            </button>

            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavItem
                  key={link.kind === "signout" ? "signout" : link.href}
                  link={link}
                  className="font-gaegu text-xl text-stone-800 dark:text-stone-200"
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </nav>

            <div className="mt-auto">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
