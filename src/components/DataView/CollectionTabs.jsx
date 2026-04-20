function CollectionTabs({ collections, selectedPath, onSelect, compact = false }) {
  if (!collections.length) {
    return null;
  }

  return (
    <div className="flex min-w-0 flex-wrap gap-2">
      {collections.map((collection) => {
        const isActive = collection.path === selectedPath;

        return (
          <button
            key={collection.path}
            type="button"
            onClick={() => onSelect(collection.path)}
            className={`inline-flex min-w-0 items-center gap-2 rounded-2xl border px-3 py-2 text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-400/40 ${
              isActive
                ? "border-cyan-400/30 bg-cyan-400/12 text-cyan-200"
                : "border-white/8 bg-white/4 text-slate-300 hover:border-cyan-400/18 hover:bg-cyan-400/8"
            } ${compact ? "text-sm" : "text-sm sm:text-base"}`}
          >
            <span className="max-w-full break-words">{collection.path}</span>
            <span className="shrink-0 rounded-full bg-black/20 px-2 py-0.5 text-xs text-slate-400">
              {collection.itemCount}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default CollectionTabs;
