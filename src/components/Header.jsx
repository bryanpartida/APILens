import { BrandMark, SearchIcon } from "./Icons";

function Header({ compact = false }) {
  const navItems = [
    { label: "Repository", href: "https://github.com/bryanpartida/APILens" },
    { label: "GitHub", href: "https://github.com/bryanpartida" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/bryan-partida-8a992227b/" },
  ];

  return (
    <header className="relative w-full min-w-0 overflow-hidden border border-zinc-800/80 bg-zinc-950/60 transition-all duration-500 ease-out">
      <div className="absolute inset-x-0 top-0 h-px bg-lime-300/20" />

      <div className={`border-b border-white/6 px-4 py-4 transition-all duration-500 ease-out sm:px-6 ${compact ? "lg:px-8" : "lg:px-11"}`}>
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <a href="#top" className="flex min-w-0 items-center gap-3 sm:gap-4">
            <BrandMark className={`${compact ? "h-11 w-11 sm:h-12 sm:w-12" : "h-12 w-12 sm:h-14 sm:w-14"} shrink-0 transition-all duration-500 ease-out`} />
            <div className="min-w-0 font-mono text-[1.65rem] font-semibold leading-none text-zinc-100 sm:text-[1.95rem]">
              API<span className="text-lime-300">Lens</span>
            </div>
          </a>

          <nav className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 font-mono text-sm text-zinc-500 sm:text-base">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="border-b border-transparent transition hover:border-lime-300/60 hover:text-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300/40 focus:ring-offset-2 focus:ring-offset-zinc-950"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div
        className={`relative px-4 text-center transition-all duration-500 ease-out sm:px-6 ${
          compact ? "py-10 lg:px-8 lg:py-12" : "py-14 lg:px-11 lg:py-20"
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-zinc-700/50" />

        <div className={`relative mx-auto min-w-0 max-w-5xl transition-all duration-500 ease-out ${compact ? "space-y-5" : "space-y-8"}`}>
          <div className={`inline-flex max-w-full items-center gap-3 rounded-md border border-lime-300/30 bg-lime-300/8 px-4 py-2 font-mono text-sm text-lime-300 sm:px-5 sm:py-2.5 ${compact ? "scale-95" : ""} transition-all duration-500 ease-out`}>
            <SearchIcon className="h-5 w-5" />
            <span>json.lens.workspace</span>
          </div>

          <div className="space-y-5">
            <h1
              className={`mx-auto max-w-6xl font-mono text-4xl font-semibold text-zinc-50 transition-all duration-500 ease-out sm:text-5xl ${
                compact ? "lg:text-[4.1rem] lg:leading-[1.05]" : "lg:text-[5.25rem] lg:leading-[1.05]"
              }`}
            >
              Paste API JSON.{" "}
              <span className="text-brand-gradient">Understand it instantly.</span>
            </h1>
            <p
              className={`mx-auto max-w-4xl text-base leading-8 text-zinc-400 transition-all duration-500 ease-out sm:text-xl ${
                compact ? "lg:text-[1.35rem]" : "lg:text-2xl"
              }`}
            >
              A lightweight tool for frontend developers to analyze API responses,
              explore data structures, and preview UI components in seconds.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
