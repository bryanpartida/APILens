import { summarizeValue, truncateText } from "../../utils/valueFormatters";

const TABLE_PREVIEW_LIMIT = 25;

function TableCell({ value }) {
  const summary = truncateText(summarizeValue(value), 160);

  return (
    <div
      className="max-w-full break-words whitespace-normal text-sm leading-6 text-slate-300"
      title={typeof value === "string" ? value : undefined}
    >
      {summary}
    </div>
  );
}

function CollectionTable({ collection }) {
  if (!collection) {
    return null;
  }

  if (!collection.itemCount) {
    return (
      <div className="rounded-[1.4rem] border border-dashed border-white/10 bg-white/3 p-5 text-sm text-slate-400">
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

        <div className="w-full max-w-full overflow-x-auto rounded-[1.5rem] border border-white/6 bg-[#081022]">
          <table className="min-w-full table-auto divide-y divide-white/10">
            <thead className="bg-white/2">
              <tr>
                <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-medium text-cyan-300">
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

  return (
    <div className="space-y-3">
      {isLimited ? (
        <div className="text-sm text-slate-500">
          Showing first {TABLE_PREVIEW_LIMIT} of {collection.itemCount} items.
        </div>
      ) : null}

      <div className="w-full max-w-full overflow-x-auto rounded-[1.5rem] border border-white/6 bg-[#081022]">
        <table className="min-w-full table-auto divide-y divide-white/10">
          <thead className="bg-white/2">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="whitespace-nowrap px-4 py-4 text-left text-sm font-medium text-cyan-300"
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
