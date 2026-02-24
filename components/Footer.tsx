import Image from "next/image";
import personalInfo from "./data/personalInfo.json";

const Footer = (): JSX.Element => {
  const siteUrl = (personalInfo.domain || "").replace(/\/$/, "");

  const links = [
    {
      name: "CV",
      href: `${siteUrl}/cv.pdf`, // ✅ absolute, always correct
      icon: "/images/cv-file-interface-symbol-svgrepo-com.svg",
      alt: "CV",
    },
    {
      name: "Twitter",
      href: personalInfo.socialMedia.Twitter,
      icon: "/images/icons8-twitter.svg",
      alt: "Twitter",
    },
    {
      name: "LinkedIn",
      href: personalInfo.socialMedia.LinkedIn,
      icon: "/images/icons8-linkedin.svg",
      alt: "LinkedIn",
    },
  ];

  if (personalInfo.socialMedia.GoogleScholar) {
    links.push({
      name: "Google Scholar",
      href: personalInfo.socialMedia.GoogleScholar,
      icon: "/images/icons8-google-scholar.svg",
      alt: "Google Scholar",
    });
  }

  return (
    <footer className="mt-14 px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="surface-card panel-accent flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-wide text-slate-800 dark:text-slate-100">
            © 2026 Muhammad Aslam
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Research portfolio, publications, projects, and notes.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {links.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/70 bg-white opacity-80 shadow-sm transition hover:-translate-y-0.5 hover:opacity-100 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
              aria-label={item.name}
            >
              <Image src={item.icon} alt={item.alt} width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
