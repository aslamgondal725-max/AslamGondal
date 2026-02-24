import ProjectItem from "./ProjectItem";
import data from "./data/projects.json";

const ProjectList = (): JSX.Element => {
  return (
    <section id="projects" className="space-y-6">
      <div className="page-hero">
        <div className="relative z-10">
        <p className="eyebrow">
          Research Portfolio
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Projects
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
          Selected projects spanning biofabrication, molecular biotechnology, diagnostics, and analytical workflows.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="soft-chip">{data.length} projects</span>
          <span className="soft-chip">Research-driven</span>
          <span className="soft-chip">Methods + outcomes</span>
        </div>
        </div>
      </div>

      <div className="grid gap-6">
        {data.map((project, index) => (
          <ProjectItem
            key={`${project.title}-${index}`}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectList;
