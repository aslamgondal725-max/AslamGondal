import personalInfo from "./data/personalInfo.json";

const chip =
  "inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold " +
  "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 " +
  "hover:bg-gray-50 dark:hover:bg-gray-800 transition";

const Education = (): JSX.Element => {
  const education = (personalInfo as any)?.education ?? [];

  return (
    <section id="education" className="mb-16">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
        Education
      </h2>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Transcripts, certificates, and recommendation letters are available upon request.
      </p>

      <div className="mt-6 space-y-5">
        {education.map((edu: any, idx: number) => (
          <div
            key={idx}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <a
                href={edu.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:underline"
              >
                {edu.name}
              </a>

              {/* ✅ Request-access chips */}
              {edu.documents && (
                <div className="flex gap-2 flex-wrap">
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
