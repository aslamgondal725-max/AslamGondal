interface ProjectProps {
  project: any;
  index: number;
}

const ProjectItem = ({ project, index }: ProjectProps): JSX.Element => {
  const figure = String(index + 1).padStart(2, "0");
  const hasImage = Boolean(project.image);

  const TextBlock = (
    <div className="min-w-0">
      {project.featured && (
        <p className="eyebrow text-ink">Featured</p>
      )}

      <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink sm:text-3xl">
        {project.title}
      </h2>

      {project.subtitle && (
        <p className="mt-2 font-serif text-base italic text-ink-soft">
          {project.subtitle}
        </p>
      )}

      <p className="mt-4 text-base leading-7 text-ink-soft">
        {project.description}
      </p>

      {Array.isArray(project.tags) && project.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <span key={`${project.title}-${tag}`} className="soft-chip">
              {tag}
            </span>
          ))}
        </div>
      )}

      {Array.isArray(project.links) && project.links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.map((link: any) => (
            <a
              key={`${project.title}-${link.name}-${link.url}`}
              href={link.url}
              target={String(link.url).startsWith("http") ? "_blank" : undefined}
              rel={String(link.url).startsWith("http") ? "noopener noreferrer" : undefined}
              className="cta-link"
            >
              {String(link.name)}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <article className="border-t border-line py-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        <div className="lg:w-[200px] lg:flex-none">
          <span className="font-serif text-5xl font-medium leading-none text-line-strong">
            {figure}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          {hasImage ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
              {TextBlock}
              <figure className="overflow-hidden rounded-sm border border-line bg-paper-card">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover grayscale contrast-[1.04] transition duration-500 hover:grayscale-0"
                />
              </figure>
            </div>
          ) : (
            TextBlock
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectItem;
