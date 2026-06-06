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

const PublicationItem = ({ publication, index }: { publication?: Publication; index: number }) => {
  if (!publication) return null; // prevents the runtime error you saw

  const isFeatured = Boolean(publication.featured);
  const figure = String(index).padStart(2, "0");

  return (
    <li className="border-t border-line py-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        <div className="lg:w-[200px] lg:flex-none">
          <span className="font-serif text-5xl font-medium leading-none text-line-strong">
            {figure}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {(publication.journal || publication.year) && (
              <p className="eyebrow">
                {[publication.journal, publication.year].filter(Boolean).join(", ")}
              </p>
            )}
            {isFeatured && (
              <span className="text-xs font-semibold uppercase tracking-label text-ink">
                Featured
              </span>
            )}
          </div>

          <h3 className="mt-3 font-serif text-2xl font-medium tracking-tight text-ink">
            {publication.title}
          </h3>

          {publication.authors && (
            <p className="mt-2 font-serif text-base italic text-ink-soft">
              {publication.authors}
            </p>
          )}

          {!!publication.tags?.length && (
            <div className="mt-4 flex flex-wrap gap-2">
              {publication.tags.map((t) => (
                <span key={t} className="soft-chip">
                  {t}
                </span>
              ))}
            </div>
          )}

          {(publication.pdf || publication.link) && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {publication.pdf && (
                <a
                  href={publication.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ink !px-5 !py-2.5"
                >
                  PDF
                </a>
              )}

              {publication.link && (
                <a
                  href={publication.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !px-5 !py-2.5"
                >
                  Source
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default PublicationItem;
