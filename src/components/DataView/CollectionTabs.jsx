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
            className={`inline-flex min-w-0 items-center gap-2 rounded-md border px-3 py-2 font-mono text-left transition focus:outline-none focus:ring-2 focus:ring-lime-300/40 ${
              isActive
                ? "border-lime-300/30 bg-lime-300/12 text-lime-200"
                : "border-white/8 bg-white/4 text-slate-300 hover:border-lime-300/18 hover:bg-lime-300/8"
            } ${compact ? "text-sm" : "text-sm sm:text-base"}`}
          >
            <span className="max-w-full break-words">{collection.path}</span>
            <span className="shrink-0 rounded bg-black/30 px-2 py-0.5 text-xs text-slate-400">
              {collection.itemCount}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default CollectionTabs;
