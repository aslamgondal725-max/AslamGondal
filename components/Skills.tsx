import skillsData from "./data/skills.json";

type SkillCategory = {
  category: string;
  items: string[];
};

const pill =
  "inline-flex items-center rounded-sm border border-line-strong bg-paper-card px-3 py-1.5 " +
  "text-sm text-ink-soft transition-colors hover:border-ink";

const Skills = (): JSX.Element => {
  const data: SkillCategory[] = Array.isArray(skillsData)
    ? (skillsData as SkillCategory[])
    : ((skillsData as any)?.skills as SkillCategory[]) || [];

  return (
    <section id="skills" className="space-y-10">
      <div className="page-hero">
        <p className="eyebrow">Technical Profile</p>
        <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Skills
        </h1>
        <p className="section-subtext max-w-2xl">
          Expand each category to scan tools, methods, and techniques used across wet-lab, analysis, and research workflows.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs font-semibold uppercase tracking-label text-ink-mut">
          <span className="flex items-center gap-2">
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            {data.length} categories
          </span>
          <span className="flex items-center gap-2">
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            Expandable sections
          </span>
        </div>
      </div>

      <div>
        {data.map((group, idx) => (
          <details
            key={`${group.category}-${idx}`}
            open={idx === 0}
            className="group border-t border-line py-6"
          >
            <summary className="flex cursor-pointer select-none items-center justify-between gap-4 marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="flex items-baseline gap-3">
                <span className="font-serif text-xl font-medium tracking-tight text-ink sm:text-2xl">
                  {group.category}
                </span>
                <span className="text-xs font-semibold uppercase tracking-label text-ink-mut">
                  {group.items.length} {group.items.length === 1 ? "skill" : "skills"}
                </span>
              </span>
              <svg
                className="h-4 w-4 flex-none text-ink transition-transform duration-200 group-open:rotate-180"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>

            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item, i) => (
                <span key={`${group.category}-${i}`} className={pill}>
                  {item}
                </span>
              ))}
            </div>
          </details>
        ))}

        {data.length === 0 && (
          <p className="text-ink-soft">
            No skills added yet. Update <code>components/data/skills.json</code>.
          </p>
        )}
      </div>
    </section>
  );
};

export default Skills;
