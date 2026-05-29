function FieldGroup({ title, values, accentClass }) {
  if (!values.length) {
    return null;
  }

  return (
    <div className="min-w-0 rounded-md border border-white/6 bg-white/3 p-4">
      <div className="text-sm font-medium text-slate-200">{title}</div>
      <div className="mt-3 flex min-w-0 flex-wrap gap-2">
        {values.map((value) => (
          <span
            key={value}
            className={`rounded-md border px-3 py-1 font-mono text-xs sm:text-sm ${accentClass}`}
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

function FieldTypeSummary({ collection }) {
  if (!collection) {
    return null;
  }

  const groups = [
    {
      title: "Numeric Fields",
      values: collection.numericFields,
      accentClass: "border-amber-300/20 bg-amber-300/10 text-amber-200",
    },
    {
      title: "String Fields",
      values: collection.stringFields,
      accentClass: "border-lime-300/18 bg-lime-300/8 text-lime-100",
    },
    {
      title: "Boolean Fields",
      values: collection.booleanFields,
      accentClass: "border-zinc-500/30 bg-zinc-500/10 text-zinc-200",
    },
    {
      title: "Date-like Fields",
      values: collection.dateLikeFields,
      accentClass: "border-amber-300/18 bg-amber-300/10 text-amber-200",
    },
    {
      title: "Image-like Fields",
      values: collection.imageFields,
      accentClass: "border-zinc-500/30 bg-zinc-500/10 text-zinc-200",
    },
    {
      title: "Potential Title Fields",
      values: collection.titleFields,
      accentClass: "border-lime-300/18 bg-lime-300/8 text-lime-100",
    },
  ].filter((group) => group.values.length);

  if (!groups.length) {
    return (
      <div className="rounded-md border border-white/6 bg-white/3 p-4 text-sm text-slate-400">
        This collection does not expose typed object fields yet.
      </div>
    );
  }

  return (
    <div className="grid min-w-0 gap-3 lg:grid-cols-2">
      {groups.map((group) => (
        <FieldGroup
          key={group.title}
          title={group.title}
          values={group.values}
          accentClass={group.accentClass}
        />
      ))}
    </div>
  );
}

export default FieldTypeSummary;
