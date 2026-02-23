import type { GetStaticProps, NextPage } from "next";
import About from "../components/About";
import { getAllPostsMeta, type BlogListItem } from "../lib/blog";

type Props = {
  latestBlog: BlogListItem | null;
};

const Index: NextPage<Props> = ({ latestBlog }) => {
  return <About latestBlog={latestBlog} />;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getAllPostsMeta();
  const latestBlog = posts.length > 0 ? posts[0] : null;
  return { props: { latestBlog } };
};

export default Index;