import CollectionTabs from "../DataView/CollectionTabs";
import { choosePrimaryCollection } from "../../utils/previewDetection";
import { formatValue, summarizeValue } from "../../utils/valueFormatters";
import PreviewCard from "./PreviewCard";
import PreviewCardGrid from "./PreviewCardGrid";

function RootContext({ fields }) {
  if (!fields.length) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-slate-200">Root Context</div>
      <div className="flex min-w-0 flex-wrap gap-2">
        {fields.map((field) => (
          <span
            key={field.key}
            className="rounded-2xl border border-cyan-400/18 bg-cyan-400/8 px-3 py-1.5 text-sm text-cyan-100 break-words"
          >
            {field.key}: {formatValue(field.value)}
          </span>
        ))}
      </div>
    </div>
  );
}

function PrimitiveCollectionPreview({ collection }) {
  return (
    <div className="panel-inset rounded-[1.7rem] p-4 sm:p-5">
      <div className="mb-4 text-sm text-slate-500">
        This dataset is an array of primitives, so APILens is previewing it as a
        structured list instead of cards.
      </div>

      <div className="flex min-w-0 flex-wrap gap-2">
        {collection.items.slice(0, 20).map((item, index) => (
          <span
            key={`${collection.path}-${index}`}
            className="rounded-2xl border border-white/8 bg-white/4 px-3 py-2 text-sm text-slate-200"
          >
            {typeof item === "object" ? summarizeValue(item) : formatValue(item)}
          </span>
        ))}
      </div>
    </div>
  );
}

function UIPreview({
  analysis,
  selectedCollectionPath,
  onSelectCollectionPath,
  primaryCollection,
}) {
  const selectedCollection =
    analysis.collections.find((collection) => collection.path === selectedCollectionPath) ||
    primaryCollection ||
    choosePrimaryCollection(analysis.data, analysis.collections) ||
    null;

  const rootContextFields =
    analysis.rootType === "object"
      ? analysis.rootSummary.primitiveFields.slice(0, 4)
      : [];

  if (selectedCollection) {
    return (
      <section className="w-full min-w-0 space-y-5">
        <div>
          <h2 className="text-[1.55rem] font-medium tracking-[-0.03em] text-white">
            UI Preview
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            APILens selected <span className="text-cyan-300">{selectedCollection.path}</span>{" "}
            as the most meaningful dataset for UI cards.
          </p>
        </div>

        {analysis.collections.length > 1 ? (
          <CollectionTabs
            collections={analysis.collections}
            selectedPath={selectedCollection.path}
            onSelect={onSelectCollectionPath}
            compact
          />
        ) : null}

        {analysis.rootType === "object" && selectedCollection.path !== "root" ? (
          <RootContext fields={rootContextFields} />
        ) : null}

        {selectedCollection.kind === "array-of-objects" ? (
          <PreviewCardGrid
            items={selectedCollection.items.filter(
              (item) => item && typeof item === "object" && !Array.isArray(item),
            )}
          />
        ) : (
          <PrimitiveCollectionPreview collection={selectedCollection} />
        )}
      </section>
    );
  }

  if (analysis.rootType === "object") {
    return (
      <section className="w-full min-w-0 space-y-5">
        <div>
          <h2 className="text-[1.55rem] font-medium tracking-[-0.03em] text-white">
            UI Preview
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            No array-of-object collection was found, so APILens is previewing the root
            object as a single card.
          </p>
        </div>

        <div className="grid min-w-0 gap-5 xl:grid-cols-3">
          <PreviewCard item={analysis.data} featured />
        </div>
      </section>
    );
  }

  return (
    <section className="panel-inset rounded-[1.7rem] p-5 text-center">
      <h2 className="text-[1.55rem] font-medium tracking-[-0.03em] text-white">
        UI Preview
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        This payload does not expose an object dataset that can be previewed as cards
        yet.
      </p>
    </section>
  );
}

export default UIPreview;
