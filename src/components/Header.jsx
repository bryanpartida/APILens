function Header() {
  return (
    <header className="space-y-4">
      <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
        Developer JSON Inspector
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          APILens
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          Paste API JSON. Understand it instantly.
        </p>
      </div>
    </header>
  );
}

export default Header;
