function EmptyState() {
  return (
    <section className="rounded-3xl border border-dashed border-white/12 bg-white/4 p-8 text-center">
      <div className="mx-auto max-w-xl space-y-3">
        <h2 className="text-xl font-semibold text-white">Ready when your JSON is</h2>
        <p className="text-sm leading-6 text-slate-400">
          Load the sample data or paste your own API response to see a cleaner data
          view and a UI-style preview side by side.
        </p>
      </div>
    </section>
  );
}

export default EmptyState;
