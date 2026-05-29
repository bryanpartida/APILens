import {
  findDescriptionField,
  findImageField,
  findTitleField,
  getPreviewStats,
} from "../../utils/previewDetection";
import { formatValue, summarizeValue } from "../../utils/valueFormatters";

function isRenderableImage(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value);
}

function PreviewCard({ item, index = 0, featured = false }) {
  const titleField = findTitleField(item);
  const descriptionField = findDescriptionField(item);
  const imageField = findImageField(item);
  const stats = getPreviewStats(item);
  const statFields = new Set(stats.map((stat) => stat.key));
  const excludedFields = new Set(
    [titleField, descriptionField, imageField, ...statFields].filter(Boolean),
  );

  const title = titleField ? item[titleField] : `Item ${index + 1}`;
  const description = descriptionField ? item[descriptionField] : null;
  const image = imageField ? item[imageField] : null;
  const supportingFields = Object.entries(item)
    .filter(([key]) => !excludedFields.has(key))
    .slice(0, featured ? 4 : 3);

  return (
    <article
      className={`panel-inset min-w-0 overflow-hidden p-4 sm:p-5 ${
        featured ? "xl:col-span-2" : ""
      }`}
    >
      {isRenderableImage(image) ? (
        <img
          src={image}
          alt={String(title)}
          className={`mb-4 w-full rounded-md object-cover ${
            featured ? "h-52" : "h-40"
          }`}
        />
      ) : null}

      <div className="min-w-0 space-y-4">
        <div className="min-w-0">
          <h3
            className={`break-words font-medium text-white ${
              featured ? "text-2xl sm:text-3xl" : "text-lg"
            }`}
          >
            {String(title)}
          </h3>

          {description ? (
            <p className="mt-2 break-words text-sm leading-7 text-slate-400">
              {String(description)}
            </p>
          ) : null}
        </div>

        {stats.length ? (
          <div className="flex min-w-0 flex-wrap gap-2">
            {stats.map((stat) => (
              <span
                key={stat.key}
                className="rounded-md border border-amber-300/18 bg-amber-300/10 px-3 py-1.5 font-mono text-xs text-amber-200 sm:text-sm"
              >
                {stat.key}: {formatValue(stat.value)}
              </span>
            ))}
          </div>
        ) : null}

        {supportingFields.length ? (
          <div className="grid min-w-0 gap-3">
            {supportingFields.map(([key, value]) => (
              <div key={key} className="flex min-w-0 items-start justify-between gap-3 text-sm">
                <span className="min-w-0 break-words text-slate-500">{key}</span>
                <span className="min-w-0 max-w-[65%] break-words text-right text-slate-200">
                  {typeof value === "object" ? summarizeValue(value) : formatValue(value)}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default PreviewCard;
