import personalInfo from "./data/personalInfo.json";

const Footer = (): JSX.Element => {
  const siteUrl = (personalInfo.domain || "").replace(/\/$/, "");

  const links = [
    {
      name: "CV",
      href: `${siteUrl}/cv.pdf`, // absolute, always correct
      external: true,
    },
    {
      name: "Twitter",
      href: personalInfo.socialMedia.Twitter,
      external: true,
    },
    {
      name: "LinkedIn",
      href: personalInfo.socialMedia.LinkedIn,
      external: true,
    },
    {
      name: "Email",
      href: `mailto:${personalInfo.about.email}`,
      external: false,
    },
  ];

  if (personalInfo.socialMedia.GoogleScholar) {
    links.push({
      name: "Google Scholar",
      href: personalInfo.socialMedia.GoogleScholar,
      external: true,
    });
  }

  return (
    <footer className="mt-16 border-t border-line bg-paper">
      <div className="page-shell px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-lg font-medium tracking-tight text-ink">
              {personalInfo.name}.
            </p>
            <p className="mt-2 text-sm leading-6 text-ink-mut">
              Research portfolio, publications, projects, and notes.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-1 border-t border-line py-6 text-xs text-ink-mut sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {personalInfo.name}</p>
          <p>Würzburg, Germany</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
