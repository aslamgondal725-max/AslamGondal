import type { ReactNode } from "react";
import Link from "next/link";
import personalInfo from "./data/personalInfo.json";
import Education from "./Education";
import Teaching from "./Teaching";
import RecentReadings from "./RecentReadings";
import LatestBlogTeaser from "./LatestBlogTeaser";
import ProfileImage from "./ProfileImage";
import type { BlogListItem } from "../lib/blog";

type Props = {
  latestBlog: BlogListItem | null;
};

type SectionProps = {
  index: string;
  label: string;
  alt?: boolean;
  id?: string;
  children: ReactNode;
};

const Section = ({ index, label, alt, id, children }: SectionProps): JSX.Element => {
  const inner = (
    <section
      id={id}
      className={[
        "border-t border-line",
        alt
          ? "px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
          : "py-14 sm:py-16",
      ].join(" ")}
    >
      <div className="grid gap-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12">
        <div className="self-start lg:sticky lg:top-28">
          <div className="font-serif text-5xl font-medium leading-none text-line-strong">
            {index}
          </div>
          <p className="eyebrow mt-3">{label}</p>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );

  if (alt) {
    return (
      <div className="-mx-4 bg-paper-deep sm:-mx-6 lg:-mx-8">{inner}</div>
    );
  }
  return inner;
};

const About = ({ latestBlog }: Props): JSX.Element => {
  const affiliations = [
    {
      name: "FMZ Würzburg",
      href: "https://www.fmz.uni-wuerzburg.de/",
      logo: "/Logos/FMZ.jpeg",
    },
    {
      name: "University of Würzburg",
      href: "https://www.uni-wuerzburg.de/",
      logo: "/Logos/JMU.jpeg",
    },
    {
      name: "Biofabrication Würzburg",
      href: "https://www.fmz.uni-wuerzburg.de/biofabrication/",
      logo: "/Logos/Biofabrication_Wuerzburg.png",
    },
    {
      name: "IFB Würzburg",
      href: "https://www.chemie.uni-wuerzburg.de/ifb/",
      logo: "/Logos/IFB.jpeg",
    },
    {
      name: "Anhalt University",
      href: "https://www.hs-anhalt.de/startseite.html",
      logo: "/Logos/HSA.jpeg",
    },
    {
      name: "LUMS",
      href: "https://www.lums.edu.pk/",
      logo: "/Logos/LUMS.png",
    },
    {
      name: "QAU",
      href: "https://qau.edu.pk/",
      logo: "/Logos/QAU.jpeg",
    },
    {
      name: "University of Gujrat",
      href: "https://www.uog.edu.pk/",
      logo: "/Logos/UOG.jpeg",
    },
  ];

  const focusAreas = personalInfo.about.interest
    .split(";")
    .map((item) => item.trim().replace(/\.$/, ""))
    .filter(Boolean);

  const degreeCount = ((personalInfo as any)?.education ?? []).length;

  return (
    <div id="about">
      {/* Hero */}
      <section className="pb-14 pt-2 sm:pb-16">
        <p className="eyebrow">Biofabrication / Organoid Research</p>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
          <div>
            <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Engineering <span className="italic">living</span> human tissue,
              outside the body.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
              {personalInfo.about.bio}
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-mut">
              Research Fellow, Department of Functional Materials in Medicine and
              Dentistry (FMZ), Julius-Maximilians-Universität Würzburg, Germany.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/projects" className="btn-ink">
                View research
              </Link>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Download CV
              </a>
            </div>

            <dl className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-line pt-6">
              <div>
                <dt className="font-serif text-3xl font-medium text-ink">
                  {degreeCount}
                </dt>
                <dd className="eyebrow mt-1">Degrees</dd>
              </div>
              <div className="hidden h-9 w-px bg-line sm:block" aria-hidden="true" />
              <div>
                <dt className="font-serif text-3xl font-medium text-ink">
                  {focusAreas.length}
                </dt>
                <dd className="eyebrow mt-1">Research areas</dd>
              </div>
              <div className="hidden h-9 w-px bg-line sm:block" aria-hidden="true" />
              <div>
                <dt className="font-serif text-3xl font-medium text-ink">
                  {affiliations.length}
                </dt>
                <dd className="eyebrow mt-1">Institutions</dd>
              </div>
            </dl>
          </div>

          <div className="lg:pt-1">
            <ProfileImage
              name="Muhammad Aslam"
              credential="M.Sc."
            />
          </div>
        </div>
      </section>

      {/* 01 / About */}
      <Section index="01" label="About">
        <h2 className="max-w-2xl font-serif text-2xl font-medium leading-tight tracking-tight text-ink sm:text-3xl">
          A molecular biotechnologist building 3D human tissue models.
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-ink-soft">
          <p>
            I hold an M.Sc. in Molecular Biotechnology, where my master&apos;s
            thesis focused on biofabricating vascularized mini-bone constructs
            through integrating stem cell-derived spheroids with blood vessel
            organoids. My current work centers on vascularized tissue models,
            organoid integration, and advanced 3D human in vitro systems for
            translational and disease-oriented research.
          </p>
          <p>
            Earlier, I completed degrees in Animal Sciences and Molecular
            Biology, including antibody-generation work targeting Suppressor of
            sable and Bällchen in Drosophila (cloning in E. coli, protein
            expression, and downstream validation). This interdisciplinary path
            built my expertise across molecular biology, protein expression, and
            advanced biofabrication.
          </p>
        </div>
        <p className="mt-6 text-sm text-ink-mut">
          Thesis institution:{" "}
          <a
            href={personalInfo.about.thesisInstitution.link}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
          >
            {personalInfo.about.thesisInstitution.name}
          </a>
        </p>
      </Section>

      {/* 02 / Focus areas */}
      <Section index="02" label="Focus areas" alt>
        <h2 className="max-w-2xl font-serif text-2xl font-medium leading-tight tracking-tight text-ink sm:text-3xl">
          Research interests
        </h2>
        <ul className="mt-8">
          {focusAreas.map((item, i) => (
            <li
              key={i}
              className="flex gap-5 border-t border-line py-5 first:border-t-0 sm:py-6"
            >
              <span className="font-serif text-xl leading-7 text-ink-mut">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="max-w-2xl leading-7 text-ink-soft">{item}.</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 03 / Education */}
      <Section index="03" label="Education">
        <Education />
      </Section>

      {/* 04 / Teaching */}
      <Section index="04" label="Teaching" alt>
        <Teaching />
      </Section>

      {/* 05 / Affiliations */}
      <Section index="05" label="Affiliations">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-2xl font-medium leading-tight tracking-tight text-ink sm:text-3xl">
            Academic and research institutions
          </h2>
          <span className="eyebrow whitespace-nowrap">
            {affiliations.length} total
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Education, research training, and institutional collaborations.
        </p>

        <div className="mt-8 grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-4">
          {affiliations.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[112px] items-center justify-center border-b border-r border-line p-5 transition-colors hover:bg-paper-card"
              aria-label={item.name}
              title={item.name}
            >
              <img
                src={item.logo}
                alt={item.name}
                className="max-h-12 w-auto max-w-full object-contain opacity-80 grayscale mix-blend-multiply transition duration-200 group-hover:opacity-100 group-hover:grayscale-0"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </Section>

      {/* 06 / Reading */}
      <Section index="06" label="Reading" alt>
        <RecentReadings />
      </Section>

      {/* 07 / Writing */}
      {latestBlog && (
        <Section index="07" label="Writing">
          <LatestBlogTeaser post={latestBlog} />
        </Section>
      )}

      {/* 08 / Contact */}
      <div className="-mx-4 bg-ink text-paper sm:-mx-6 lg:-mx-8">
        <section
          id="contact"
          className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
          <div className="grid gap-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12">
            <div>
              <div className="font-serif text-5xl font-medium leading-none text-paper/30">
                08
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-label text-paper/60">
                Contact
              </p>
            </div>
            <div>
              <h2 className="max-w-2xl font-serif text-3xl font-medium leading-tight tracking-tight text-paper sm:text-4xl">
                Let&apos;s talk about tissue models, organoids, and
                collaboration.
              </h2>
              <p className="mt-4 max-w-xl text-paper/70">
                Open to research collaborations, positions, and conversations on
                vascularized tissue models, bone marrow systems, and 3D human in
                vitro platforms.
              </p>

              <div className="mt-8 h-px w-full bg-paper/20" />

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${personalInfo.about.email}`}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm border border-paper bg-paper px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper-deep"
                >
                  Email me
                </a>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm border border-paper/40 bg-transparent px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                >
                  Download CV
                </a>
                <a
                  href={personalInfo.socialMedia.Twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm border border-paper/40 bg-transparent px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                >
                  Twitter
                </a>
                <a
                  href={personalInfo.socialMedia.LinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm border border-paper/40 bg-transparent px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
