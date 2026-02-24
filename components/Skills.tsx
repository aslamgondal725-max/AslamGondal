import skillsData from "./data/skills.json";

type SkillCategory = {
  category: string;
  items: string[];
};

const pill =
  "inline-flex items-center rounded-full border px-3 py-1 text-sm " +
  "border-gray-200 bg-white text-gray-800 hover:bg-gray-50 " +
  "dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800";

const Skills = (): JSX.Element => {
  const data: SkillCategory[] = Array.isArray(skillsData)
    ? (skillsData as SkillCategory[])
    : ((skillsData as any)?.skills as SkillCategory[]) || [];

  return (
    <section id="skills" className="space-y-6">
      <div className="page-hero">
        <div className="relative z-10">
        <p className="eyebrow">
          Technical Profile
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Skills
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
          Expand each category to scan tools, methods, and techniques used across wet-lab, analysis, and research workflows.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="soft-chip">{data.length} categories</span>
          <span className="soft-chip">Expandable sections</span>
        </div>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((group, idx) => (
          <details
            key={`${group.category}-${idx}`}
            open={idx === 0}
            className="surface-card-hover group p-5"
          >
            <summary className="cursor-pointer select-none text-lg font-semibold text-slate-900 marker:hidden dark:text-slate-100">
              {group.category}
              <span className="ml-2 text-sm font-medium text-slate-400 group-open:hidden">+</span>
              <span className="ml-2 hidden text-sm font-medium text-slate-400 group-open:inline">−</span>
            </summary>

            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item, i) => (
                <span key={`${group.category}-${i}`} className={pill}>
                  {item}
                </span>
              ))}
            </div>
          </details>
        ))}

        {data.length === 0 && (
          <p className="text-slate-600 dark:text-slate-400">
            No skills added yet. Update <code>components/data/skills.json</code>.
          </p>
        )}
      </div>
    </section>
  );
};

export default Skills;
