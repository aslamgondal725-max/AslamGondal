interface ProjectProps {
  project: any;
  index: number;
}

const ProjectItem = ({ project, index }: ProjectProps): JSX.Element => {
  return (
    <article className="surface-card-hover overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {project.image ? (
        <div className="relative h-60 overflow-hidden bg-slate-100 lg:col-span-5 lg:h-full dark:bg-slate-800">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/10 via-transparent to-blue-500/10" />
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="h-60 bg-gradient-to-br from-slate-100 to-slate-200 lg:col-span-5 lg:h-full dark:from-slate-800 dark:to-slate-900" />
        )}

        <div className="relative lg:col-span-7 p-5 sm:p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700 lg:hidden" />
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              #{index + 1}
            </span>
            {project.featured && (
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200">
                Featured
              </span>
            )}
            {Array.isArray(project.tags) &&
              project.tags.slice(0, 4).map((tag: string) => (
                <span
                  key={`${project.title}-${tag}`}
                  className="rounded-full border border-slate-200 bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
          </div>

          <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
            {project.title}
          </h2>

          {project.subtitle && (
            <p className="mt-2 text-sm font-semibold text-sky-700 dark:text-sky-300">
              {project.subtitle}
            </p>
          )}

          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-[15px]">
            {project.description}
          </p>

          {Array.isArray(project.links) && project.links.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.links.map((link: any) => (
                <a
                  key={`${project.title}-${link.name}-${link.url}`}
                  href={link.url}
                  target={String(link.url).startsWith("http") ? "_blank" : undefined}
                  rel={String(link.url).startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {String(link.name).toUpperCase()}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectItem;
