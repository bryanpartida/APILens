import ActionBar from "./ActionBar";
import { DatabaseIcon } from "./Icons";

function JsonInput({ value, onChange, onLoadSample, onAnalyze, compact = false }) {
  return (
    <section className="glass-panel w-full min-w-0 overflow-hidden rounded-[2rem] p-4 transition-all duration-500 ease-out sm:p-6">
      <div className={`mb-4 flex min-w-0 flex-col gap-4 transition-all duration-500 ease-out sm:flex-row sm:items-start sm:justify-between ${compact ? "lg:items-center" : ""}`}>
        <div className="flex min-w-0 items-center gap-3">
          <div className="text-cyan-400">
            <DatabaseIcon className="h-7 w-7" />
          </div>
          <div className="min-w-0">
            <h2
              className={`font-medium tracking-[-0.03em] text-white transition-all duration-500 ease-out ${
                compact ? "text-[1.35rem] sm:text-[1.55rem]" : "text-[1.65rem] sm:text-[1.9rem]"
              }`}
            >
              JSON Input
            </h2>
            <p className="break-words text-sm text-slate-500">
              Paste an array or object from any API response.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLoadSample}
          className="inline-flex w-full shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/4 px-5 py-3 text-base text-slate-200 transition hover:border-cyan-400/25 hover:bg-cyan-400/8 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/40 sm:w-auto sm:text-lg"
        >
          Load Sample
        </button>
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder='[\n  {\n    "id": 1,\n    "name": "Example item"\n  }\n]'
        spellCheck="false"
        className={`panel-inset w-full min-w-0 resize-y overflow-x-auto rounded-[1.6rem] px-4 py-4 font-mono text-sm text-slate-100 outline-none transition-all duration-500 ease-out placeholder:text-slate-600 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/25 sm:px-6 sm:text-base ${
          compact
            ? "h-44 leading-6 sm:h-56 sm:leading-7"
            : "h-[340px] leading-7 sm:h-[420px] sm:leading-8"
        }`}
      />

      <div className="mt-4">
        <ActionBar onAnalyze={onAnalyze} />
      </div>
    </section>
  );
}

export default JsonInput;
