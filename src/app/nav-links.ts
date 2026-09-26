export type NavLink =
  | { kind: "link"; href: string; label: string }
  | { kind: "signout"; label: string };

export function getNavLinks(isLoggedIn: boolean): NavLink[] {
  const base: NavLink[] = [
    { kind: "link", href: "/", label: "Home" },
    { kind: "link", href: "/recipes", label: "Alle Recepten" },
  ];

  if (isLoggedIn) {
    return [
      ...base,
      { kind: "link", href: "/recipes/new", label: "Recept toevoegen" },
      { kind: "signout", label: "Uitloggen" },
    ];
  }

  return [...base, { kind: "link", href: "/login", label: "Inloggen" }];
}
