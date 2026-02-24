import Image from "next/image";
import personalInfo from "./data/personalInfo.json";
import Education from "./Education";
import Teaching from "./Teaching";
import RecentReadings from "./RecentReadings";
import LatestBlogTeaser from "./LatestBlogTeaser";
import type { BlogListItem } from "../lib/blog";

type Props = {
  latestBlog: BlogListItem | null;
};

const About = ({ latestBlog }: Props): JSX.Element => {
  const socialLinks = [
    {
      name: "LinkedIn",
      href: personalInfo.socialMedia.LinkedIn,
      icon: "/images/icons8-linkedin.svg",
    },
    {
      name: "Twitter",
      href: personalInfo.socialMedia.Twitter,
      icon: "/images/icons8-twitter.svg",
    },
  ].filter((item) => item.href);

  const brandStrip = [
    "Anhalt University",
    "JMU Würzburg",
    "LUMS",
    "QAU",
    "3D Tissue Models",
    "Biofabrication",
  ];

  return (
    <section id="about" className="mb-20 space-y-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[#f2f5fd] px-5 py-6 shadow-[0_20px_50px_rgba(30,41,59,0.08)] sm:px-8 sm:py-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-12 xl:items-center">
          <div className="xl:col-span-6">
            <div className="inline-flex items-center rounded-full border border-blue-200/70 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300">
              Welcome to my research portfolio
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[0.98] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100">
              Hi, I&apos;m
              <span className="mt-2 block text-blue-600 dark:text-blue-300">
                {personalInfo.name}
              </span>
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300 sm:text-xl">
              {personalInfo.about.degree}{" "}
              <a
                href={personalInfo.about.college.link}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-blue-700 underline underline-offset-4 dark:text-blue-300"
              >
                {personalInfo.about.college.name}
              </a>
            </p>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
              {personalInfo.about.bio} My work focuses on vascularized tissue models, organoid integration, and advanced 3D human in vitro systems for translational research.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`mailto:${personalInfo.about.email}`}
                className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Contact Me
              </a>
              <a
                href="/projects"
                className="inline-flex items-center rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50 dark:border-blue-400/30 dark:bg-slate-900 dark:text-blue-300"
              >
                View My Work
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="soft-chip">Biofabrication</span>
              <span className="soft-chip">Organoids</span>
              <span className="soft-chip">3D In Vitro Models</span>
              <span className="soft-chip">Translational Research</span>
            </div>
          </div>

          <div className="relative xl:col-span-6">
            <div className="rounded-[1.75rem] border border-white/80 bg-white p-3 shadow-[0_20px_45px_rgba(15,23,42,0.10)] dark:border-slate-700 dark:bg-slate-800">
              <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
                <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3">
                  <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700 shadow-sm backdrop-blur dark:bg-slate-800/90 dark:text-slate-200">
                    Research Portfolio
                  </div>
                  <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700 shadow-sm backdrop-blur dark:bg-slate-800/90 dark:text-blue-300">
                    Available for collaboration
                  </div>
                </div>

                <Image
                  src="/Profile_photo.JPG"
                  alt={personalInfo.name}
                  width={900}
                  height={1400}
                  priority
                  className="h-[380px] w-full object-cover object-[center_18%] sm:h-[500px] xl:h-[560px]"
                />

                <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-white/55 to-transparent dark:from-slate-900/50" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-white/55 to-transparent dark:from-slate-900/50" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-900/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/65 via-slate-900/20 to-transparent p-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-white/95 px-3 py-2 shadow-sm dark:bg-slate-900/90">
                      <div className="text-xl font-bold text-blue-700 dark:text-blue-300">3+</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Degrees</div>
                    </div>
                    <div className="rounded-xl bg-white/95 px-3 py-2 shadow-sm dark:bg-slate-900/90">
                      <div className="text-xl font-bold text-blue-700 dark:text-blue-300">5+</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Projects</div>
                    </div>
                    <div className="rounded-xl bg-white/95 px-3 py-2 shadow-sm dark:bg-slate-900/90">
                      <div className="text-xl font-bold text-blue-700 dark:text-blue-300">7+</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Years</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {socialLinks.length > 0 && (
              <div className="mt-4 flex items-center justify-end gap-2">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                    aria-label={item.name}
                  >
                    <Image src={item.icon} alt={item.name} width={18} height={18} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200/70 bg-white/50 p-5 dark:border-slate-700 dark:bg-slate-800/40">
          <p className="text-center text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400">
            Research & academic affiliations
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {brandStrip.map((brand) => (
              <span
                key={brand}
                className="flex min-h-[52px] items-center justify-center rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-center text-sm font-semibold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="surface-card relative overflow-hidden p-6 sm:p-7">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Focus Areas
                </div>
                <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Research Interests
                </div>
              </div>
              <div className="hidden rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 sm:block dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
                Translational research
              </div>
            </div>

            <p className="mt-5 text-[15px] leading-8 text-slate-700 dark:text-slate-300">
              {personalInfo.about.interest}
            </p>

            <div className="mt-6 rounded-xl border border-slate-200/80 bg-slate-50/90 p-4 text-sm leading-6 text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
              <span className="font-semibold text-slate-800 dark:text-slate-100">Thesis institution:</span>{" "}
              <a
                href={personalInfo.about.thesisInstitution.link}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                {personalInfo.about.thesisInstitution.name}
              </a>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="h-full">
            <LatestBlogTeaser post={latestBlog} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="surface-card p-6 sm:p-7">
            <Education />
          </div>
          <div className="surface-card p-6 sm:p-7">
            <Teaching />
          </div>
        </div>

        <aside className="lg:col-span-1">
          <RecentReadings />
        </aside>
      </div>
    </section>
  );
};

export default About;
