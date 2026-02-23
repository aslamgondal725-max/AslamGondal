import personalInfo from "./data/personalInfo.json";
import ProfileImage from "./ProfileImage";
import Education from "./Education";
import Teaching from "./Teaching";
import RecentReadings from "./RecentReadings";
import LatestBlogTeaser from "./LatestBlogTeaser";
import type { BlogListItem } from "../lib/blog";

type Props = {
  latestBlog: BlogListItem | null;
};

const About = ({ latestBlog }: Props): JSX.Element => {
  return (
    <section id="about" className="mb-20">
      {/* Top 3-column layout (responsive) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-10">
        {/* Left: Latest Blog */}
        <div className="lg:col-span-4">
          <LatestBlogTeaser post={latestBlog} />
        </div>

        {/* Middle: Profile Image */}
        <div className="lg:col-span-3 flex justify-center lg:justify-start">
          <ProfileImage />
        </div>

        {/* Right: Intro */}
        <div className="lg:col-span-5">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {personalInfo.name}
          </h1>

          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            {personalInfo.about.bio}
          </p>

          <p className="flex items-center gap-2 mt-3 text-gray-700 dark:text-gray-300">
            <span>📧</span>
            <a
              href={`mailto:${personalInfo.about.email}`}
              className="hover:underline"
            >
              {personalInfo.about.email}
            </a>
          </p>

          {/* Move degree/thesis UP (as you requested) */}
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            <span className="font-medium">{personalInfo.about.degree}</span> —{" "}
            <a
              href={personalInfo.about.college.link}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {personalInfo.about.college.name}
            </a>
          </p>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Master’s thesis research conducted at{" "}
            <a
              href={personalInfo.about.thesisInstitution.link}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {personalInfo.about.thesisInstitution.name}
            </a>
          </p>
        </div>
      </div>

      {/* Research Interests box (fills the empty space area) */}
      <div className="max-w-6xl mx-auto px-0 mb-14">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-950/30 p-6">
          <div className="text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-200">
            Research Interests
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
            {personalInfo.about.interest}
          </p>
        </div>
      </div>

      {/* Bottom two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Education + Teaching */}
        <div className="lg:col-span-2 space-y-16">
          <Education />
          <Teaching />
        </div>

        {/* Right: Recent Readings */}
        <aside className="lg:col-span-1">
          <RecentReadings />
        </aside>
      </div>
    </section>
  );
};

export default About;