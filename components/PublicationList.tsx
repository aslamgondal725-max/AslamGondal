import publicationsData from "./data/publications.json";
import PublicationItem from "./PublicationItem";

const publications = Array.isArray(publicationsData) ? publicationsData : [];

const PublicationList = () => {
  return (
    <ul className="space-y-6">
      {publications.map((p, i) => (
        <PublicationItem key={`${p.title}-${i}`} publication={p} index={i} />
      ))}
    </ul>
  );
};

export default PublicationList;
