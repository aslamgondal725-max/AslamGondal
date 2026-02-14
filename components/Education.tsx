import personalInfo from "./data/personalInfo.json";

type EducationDoc = {
  label: string;
  url: string;
};

type EducationItem = {
  name: string;
  link?: string;
  docs?: EducationDoc[];
};

const chipClass =
  "inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold " +
  "text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800 " +
  "border-gray-200 dark:border-gray-700 transition";

const Education = (): JSX.Element => {
  const education: EducationItem[] = (personalInfo as any)?.education ?? [];

  return (
    <section id="education" className="mb-16">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
        Education
      </h2>

      <div className="space-y-5">
        {education.map((edu, idx) => (
          <div
            key={`${edu.name}-${idx}`}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm"
          >
            {/* Program / Institution */}
            {edu.link ? (
              <a
                href={edu.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:underline"
              >
                {edu.name}
              </a>
            ) : (
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {edu.name}
              </div>
            )}

            {/* Docs */}
            {!!edu.docs?.length && (
              <div className="mt-3 flex flex-wrap gap-2">
                {edu.docs.map((d, i) => (
                  <a
                    key={`${edu.name}-doc-${i}`}
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={chipClass}
                  >
                    {d.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        {education.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400">
            No education entries found. Add them under <code>education</code> in{" "}
            <code>components/data/personalInfo.json</code>.
          </p>
        )}
      </div>
    </section>
  );
};

export default Education;
