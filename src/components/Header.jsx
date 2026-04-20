import { BrandMark, SearchIcon } from "./Icons";

function Header({ compact = false }) {
  const navItems = [
    { label: "Demo", href: "#workspace" },
    { label: "GitHub", href: "#workspace" },
    { label: "About", href: "#about" },
  ];

  return (
    <header className="relative w-full min-w-0 overflow-hidden rounded-[2rem] border border-white/8 bg-slate-950/25 transition-all duration-500 ease-out">
      <div className="absolute inset-x-0 top-0 h-px bg-white/8" />

      <div className={`border-b border-white/6 px-4 py-4 transition-all duration-500 ease-out sm:px-6 ${compact ? "lg:px-8" : "lg:px-11"}`}>
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <a href="#top" className="flex min-w-0 items-center gap-3 sm:gap-4">
            <BrandMark className={`${compact ? "h-11 w-11 sm:h-12 sm:w-12" : "h-12 w-12 sm:h-14 sm:w-14"} shrink-0 transition-all duration-500 ease-out`} />
            <div className="min-w-0 text-[1.9rem] font-medium leading-none tracking-tight text-white sm:text-[2.2rem]">
              API<span className="text-cyan-400">Lens</span>
            </div>
          </a>

          <nav className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2 text-base text-slate-400 sm:text-lg">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:ring-offset-2 focus:ring-offset-slate-950"
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
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/8 blur-3xl" />

        <div className={`relative mx-auto min-w-0 max-w-5xl transition-all duration-500 ease-out ${compact ? "space-y-5" : "space-y-8"}`}>
          <div className={`inline-flex max-w-full items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/8 px-4 py-2 text-base text-cyan-300 shadow-[0_0_30px_rgba(0,217,255,0.08)] sm:px-6 sm:py-3 sm:text-xl ${compact ? "scale-95" : ""} transition-all duration-500 ease-out`}>
            <SearchIcon className="h-5 w-5" />
            <span>Developer Tool</span>
          </div>

          <div className="space-y-5">
            <h1
              className={`mx-auto max-w-6xl text-4xl font-medium tracking-[-0.04em] text-white transition-all duration-500 ease-out sm:text-5xl ${
                compact ? "lg:text-[4.1rem] lg:leading-[1.05]" : "lg:text-[5.25rem] lg:leading-[1.05]"
              }`}
            >
              Paste API JSON.{" "}
              <span className="text-brand-gradient">Understand it instantly.</span>
            </h1>
            <p
              className={`mx-auto max-w-4xl text-base leading-8 text-slate-400 transition-all duration-500 ease-out sm:text-xl ${
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
