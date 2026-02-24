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

const chip =
  "inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold " +
  "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 " +
  "hover:bg-white dark:hover:bg-slate-700 transition";

const Misc = (): JSX.Element => {
  const conferences = (misc as any).conferencesAndWorkshops as Conference[];
  const posters = (misc as any).posterPresentations as Poster[];

  return (
    <section className="space-y-10">
      <div className="page-hero">
        <div className="relative z-10">
        <p className="eyebrow">
          Additional Information
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Miscellaneous
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
          Conferences, poster presentations, languages, and recommendations.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="soft-chip">{conferences.length} conferences/workshops</span>
          <span className="soft-chip">{posters.length} posters</span>
        </div>
        </div>
      </div>

      <section className="space-y-10">
      {/* Conferences */}
      <div className="surface-card panel-accent p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Conferences & Workshops</h2>
          <span className="soft-chip">{conferences.length} entries</span>
        </div>
        <ul className="space-y-4">
          {conferences.map((c, i) => (
            <li
              key={i}
              className="surface-card-hover p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {c.title}
                  </div>
                  <div className="mt-1 text-slate-700 dark:text-slate-300">
                    {c.location}{" "}
                    <span className="text-slate-500 dark:text-slate-400">
                      ({c.year})
                    </span>
                  </div>

                  {c.note && (
                    <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      {c.note}
                    </div>
                  )}
                </div>

                {/* NEW: request-access chip (preferred) */}
                {c.requestLink ? (
                  <a
                    href={c.requestLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={chip}
                    title="This document is available upon request"
                  >
                    {(c.requestLabel || "certificate") + " · upon request"}
                  </a>
                ) : (
                  /* OLD: direct public PDF (fallback) */
                  c.certificatePdf && (
                    <a
                      href={c.certificatePdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={chip}
                    >
                      certificate
                    </a>
                  )
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Posters */}
      <div className="surface-card panel-accent p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Poster Presentations</h2>
          <span className="soft-chip">{posters.length} entries</span>
        </div>
        <ul className="space-y-4">
          {posters.map((p, i) => (
            <li
              key={i}
              className="mt-4 surface-card-hover p-4"
            >
              <div className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {p.title}
              </div>
              <div className="mt-1 text-slate-700 dark:text-slate-300">
                {p.event}{" "}
                <span className="text-slate-500 dark:text-slate-400">
                  ({p.year})
                </span>
              </div>

              {p.linkedinPost && (
                <div className="mt-2">
                  <a
                    href={p.linkedinPost}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-link underline underline-offset-4"
                  >
                    LinkedIn post
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Languages */}
      <div className="surface-card panel-accent p-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Languages</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200/80 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/70">
            <div className="eyebrow !tracking-[0.16em]">Mother Tongue</div>
            <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
              {(misc as any).languages.native.join(", ")}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/70">
            <div className="eyebrow !tracking-[0.16em]">Other Languages</div>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              {(misc as any).languages.other
                .map((l: LanguageOther) => `${l.language} (${l.level})`)
                .join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="surface-card panel-accent p-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Recommendations</h2>
        <ul className="space-y-4">
          {(misc as any).recommendations.map((r: Recommendation, i: number) => (
            <li
              key={i}
              className="mt-4 flex flex-col gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-blue-700 hover:underline dark:text-blue-300"
                >
                  {r.name}
                </a>
                <div className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                  {r.role} — {r.affiliation}
                </div>
              </div>

              {r.letterPdf && (
                <a
                  href={r.letterPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={chip}
                >
                  pdf
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
      </section>
    </section>
  );
};

export default Misc;
