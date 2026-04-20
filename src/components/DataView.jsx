import { getRootMetadata } from "../utils/detectSchema";
import { inferFieldTypes, getNumericFields } from "../utils/inferFieldTypes";
import { formatValue } from "../utils/flattenObject";

function MetadataCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

function ValueBlock({ value }) {
  const isNested = value !== null && typeof value === "object";

  if (isNested) {
    return (
      <pre className="overflow-x-auto rounded-xl bg-slate-950/80 p-3 text-xs leading-6 text-slate-300">
        {formatValue(value)}
      </pre>
    );
  }

  return <span className="text-sm text-slate-200">{formatValue(value)}</span>;
}

function DataTable({ rows }) {
  const columns = Array.from(
    new Set(rows.filter((row) => row && typeof row === "object").flatMap((row) => Object.keys(row))),
  );

  return (
    <div className="overflow-x-auto rounded-3xl border border-white/10">
      <table className="min-w-full divide-y divide-white/10">
        <thead className="bg-white/5">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-white/8 bg-slate-900/60">
          {rows.map((row, index) => (
            <tr key={row.id ?? row.slug ?? index} className="align-top">
              {columns.map((column) => (
                <td key={`${index}-${column}`} className="max-w-xs px-4 py-4 text-sm text-slate-200">
                  <ValueBlock value={row?.[column]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ObjectCard({ data }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">{key}</div>
          <ValueBlock value={value} />
        </div>
      ))}
    </div>
  );
}

function PrimitiveCard({ value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">Value</div>
      <ValueBlock value={value} />
    </div>
  );
}

function NumericFields({ fields }) {
  if (!fields.length) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/75 p-5">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-white">Numeric Fields</h3>
        <p className="text-sm text-slate-400">
          Useful columns for quick sorting, filtering, or future charting.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {fields.map((field) => (
          <span
            key={field}
            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-100"
          >
            {field}
          </span>
        ))}
      </div>
    </section>
  );
}

function DataView({ data }) {
  const metadata = getRootMetadata(data);
  const fieldTypes = inferFieldTypes(data);
  const numericFields = Array.isArray(data)
    ? Array.from(
        new Set(
          data
            .filter((item) => item && typeof item === "object" && !Array.isArray(item))
            .flatMap((item) => getNumericFields(item)),
        ),
      )
    : getNumericFields(data);

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <MetadataCard label="Root Type" value={metadata.rootType} />
        <MetadataCard
          label="Items"
          value={metadata.itemCount ?? (metadata.rootType === "object" ? 1 : "n/a")}
        />
        <MetadataCard label="Detected Fields" value={metadata.keys.length || "n/a"} />
      </div>

      <section className="rounded-3xl border border-white/10 bg-slate-900/75 p-5">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-white">Detected Keys</h3>
          <p className="text-sm text-slate-400">Top-level fields found in the current payload.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {metadata.keys.length ? (
            metadata.keys.map((key) => (
              <span
                key={key}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
              >
                {key}
              </span>
            ))
          ) : (
            <span className="text-sm text-slate-400">No object keys detected at the root.</span>
          )}
        </div>
      </section>

      <NumericFields fields={numericFields} />

      <section className="rounded-3xl border border-white/10 bg-slate-900/75 p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">Detected Field Types</h3>
          <p className="text-sm text-slate-400">
            Quick schema hints based on the values currently in the payload.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {Object.keys(fieldTypes).length ? (
            Object.entries(fieldTypes).map(([field, types]) => (
              <div key={field} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-medium text-white">{field}</div>
                <div className="mt-2 text-sm text-slate-400">{types.join(", ")}</div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
              Schema hints appear when the root value is an object or array of objects.
            </div>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-slate-900/75 p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">Structured Output</h3>
          <p className="text-sm text-slate-400">
            Nested values stay safe and readable instead of breaking the UI.
          </p>
        </div>

        {Array.isArray(data) ? (
          <DataTable rows={data} />
        ) : data !== null && typeof data === "object" ? (
          <ObjectCard data={data} />
        ) : (
          <PrimitiveCard value={data} />
        )}
      </section>
    </section>
  );
}

export default DataView;
