import personalInfo from "./data/personalInfo.json";

const docLink =
  "text-xs font-semibold text-ink underline decoration-line-strong underline-offset-4 " +
  "transition-colors hover:decoration-ink";

const Education = (): JSX.Element => {
  const education = (personalInfo as any)?.education ?? [];

  return (
    <div id="education">
      <h2 className="font-serif text-2xl font-medium tracking-tight text-ink sm:text-3xl">
        Education
      </h2>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Transcripts, certificates, and recommendation letters are available upon request.
      </p>

      <ul className="mt-8">
        {education.map((edu: any, idx: number) => {
          const [degree, place] = String(edu.name)
            .split(/\s*[—–]\s*/)
            .map((s: string) => s.trim());

          return (
            <li key={idx} className="border-t border-line py-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                <a
                  href={edu.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group max-w-2xl"
                >
                  <span className="block font-serif text-lg leading-snug text-ink underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-line-strong">
                    {degree}
                  </span>
                  {place && (
                    <span className="mt-1 block text-sm text-ink-mut">{place}</span>
                  )}
                </a>

                <div className="flex flex-wrap gap-x-5 gap-y-1 sm:justify-end sm:text-right">
                  <a
                    href={edu.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={docLink}
                  >
                    Institution
                  </a>
                  {edu.documents &&
                    edu.documents.map((doc: any, i: number) => (
                      <a
                        key={i}
                        href={doc.requestLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${docLink} capitalize`}
                        title="Available upon request"
                      >
                        {doc.label}
                      </a>
                    ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Education;
