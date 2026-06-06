const responsibilities = [
  "Supervised undergraduate laboratory and practical classes, supporting hands-on experimental training.",
  "Facilitated academic communication between students and faculty members to ensure effective course coordination.",
  "Assisted faculty in teaching activities, including instructional support and assessment preparation.",
];

const Teaching = (): JSX.Element => {
  return (
    <div id="academic-experience">
      <h2 className="font-serif text-2xl font-medium tracking-tight text-ink sm:text-3xl">
        Academic and teaching experience
      </h2>

      <div className="mt-8 border-t border-line pt-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-serif text-lg text-ink">Teaching Assistant</p>
          <p className="eyebrow">2019 to 2022</p>
        </div>

        <p className="mt-2 text-ink-soft">
          Department of Microbiology,{" "}
          <a
            href="https://mic.qau.edu.pk"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
          >
            Quaid-e-Azam University
          </a>
          , Islamabad, Pakistan
        </p>

        <p className="mt-1 text-sm text-ink-mut">
          01 September 2019 to 31 January 2022
        </p>

        <ul className="mt-5 space-y-3">
          {responsibilities.map((item, i) => (
            <li key={i} className="flex gap-3 text-ink-soft">
              <span
                className="mt-[0.6rem] h-1.5 w-1.5 flex-none bg-ink"
                aria-hidden="true"
              />
              <span className="leading-7">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Teaching;
