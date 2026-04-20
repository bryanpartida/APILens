function FieldGroup({ title, values, accentClass }) {
  if (!values.length) {
    return null;
  }

  return (
    <div className="min-w-0 rounded-[1.3rem] border border-white/6 bg-white/3 p-4">
      <div className="text-sm font-medium text-slate-200">{title}</div>
      <div className="mt-3 flex min-w-0 flex-wrap gap-2">
        {values.map((value) => (
          <span
            key={value}
            className={`rounded-2xl border px-3 py-1 text-xs sm:text-sm ${accentClass}`}
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
      accentClass: "border-violet-400/18 bg-violet-400/10 text-violet-200",
    },
    {
      title: "String Fields",
      values: collection.stringFields,
      accentClass: "border-cyan-400/18 bg-cyan-400/8 text-cyan-100",
    },
    {
      title: "Boolean Fields",
      values: collection.booleanFields,
      accentClass: "border-emerald-400/18 bg-emerald-400/10 text-emerald-200",
    },
    {
      title: "Date-like Fields",
      values: collection.dateLikeFields,
      accentClass: "border-amber-400/18 bg-amber-400/10 text-amber-200",
    },
    {
      title: "Image-like Fields",
      values: collection.imageFields,
      accentClass: "border-pink-400/18 bg-pink-400/10 text-pink-200",
    },
    {
      title: "Potential Title Fields",
      values: collection.titleFields,
      accentClass: "border-sky-400/18 bg-sky-400/10 text-sky-200",
    },
  ].filter((group) => group.values.length);

  if (!groups.length) {
    return (
      <div className="rounded-[1.3rem] border border-white/6 bg-white/3 p-4 text-sm text-slate-400">
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
