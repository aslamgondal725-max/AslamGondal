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
  "text-slate-700 dark:text-slate-300 border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800";

const PublicationItem = ({ publication, index }: { publication?: Publication; index: number }) => {
  if (!publication) return null; // prevents the runtime error you saw

  const isFeatured = Boolean(publication.featured);

  return (
    <li className="surface-card-hover panel-accent p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-slate-500 dark:text-slate-400">[{index}]</span>

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

          <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {publication.title}
          </h3>

          {publication.authors && (
            <p className="mt-2 text-[15px] leading-7 text-slate-700 dark:text-slate-300">{publication.authors}</p>
          )}

          {!!publication.tags?.length && (
            <div className="mt-4 flex flex-wrap gap-2">
              {publication.tags.map((t) => (
                <span key={t} className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex shrink-0 gap-2">
          {publication.pdf && (
            <a
              href={publication.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              PDF
            </a>
          )}

          {publication.link && (
            <a
              href={publication.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Source
            </a>
          )}
        </div>
      </div>
    </li>
  );
};

export default PublicationItem;
