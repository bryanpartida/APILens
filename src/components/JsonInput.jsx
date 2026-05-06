import ActionBar from "./ActionBar";
import { DatabaseIcon } from "./Icons";

function JsonInput({ value, onChange, onLoadSample, onAnalyze, compact = false }) {
  return (
    <section className="glass-panel w-full min-w-0 overflow-hidden p-4 transition-all duration-500 ease-out sm:p-6">
      <div className={`mb-4 flex min-w-0 flex-col gap-4 transition-all duration-500 ease-out sm:flex-row sm:items-start sm:justify-between ${compact ? "lg:items-center" : ""}`}>
        <div className="flex min-w-0 items-center gap-3">
          <div className="text-lime-300">
            <DatabaseIcon className="h-7 w-7" />
          </div>
          <div className="min-w-0">
            <h2
              className={`font-medium text-white transition-all duration-500 ease-out ${
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
          className="inline-flex w-full shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/4 px-5 py-3 font-mono text-sm text-slate-200 transition hover:border-lime-300/25 hover:bg-lime-300/8 hover:text-white focus:outline-none focus:ring-2 focus:ring-lime-300/40 sm:w-auto"
        >
          Load Sample
        </button>
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder='[\n  {\n    "id": 1,\n    "name": "Example item"\n  }\n]'
        spellCheck="false"
        className={`panel-inset w-full min-w-0 resize-y overflow-x-auto px-4 py-4 font-mono text-sm text-slate-100 outline-none transition-all duration-500 ease-out placeholder:text-zinc-700 focus:border-lime-300/40 focus:ring-2 focus:ring-lime-300/25 sm:px-6 sm:text-base ${
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
