import { getNumericFields } from "../utils/inferFieldTypes";
import { formatValue } from "../utils/flattenObject";
import {
  findDescriptionField,
  findImageField,
  findTitleField,
} from "../utils/previewFields";

function isRenderableImage(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value);
}

function buildCardContent(item, index) {
  const titleField = findTitleField(item);
  const descriptionField = findDescriptionField(item);
  const imageField = findImageField(item);
  const numericFields = getNumericFields(item).slice(0, 3);

  return {
    title: titleField ? item[titleField] : `Item ${index + 1}`,
    description: descriptionField ? item[descriptionField] : null,
    image: imageField ? item[imageField] : null,
    numericFields,
    metaEntries: Object.entries(item)
      .filter(([key]) => ![titleField, descriptionField, imageField].includes(key))
      .slice(0, 4),
  };
}

function PreviewCard({ item, index }) {
  const { title, description, image, numericFields, metaEntries } = buildCardContent(item, index);

  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-xl shadow-slate-950/20">
      {isRenderableImage(image) ? (
        <img src={image} alt={String(title)} className="h-44 w-full object-cover" />
      ) : (
        <div className="flex h-44 items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-cyan-950 text-sm text-slate-500">
          No image field detected
        </div>
      )}

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">{String(title)}</h3>
          <p className="text-sm leading-6 text-slate-400">
            {description ? String(description) : "This is a simple UI-style card generated from your API data."}
          </p>
        </div>

        {numericFields.length ? (
          <div className="flex flex-wrap gap-2">
            {numericFields.map((field) => (
              <div
                key={field}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100"
              >
                {field}: {formatValue(item[field])}
              </div>
            ))}
          </div>
        ) : null}

        <div className="grid gap-3">
          {metaEntries.map(([key, value]) => (
            <div key={key} className="flex items-start justify-between gap-4 text-sm">
              <span className="text-slate-500">{key}</span>
              <span className="max-w-[65%] text-right text-slate-200">{formatValue(value)}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function UIPreview({ data }) {
  const items = Array.isArray(data) ? data : [data];
  const objectItems = items.filter((item) => item && typeof item === "object" && !Array.isArray(item));

  if (!objectItems.length) {
    return (
      <section className="rounded-3xl border border-white/10 bg-slate-900/75 p-8 text-center">
        <h3 className="text-xl font-semibold text-white">Preview unavailable</h3>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          UI Preview works best with an object or array of objects so APILens can map fields into cards.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-white">How this data could look in a product</h2>
        <p className="mt-2 text-sm text-slate-400">
          APILens is inferring titles, supporting text, images, and stats from your payload.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {objectItems.map((item, index) => (
          <PreviewCard key={item.id ?? item.slug ?? index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

export default UIPreview;
