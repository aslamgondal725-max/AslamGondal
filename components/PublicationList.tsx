import publicationsData from "./data/publications.json";
import PublicationItem from "./PublicationItem";

const publications = Array.isArray(publicationsData) ? publicationsData : [];

const PublicationList = () => {
  return (
    <section className="space-y-10">
      <div className="page-hero">
        <p className="eyebrow">Scholarly Work</p>
        <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Publications
        </h1>
        <p className="section-subtext max-w-2xl">
          Featured papers, articles, and outputs with links to PDFs and external resources where available.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs font-semibold uppercase tracking-label text-ink-mut">
          <span className="flex items-center gap-2">
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            {publications.length} {publications.length === 1 ? "item" : "items"}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            Peer-reviewed and outputs
          </span>
        </div>
      </div>

      <ul>
        {publications.map((p, i) => (
          <PublicationItem key={`${p.title}-${i}`} publication={p} index={i + 1} />
        ))}
      </ul>
    </section>
  );
};

export default PublicationList;
