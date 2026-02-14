type Publication = {
  title: string;
  authors?: string;
  journal?: string;
  year?: number | string;
  tags?: string[];
  pdf?: string;
  link?: string;
  featured?: boolean;
};

const chipClass =
  "inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold " +
  "text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";

const PublicationItem = ({ publication, index }: { publication?: Publication; index: number }) => {
  if (!publication) return null; // prevents the runtime error you saw

  const isFeatured = Boolean(publication.featured);

  return (
    <li className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400 font-mono">[{index}]</span>

            {publication.journal && <span className={chipClass}>{publication.journal}</span>}
            {publication.year && <span className={chipClass}>{publication.year}</span>}

            {isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-semibold
                               border-amber-200 bg-amber-50 text-amber-900
                               dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200">
                ★ Featured Publication
              </span>
            )}
          </div>

          <h3 className="mt-3 text-xl font-bold text-gray-900 dark:text-gray-100">
            {publication.title}
          </h3>

          {publication.authors && (
            <p className="mt-2 text-gray-700 dark:text-gray-300">{publication.authors}</p>
          )}

          {!!publication.tags?.length && (
            <div className="mt-4 flex flex-wrap gap-2">
              {publication.tags.map((t) => (
                <span key={t} className="inline-flex items-center rounded-full border px-3 py-1 text-sm
                                        border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex shrink-0 gap-3">
          {publication.pdf && (
            <a
              href={publication.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border px-4 py-2 font-semibold
                         border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              [pdf]
            </a>
          )}

          {publication.link && (
            <a
              href={publication.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border px-4 py-2 font-semibold
                         border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Link
            </a>
          )}
        </div>
      </div>
    </li>
  );
};

export default PublicationItem;
