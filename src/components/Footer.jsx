function Footer() {
  const links = [
    { label: "Repository", href: "https://github.com/bryanpartida/APILens" },
    { label: "GitHub", href: "https://github.com/bryanpartida" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/bryan-partida-8a992227b/" },
  ];

  return (
    <footer className="border-t border-zinc-800/80 py-8">
      <div className="mx-auto flex w-full max-w-5xl min-w-0 flex-col gap-4 px-1 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-mono">
          Built by <span className="text-zinc-300">Bryan Partida</span> for APILens.
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300/40"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
