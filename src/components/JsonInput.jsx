function JsonInput({ value, onChange }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/75 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Raw JSON Input</h2>
          <p className="text-sm text-slate-400">
            Paste an array or object from any API response.
          </p>
        </div>
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder='[\n  {\n    "id": 1,\n    "name": "Example item"\n  }\n]'
        spellCheck="false"
        className="min-h-[320px] w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-4 font-mono text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
      />
    </section>
  );
}

export default JsonInput;
