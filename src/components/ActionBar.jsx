function ActionBar({ onLoadSample, onAnalyze }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={onLoadSample}
        className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
      >
        Load Sample
      </button>

      <button
        type="button"
        onClick={onAnalyze}
        className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
      >
        Analyze
      </button>
    </div>
  );
}

export default ActionBar;
