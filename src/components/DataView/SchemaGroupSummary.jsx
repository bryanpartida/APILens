function SchemaGroupSummary({ collection, onSelectCollectionPath }) {
  if (!collection?.schemaGroups?.length || collection.schemaGroups.length < 2) {
    return null;
  }

  return (
    <div className="rounded-md border border-white/6 bg-white/3 p-4">
      <div className="text-sm font-medium text-slate-200">Schema Groups</div>
      <p className="mt-1 text-sm text-slate-500">
        APILens found multiple object shapes inside this collection.
      </p>

      <div className="mt-4 grid min-w-0 gap-3 lg:grid-cols-2">
        {collection.schemaGroups.map((group) => {
          const derivedPath = `${collection.path}#${group.label
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")}`;

          return (
            <div
              key={group.id}
              className="min-w-0 rounded-md border border-white/8 bg-black/12 p-3"
            >
              <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                <div className="min-w-0 break-words text-sm font-medium text-white">
                  {group.label}
                </div>
                <span className="rounded bg-white/6 px-2 py-0.5 font-mono text-xs text-slate-400">
                  {group.itemCount} items
                </span>
              </div>

              <div className="mt-3 flex min-w-0 flex-wrap gap-2">
                {group.fields.map((field) => (
                  <span
                    key={`${group.id}-${field}`}
                    className="rounded border border-lime-300/18 bg-lime-300/8 px-2 py-1 font-mono text-xs text-lime-100"
                  >
                    {field}
                  </span>
                ))}
              </div>

              {onSelectCollectionPath ? (
                <button
                  type="button"
                  onClick={() => onSelectCollectionPath(derivedPath)}
                  className="mt-3 rounded-md border border-white/8 bg-white/4 px-3 py-1.5 font-mono text-xs text-slate-200 transition hover:border-lime-300/25 hover:text-lime-100 focus:outline-none focus:ring-2 focus:ring-lime-300/35"
                >
                  Inspect group
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SchemaGroupSummary;
