import { DatabaseIcon, GridIcon, HashIcon } from "../Icons";
import CollectionTable from "./CollectionTable";
import CollectionTabs from "./CollectionTabs";
import FieldTypeSummary from "./FieldTypeSummary";
import RootSummary from "./RootSummary";
import StructureOverview from "./StructureOverview";

function MetadataCard({ label, value, icon, accentClass = "text-cyan-300" }) {
  return (
    <div className="panel-inset min-w-0 rounded-[1.5rem] p-4 sm:p-5">
      <div className="flex min-w-0 items-center gap-3 text-slate-500">
        <span className={`shrink-0 ${accentClass}`}>{icon}</span>
        <span className="break-words text-sm sm:text-base">{label}</span>
      </div>
      <div className="mt-5 break-words text-2xl font-medium tracking-[-0.03em] text-white sm:text-3xl">
        {value}
      </div>
    </div>
  );
}

function DataView({ analysis, selectedCollectionPath, onSelectCollectionPath, primaryCollection }) {
  const selectedCollection =
    analysis.collections.find((collection) => collection.path === selectedCollectionPath) ||
    primaryCollection ||
    analysis.collections[0] ||
    null;

  return (
    <section className="w-full min-w-0 space-y-5">
      <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetadataCard
          label="Root Type"
          value={analysis.rootType}
          icon={<DatabaseIcon className="h-6 w-6" />}
        />
        <MetadataCard
          label="Top-level Keys"
          value={analysis.topLevelKeys.length || "n/a"}
          icon={<HashIcon className="h-6 w-6" />}
          accentClass="text-violet-300"
        />
        <MetadataCard
          label="Detected Collections"
          value={analysis.collectionCount || "0"}
          icon={<GridIcon className="h-6 w-6" />}
        />
        <MetadataCard
          label="Nested Objects"
          value={analysis.nestedObjectCount || "0"}
          icon={<HashIcon className="h-6 w-6" />}
          accentClass="text-amber-300"
        />
      </div>

      <RootSummary analysis={analysis} />
      <StructureOverview structure={analysis.structureOverview} />

      {analysis.collections.length ? (
        <section className="panel-inset w-full min-w-0 overflow-hidden rounded-[1.6rem] p-4 sm:p-6">
          <div className="mb-4">
            <h3 className="text-[1.2rem] font-medium text-slate-200">
              Detected Collections
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Arrays are promoted into inspectable datasets instead of being left as raw
              nested JSON.
            </p>
          </div>

          {analysis.collections.length > 1 ? (
            <div className="mb-5">
              <CollectionTabs
                collections={analysis.collections}
                selectedPath={selectedCollection?.path}
                onSelect={onSelectCollectionPath}
              />
            </div>
          ) : null}

          {selectedCollection ? (
            <div className="space-y-5">
              <div className="grid min-w-0 gap-3 md:grid-cols-3">
                <MetadataCard
                  label="Collection"
                  value={selectedCollection.path}
                  icon={<GridIcon className="h-5 w-5" />}
                />
                <MetadataCard
                  label="Items"
                  value={selectedCollection.itemCount}
                  icon={<HashIcon className="h-5 w-5" />}
                  accentClass="text-violet-300"
                />
                <MetadataCard
                  label="Fields"
                  value={selectedCollection.fields.length || "n/a"}
                  icon={<DatabaseIcon className="h-5 w-5" />}
                />
              </div>

              <div className="rounded-[1.3rem] border border-white/6 bg-white/3 p-4">
                <div className="text-sm font-medium text-slate-200">Field Types</div>
                <div className="mt-2 break-words text-sm text-slate-500">
                  {Object.entries(selectedCollection.fieldTypes).length
                    ? Object.entries(selectedCollection.fieldTypes)
                        .map(([field, types]) => `${field}: ${types.join(", ")}`)
                        .join(" | ")
                    : "No field type details detected for this collection."}
                </div>
              </div>

              <FieldTypeSummary collection={selectedCollection} />
              <CollectionTable collection={selectedCollection} />
            </div>
          ) : null}
        </section>
      ) : null}
    </section>
  );
}

export default DataView;
