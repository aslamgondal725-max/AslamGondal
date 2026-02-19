import Image from "next/image";
import personalInfo from "./data/personalInfo.json";

const Footer = (): JSX.Element => {
  const links = [
    {
      name: "CV",
      href: personalInfo.love || "/cv.pdf", // ✅ uses personalInfo, fallback safe
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

  // Optional: only add Google Scholar if you set a URL
  if (personalInfo.socialMedia.GoogleScholar) {
    links.push({
      name: "Google Scholar",
      href: personalInfo.socialMedia.GoogleScholar,
      icon: "/images/icons8-google-scholar.svg",
      alt: "Google Scholar",
    });
  }

  return (
    <footer className="mt-16 pb-10">
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
        <p className="text-gray-500 dark:text-gray-400">© 2026. MuhammadAslam</p>

        <div className="flex items-center gap-6 pr-10">
          {links.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition"
              aria-label={item.name}
            >
              <Image src={item.icon} alt={item.alt} width={26} height={26} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
