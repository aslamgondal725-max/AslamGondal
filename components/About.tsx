import { useEffect, useState } from "react";
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

  const wallpapers = [
    "/Wallpaper/national-cancer-institute-NbZQYileaOI-unsplash.jpg",
    "/Wallpaper/bioscience-image-library-by-fayette-reynolds-QXug_1QuM90-unsplash.jpg",
    "/Wallpaper/flyd-GRzLN_-o5dQ-unsplash.jpg",
    "/Wallpaper/flyd-KJu5XMU7qZk-unsplash.jpg",
    "/Wallpaper/susan-wilkinson-huyWOrBBSuA-unsplash.jpg",
    "/Wallpaper/national-cancer-institute-mbL91Lg56zc-unsplash.jpg",
  ];
  const [activeWallpaper, setActiveWallpaper] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveWallpaper((prev) => (prev + 1) % wallpapers.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [wallpapers.length]);

  return (
    <section id="about" className="mb-20 space-y-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[#f2f5fd] p-6 shadow-[0_20px_50px_rgba(30,41,59,0.08)] sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-4 surface-card p-5 sm:p-6">
            <p className="eyebrow">Bio</p>
            <p className="mt-3 text-[15px] leading-8 text-slate-700 dark:text-slate-300">
              I hold an M.Sc. in Molecular Biotechnology, where my master&apos;s thesis focused on the biofabrication of vascularized mini-bone constructs through the integration of stem cell-derived spheroids and blood vessel organoids. My research centers on vascularized tissue models, organoid integration strategies, and advanced 3D human in vitro systems for translational and disease-oriented research.
            </p>
            <p className="mt-4 text-[15px] leading-8 text-slate-700 dark:text-slate-300">
              Earlier, I completed degrees in Animal Sciences and Molecular Biology, where I conducted antibody-generation research targeting the Drosophila genes Suppressor of sable and Bällchen, including cloning antigenic regions in E. coli, protein expression, and downstream validation. This interdisciplinary path has built my expertise across molecular biology, protein expression, and biofabrication technologies.
            </p>
          </aside>

          <div className="lg:col-span-8">
            <article className="surface-card overflow-hidden">
              <div className="relative h-56 sm:h-72 lg:h-80">
                {wallpapers.map((src, idx) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className={[
                      "absolute inset-0 object-cover transition-opacity duration-700",
                      idx === activeWallpaper ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                    priority={idx === 0}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                  {wallpapers.map((_, idx) => (
                    <span
                      key={`dot-${idx}`}
                      className={[
                        "h-1.5 rounded-full transition-all",
                        idx === activeWallpaper ? "w-6 bg-white" : "w-2 bg-white/60",
                      ].join(" ")}
                    />
                  ))}
                </div>
              </div>

              <div className="relative bg-white px-5 pb-8 pt-16 dark:bg-slate-900 sm:px-7">
                <div className="absolute -top-12 left-5 h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-slate-900 sm:left-7">
                  <Image
                    src="/Profile_photo.JPG"
                    alt={personalInfo.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover object-[center_22%]"
                  />
                </div>
                <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Muhammad Aslam, M.Sc.
                </h3>
                <p className="mt-3 max-w-3xl text-xl leading-8 text-slate-700 dark:text-slate-300">
                  Research Fellow at the Department of the Functional Materials in Medicine and Dentistry (FMZ), Julius-Maximilians-Universität Würzburg
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-500 dark:text-slate-400">
                  Germany
                </p>
              </div>
            </article>
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

      <section className="surface-card panel-accent p-6 sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Affiliations</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Academic & Research Institutions
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Education, research training, and institutional collaborations.
            </p>
          </div>
          <span className="soft-chip">{affiliations.length} institutions</span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {affiliations.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[104px] items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
              aria-label={item.name}
              title={item.name}
            >
              <img
                src={item.logo}
                alt={item.name}
                className="max-h-14 w-auto max-w-full object-contain opacity-85 grayscale transition duration-200 group-hover:opacity-100 group-hover:grayscale-0"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </section>
    </section>
  );
};

export default About;
