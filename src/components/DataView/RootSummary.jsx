import { formatValue, summarizeValue } from "../../utils/valueFormatters";

function PrimitiveFieldCard({ field }) {
  return (
    <div className="min-w-0 rounded-[1.3rem] border border-white/6 bg-white/3 p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{field.key}</div>
      <div className="mt-3 break-words whitespace-pre-wrap text-base text-slate-100">
        {formatValue(field.value)}
      </div>
    </div>
  );
}

function NestedObjectCard({ objectSummary }) {
  return (
    <div className="min-w-0 rounded-[1.3rem] border border-white/6 bg-white/3 p-4">
      <div className="text-sm font-medium text-white">{objectSummary.path}</div>
      <div className="mt-1 text-sm text-slate-500">
        {objectSummary.keyCount} fields, {objectSummary.primitiveFields.length} primitive fields
      </div>
      <div className="mt-4 grid gap-2">
        {objectSummary.primitiveFields.slice(0, 3).map((field) => (
          <div key={`${objectSummary.path}-${field.key}`} className="text-sm text-slate-300">
            <span className="text-slate-500">{field.key}:</span>{" "}
            <span className="break-words">{summarizeValue(field.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RootSummary({ analysis }) {
  const { rootType, rootSummary } = analysis;

  return (
    <section className="panel-inset w-full min-w-0 overflow-hidden rounded-[1.6rem] p-4 sm:p-6">
      <div className="mb-4">
        <h3 className="text-[1.2rem] font-medium text-slate-200">Root Summary</h3>
        <p className="mt-1 text-sm text-slate-500">
          Primitive fields stay readable here while nested data is split into dedicated
          sections below.
        </p>
      </div>

      {rootType === "primitive" ? (
        <div className="min-w-0 rounded-[1.3rem] border border-white/6 bg-white/3 p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">value</div>
          <div className="mt-3 break-words whitespace-pre-wrap text-base text-slate-100">
            {formatValue(rootSummary.value)}
          </div>
        </div>
      ) : null}

      {rootType === "array" ? (
        <div className="grid min-w-0 gap-3 md:grid-cols-3">
          <div className="min-w-0 rounded-[1.3rem] border border-white/6 bg-white/3 p-4">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Root Dataset</div>
            <div className="mt-3 break-words text-base text-slate-100">
              The root payload is an array with {rootSummary.itemCount} items.
            </div>
          </div>

          {rootSummary.rootCollection ? (
            <>
              <div className="min-w-0 rounded-[1.3rem] border border-white/6 bg-white/3 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Detected Fields
                </div>
                <div className="mt-3 break-words text-base text-slate-100">
                  {rootSummary.rootCollection.fields.join(", ") || "None detected"}
                </div>
              </div>
              <div className="min-w-0 rounded-[1.3rem] border border-white/6 bg-white/3 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Collection Type
                </div>
                <div className="mt-3 break-words text-base text-slate-100">
                  {rootSummary.rootCollection.kind}
                </div>
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      {rootType === "object" ? (
        <div className="space-y-5">
          {rootSummary.primitiveFields.length ? (
            <div className="grid min-w-0 gap-3 md:grid-cols-2 xl:grid-cols-4">
              {rootSummary.primitiveFields.map((field) => (
                <PrimitiveFieldCard key={field.key} field={field} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.3rem] border border-dashed border-white/10 bg-white/3 p-4 text-sm text-slate-400">
              No primitive root fields were detected. This object is mostly nested data.
            </div>
          )}

          {rootSummary.collectionFields.length ? (
            <div className="space-y-3">
              <div className="text-sm font-medium text-slate-200">Collection-like fields</div>
              <div className="flex min-w-0 flex-wrap gap-2">
                {rootSummary.collectionFields.map((collection) => (
                  <span
                    key={collection.path}
                    className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200"
                  >
                    {collection.path} ({collection.itemCount})
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {rootSummary.nestedObjects.length ? (
            <div className="space-y-3">
              <div className="text-sm font-medium text-slate-200">Nested Objects</div>
              <div className="grid min-w-0 gap-3 lg:grid-cols-2">
                {rootSummary.nestedObjects.map((objectSummary) => (
                  <NestedObjectCard
                    key={objectSummary.path}
                    objectSummary={objectSummary}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

export default RootSummary;
