import type { NextPage } from "next";
import PublicationList from "../components/PublicationList";

const PublicationsPage: NextPage = () => {
  return (
    <section className="max-w-4xl mx-auto">
      <PublicationList />
    </section>
  );
};

export default PublicationsPage;
