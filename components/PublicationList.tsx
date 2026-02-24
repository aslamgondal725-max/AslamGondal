import publicationsData from "./data/publications.json";
import PublicationItem from "./PublicationItem";

const publications = Array.isArray(publicationsData) ? publicationsData : [];

const PublicationList = () => {
  return (
    <section className="space-y-6">
      <div className="page-hero">
        <div className="relative z-10">
        <p className="eyebrow">
          Scholarly Work
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Publications
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
          Featured papers, articles, and outputs with links to PDFs and external resources where available.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="soft-chip">{publications.length} items</span>
          <span className="soft-chip">Peer-reviewed + outputs</span>
        </div>
        </div>
      </div>

      <ul className="space-y-5">
        {publications.map((p, i) => (
          <PublicationItem key={`${p.title}-${i}`} publication={p} index={i + 1} />
        ))}
      </ul>
    </section>
  );
};

export default PublicationList;
