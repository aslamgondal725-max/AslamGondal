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
    <section id="skills" className="mb-16">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Skills</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Click a category to view details (chips). Designed for quick scanning.
        </p>
      </div>

      <div className="space-y-4">
        {data.map((group, idx) => (
          <details
            key={`${group.category}-${idx}`}
            open={idx === 0}
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 shadow-sm p-5"
          >
            <summary className="cursor-pointer select-none font-bold text-gray-900 dark:text-gray-100 text-lg">
              {group.category}
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
          <p className="text-gray-600 dark:text-gray-400">
            No skills added yet. Update <code>components/data/skills.json</code>.
          </p>
        )}
      </div>
    </section>
  );
};

export default Skills;
