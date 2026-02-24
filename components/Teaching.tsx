const Teaching = (): JSX.Element => {
  return (
    <section id="academic-experience">
      <h2 className="section-heading">Academic & Teaching Experience</h2>

      <div className="surface-card-hover panel-accent mt-6 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Teaching Assistant
          </p>
          <span className="soft-chip">2019–2022</span>
        </div>

        <p className="mt-2 text-sm italic text-slate-600 dark:text-slate-400">
          Department of Microbiology,{" "}
          <a
            href="https://mic.qau.edu.pk"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-slate-300 underline-offset-4 dark:decoration-slate-600"
          >
            Quaid-e-Azam University
          </a>
          , Islamabad, Pakistan
        </p>

        <p className="mt-1 text-sm italic text-slate-500 dark:text-slate-400">
          01 September 2019 – 31 January 2022
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
          <li>
            Supervised undergraduate laboratory and practical classes, supporting hands-on experimental training.
          </li>
          <li>
            Facilitated academic communication between students and faculty members to ensure effective course coordination.
          </li>
          <li>
            Assisted faculty in teaching activities, including instructional support and assessment preparation.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Teaching;
