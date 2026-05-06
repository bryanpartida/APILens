import { useState } from "react";
import { formatValue, summarizeValue, truncateText } from "../../utils/valueFormatters";

const TABLE_PREVIEW_LIMIT = 25;

function TableCell({ value }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isNested = value !== null && typeof value === "object";
  const formattedValue = formatValue(value);
  const summary = truncateText(summarizeValue(value), 160);
  const canExpand = isNested || formattedValue.length > summary.length;

  return (
    <div className="max-w-full space-y-2 text-sm leading-6 text-slate-300">
      <div
        className="max-w-full break-words whitespace-normal"
        title={typeof value === "string" ? value : undefined}
      >
        {summary}
      </div>

      {canExpand ? (
        <button
          type="button"
          onClick={() => setIsExpanded((current) => !current)}
          className="rounded-md border border-lime-300/20 bg-lime-300/8 px-2 py-1 font-mono text-xs text-lime-200 transition hover:border-lime-300/35 hover:bg-lime-300/12 focus:outline-none focus:ring-2 focus:ring-lime-300/35"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      ) : null}

      {isExpanded ? (
        <pre className="max-h-64 max-w-[22rem] overflow-auto whitespace-pre-wrap break-words rounded-md border border-white/8 bg-black/20 p-3 text-xs leading-5 text-slate-200 sm:max-w-[32rem]">
          {formattedValue}
        </pre>
      ) : null}
    </div>
  );
}

function CollectionTable({ collection }) {
  if (!collection) {
    return null;
  }

  if (!collection.itemCount) {
    return (
      <div className="rounded-md border border-dashed border-white/10 bg-white/3 p-5 text-sm text-slate-400">
        This collection is empty.
      </div>
    );
  }

  const previewRows = collection.items.slice(0, TABLE_PREVIEW_LIMIT);
  const isLimited = collection.itemCount > TABLE_PREVIEW_LIMIT;

  if (collection.kind === "array-of-primitives") {
    return (
      <div className="space-y-3">
        {isLimited ? (
          <div className="text-sm text-slate-500">
            Showing first {TABLE_PREVIEW_LIMIT} of {collection.itemCount} items.
          </div>
        ) : null}

        <div className="w-full max-w-full overflow-x-auto rounded-md border border-white/6 bg-zinc-950">
          <table className="min-w-full table-auto divide-y divide-white/10">
            <thead className="bg-white/2">
              <tr>
                <th className="whitespace-nowrap px-4 py-4 text-left font-mono text-sm font-medium text-lime-300">
                  value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/6">
              {previewRows.map((value, index) => (
                <tr key={`${collection.path}-${index}`}>
                  <td className="max-w-[26rem] px-4 py-4 align-top">
                    <TableCell value={value} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const objectRows = previewRows.filter(
    (item) => item && typeof item === "object" && !Array.isArray(item),
  );
  const columns = collection.fields.length ? collection.fields : ["value"];
  const hiddenPreviewItems = previewRows.length - objectRows.length;

  return (
    <div className="space-y-3">
      {isLimited ? (
        <div className="text-sm text-slate-500">
          Showing first {TABLE_PREVIEW_LIMIT} of {collection.itemCount} items.
        </div>
      ) : null}

      {hiddenPreviewItems > 0 ? (
        <div className="text-sm text-slate-500">
          This mixed collection has {hiddenPreviewItems} primitive preview item
          {hiddenPreviewItems === 1 ? "" : "s"} outside the object table.
        </div>
      ) : null}

      <div className="w-full max-w-full overflow-x-auto rounded-md border border-white/6 bg-zinc-950">
        <table className="min-w-full table-auto divide-y divide-white/10">
          <thead className="bg-white/2">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="whitespace-nowrap px-4 py-4 text-left font-mono text-sm font-medium text-lime-300"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/6">
            {objectRows.map((row, index) => (
              <tr key={row.id ?? row.slug ?? `${collection.path}-${index}`}>
                {columns.map((column) => (
                  <td
                    key={`${collection.path}-${index}-${column}`}
                    className="min-w-0 max-w-[16rem] px-4 py-4 align-top sm:max-w-[22rem]"
                  >
                    <TableCell value={row[column]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CollectionTable;
