import personalInfo from "./data/personalInfo.json";

const Education = (): JSX.Element => {
  const education = (personalInfo as any)?.education ?? [];

  return (
    <section id="education" className="mb-16">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
        Education
      </h2>

      {/* ✅ Academic-style privacy note */}
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Transcripts, certificates, and recommendation letters are available upon request.
      </p>

      <div className="mt-6 space-y-5">
        {education.map((edu: any, idx: number) => (
          <div
            key={idx}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm"
          >
            <a
              href={edu.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:underline"
            >
              {edu.name}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
