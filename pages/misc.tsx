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
  "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 " +
  "hover:bg-gray-50 dark:hover:bg-gray-800 transition";

const Misc = (): JSX.Element => {
  const conferences = (misc as any).conferencesAndWorkshops as Conference[];
  const posters = (misc as any).posterPresentations as Poster[];

  return (
    <section className="max-w-4xl mx-auto space-y-14">
      {/* Conferences */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Conferences & Workshops</h2>
        <ul className="space-y-4">
          {conferences.map((c, i) => (
            <li
              key={i}
              className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {c.title}
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">
                    {c.location}{" "}
                    <span className="text-gray-500 dark:text-gray-400">
                      ({c.year})
                    </span>
                  </div>

                  {c.note && (
                    <div className="text-gray-600 dark:text-gray-400 mt-1">
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
      <div>
        <h2 className="text-2xl font-bold mb-4">Poster Presentations</h2>
        <ul className="space-y-4">
          {posters.map((p, i) => (
            <li
              key={i}
              className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900"
            >
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                {p.title}
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                {p.event}{" "}
                <span className="text-gray-500 dark:text-gray-400">
                  ({p.year})
                </span>
              </div>

              {p.linkedinPost && (
                <div className="mt-2">
                  <a
                    href={p.linkedinPost}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600 dark:text-blue-400"
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
      <div>
        <h2 className="text-2xl font-bold mb-4">Languages</h2>
        <p>
          <strong>Mother tongue:</strong>{" "}
          {(misc as any).languages.native.join(", ")}
        </p>
        <p>
          <strong>Other:</strong>{" "}
          {(misc as any).languages.other
            .map((l: LanguageOther) => `${l.language} (${l.level})`)
            .join(", ")}
        </p>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
        <ul className="space-y-4">
          {(misc as any).recommendations.map((r: Recommendation, i: number) => (
            <li
              key={i}
              className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900"
            >
              <div>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
                >
                  {r.name}
                </a>
                <div className="text-gray-700 dark:text-gray-300">
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
  );
};

export default Misc;
