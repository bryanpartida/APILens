import PreviewCard from "./PreviewCard";

const CARD_PREVIEW_LIMIT = 12;

function PreviewCardGrid({ items }) {
  const previewItems = items.slice(0, CARD_PREVIEW_LIMIT);
  const isLimited = items.length > CARD_PREVIEW_LIMIT;

  return (
    <div className="space-y-4">
      {isLimited ? (
        <div className="text-sm text-slate-500">
          Showing first {CARD_PREVIEW_LIMIT} of {items.length} items in the preview grid.
        </div>
      ) : null}

      <div className="grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {previewItems.map((item, index) => (
          <PreviewCard
            key={item.id ?? item.slug ?? item.title ?? index}
            item={item}
            index={index}
            featured={index === 0}
          />
        ))}
      </div>
    </div>
  );
}

export default PreviewCardGrid;
