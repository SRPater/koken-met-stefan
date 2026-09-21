// TODO: replace with a real session check one Auth.js is wired up
export const isLoggedIn = false;

export const navLinks = isLoggedIn
  ? [
      { href: "/", label: "Home" },
      { href: "/recipes", label: "Alle Recepten" },
      { href: "/recipes/new", label: "Recept Toevoegen" },
      { href: "/logout", label: "Uitloggen" },
    ]
  : [
      { href: "/", label: "Home" },
      { href: "/recipes", label: "Alle Recepten" },
      { href: "/login", label: "Inloggen" },
    ];
