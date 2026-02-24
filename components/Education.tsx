import personalInfo from "./data/personalInfo.json";

const chip =
  "inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold " +
  "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 " +
  "hover:bg-white dark:hover:bg-slate-700 transition";

const Education = (): JSX.Element => {
  const education = (personalInfo as any)?.education ?? [];

  return (
    <section id="education">
      <div className="flex items-end justify-between gap-4">
        <h2 className="section-heading">Education</h2>
        <span className="hidden rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:inline-flex dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
          Academic track
        </span>
      </div>

      <p className="section-subtext">
        Transcripts, certificates, and recommendation letters are available upon request.
      </p>

      <div className="mt-6 space-y-5">
        {education.map((edu: any, idx: number) => (
          <div
            key={idx}
            className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <a
                href={edu.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative pl-4 text-base font-semibold leading-7 text-slate-900 hover:underline dark:text-slate-100 sm:text-lg"
              >
                <span className="absolute left-0 top-1.5 h-5 w-1 rounded-full bg-gradient-to-b from-blue-500 to-sky-400" aria-hidden="true" />
                {edu.name}
              </a>

              {/* ✅ Request-access chips */}
              {edu.documents && (
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  {edu.documents.map((doc: any, i: number) => (
                    <a
                      key={i}
                      href={doc.requestLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={chip}
                      title="This document is available upon request"
                    >
                      {doc.label} · upon request
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
