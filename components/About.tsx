import personalInfo from './data/personalInfo.json';
import ProfileImage from './ProfileImage';
import Education from './Education';
import Teaching from './Teaching';
import RecentReadings from './RecentReadings';

const About = (): JSX.Element => {
  return (
    <section id="about" className="mb-20">
      {/* Top profile section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-16">
        <div className="flex-shrink-0">
          <ProfileImage />
        </div>

        <div className="max-w-2xl">
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

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            <span className="font-medium">Research Interests:</span>{' '}
            {personalInfo.about.interest}
          </p>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            <span className="font-medium">{personalInfo.about.degree}</span> —{' '}
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
            Master’s thesis research conducted at{' '}
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
