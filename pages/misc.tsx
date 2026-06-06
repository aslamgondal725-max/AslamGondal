import misc from "../components/data/misc.json";

type Conference = {
  title: string;
  location: string;
  year: string;

  // OLD (kept for backward compatibility if you ever use it)
  certificatePdf?: string;

  // NEW (Drive request-access link)
  requestLink?: string;
  requestLabel?: string; // e.g. "certificate", "transcript"
  note?: string;
};

type Poster = {
  title: string;
  event: string;
  year: string;
  linkedinPost?: string;
  posterPdf?: string;
};

type LanguageOther = {
  language: string;
  level: string;
};

type Recommendation = {
  name: string;
  role: string;
  affiliation: string;
  url: string;
  letterPdf?: string;
};

const Misc = (): JSX.Element => {
  const conferences = (misc as any).conferencesAndWorkshops as Conference[];
  const posters = (misc as any).posterPresentations as Poster[];
  const languages = (misc as any).languages as {
    native: string[];
    other: LanguageOther[];
  };
  const recommendations = (misc as any).recommendations as Recommendation[];

  return (
    <section className="space-y-16">
      <header className="page-hero">
        <p className="eyebrow">Additional Information</p>
        <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Miscellaneous
        </h1>
        <p className="section-subtext max-w-2xl">
          Conferences, poster presentations, languages, and recommendations.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="soft-chip">{conferences.length} conferences and workshops</span>
          <span className="soft-chip">{posters.length} posters</span>
        </div>
      </header>

      {/* Conferences */}
      <section>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="section-heading">Conferences and Workshops</h2>
          <span className="eyebrow">{conferences.length} entries</span>
        </div>
        <ul className="mt-6">
          {conferences.map((c, i) => (
            <li
              key={i}
              className="flex flex-col gap-3 border-t border-line py-5 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <div className="font-serif text-lg font-medium text-ink">
                  {c.title}
                </div>
                <div className="mt-1 text-ink-soft">
                  {c.location}{" "}
                  <span className="text-ink-mut">({c.year})</span>
                </div>

                {c.note && (
                  <div className="mt-1 text-sm text-ink-mut">{c.note}</div>
                )}
              </div>

              {/* NEW: request-access link (preferred) */}
              {c.requestLink ? (
                <a
                  href={c.requestLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-link flex-none"
                  title="This document is available upon request"
                >
                  {(c.requestLabel || "certificate") + ", upon request"}
                </a>
              ) : (
                /* OLD: direct public PDF (fallback) */
                c.certificatePdf && (
                  <a
                    href={c.certificatePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-link flex-none"
                  >
                    certificate
                  </a>
                )
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Posters */}
      <section>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="section-heading">Poster Presentations</h2>
          <span className="eyebrow">{posters.length} entries</span>
        </div>
        <ul className="mt-6">
          {posters.map((p, i) => (
            <li key={i} className="border-t border-line py-5">
              <div className="font-serif text-lg font-medium text-ink">
                {p.title}
              </div>
              <div className="mt-1 text-ink-soft">
                {p.event}{" "}
                <span className="text-ink-mut">({p.year})</span>
              </div>

              {p.linkedinPost && (
                <div className="mt-2">
                  <a
                    href={p.linkedinPost}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-link"
                  >
                    LinkedIn post
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Languages */}
      <section>
        <h2 className="section-heading">Languages</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="surface-card p-5">
            <div className="eyebrow">Mother Tongue</div>
            <p className="mt-2 font-serif text-lg font-medium text-ink">
              {languages.native.join(", ")}
            </p>
          </div>
          <div className="surface-card p-5">
            <div className="eyebrow">Other Languages</div>
            <p className="mt-2 text-sm leading-7 text-ink-soft">
              {languages.other
                .map((l: LanguageOther) => `${l.language} (${l.level})`)
                .join(", ")}
            </p>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section>
        <h2 className="section-heading">Recommendations</h2>
        <ul className="mt-6">
          {recommendations.map((r: Recommendation, i: number) => (
            <li
              key={i}
              className="flex flex-col gap-3 border-t border-line py-5 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-lg font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
                >
                  {r.name}
                </a>
                <div className="mt-1 text-sm text-ink-soft">
                  {r.role}, {r.affiliation}
                </div>
              </div>

              {r.letterPdf && (
                <a
                  href={r.letterPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-link flex-none"
                >
                  pdf
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default Misc;
