import ProjectItem from "./ProjectItem";
import data from "./data/projects.json";

const ProjectList = (): JSX.Element => {
  return (
    <section id="projects" className="space-y-10">
      <div className="page-hero">
        <p className="eyebrow">Research Portfolio</p>
        <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Projects
        </h1>
        <p className="section-subtext max-w-2xl">
          Selected projects spanning biofabrication, molecular biotechnology, diagnostics, and analytical workflows.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs font-semibold uppercase tracking-label text-ink-mut">
          <span className="flex items-center gap-2">
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            {data.length} projects
          </span>
          <span className="flex items-center gap-2">
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            Research-driven
          </span>
          <span className="flex items-center gap-2">
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            Methods and outcomes
          </span>
        </div>
      </div>

      <div>
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
