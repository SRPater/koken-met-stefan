export type NavLink =
  | { kind: "link"; href: string; label: string }
  | { kind: "signout"; label: string };

export function getNavLinks(isLoggedIn: boolean): NavLink[] {
  const base: NavLink[] = [
    { kind: "link", href: "/", label: "Home" },
    { kind: "link", href: "/recepten", label: "Alle Recepten" },
  ];

  if (isLoggedIn) {
    return [
      ...base,
      { kind: "link", href: "/recepten/nieuw", label: "Recept toevoegen" },
      { kind: "signout", label: "Uitloggen" },
    ];
  }

  return [...base, { kind: "link", href: "/login", label: "Inloggen" }];
}
