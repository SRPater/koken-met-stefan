"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { NavLink } from "./nav-links";
import { NavItem } from "./nav-item";
import { ThemeToggle } from "./theme-toggle";

export function MobileMenu({ navLinks }: { navLinks: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const normalLinks = navLinks.slice(0, -1);
  const actionLink = navLinks[navLinks.length - 1];

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
              {normalLinks.map((link) => (
                <NavItem
                  key={link.kind === "signout" ? "signout" : link.href}
                  link={link}
                  className="font-gaegu text-xl text-stone-800 dark:text-stone-200"
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </nav>

            <NavItem
              link={actionLink}
              className="font-gaegu mt-4 self-start rounded-full bg-crimson px-5 py-2 text-lg text-white transition-colors hover:bg-crimson/90 dark:bg-cyan dark:text-stone-950 dark:hover:bg-cyan/90"
              onNavigate={() => setOpen(false)}
            />

            <div className="mt-auto">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
