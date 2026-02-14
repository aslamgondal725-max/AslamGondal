import { useEffect, useMemo, useState } from "react";
import readings from "./data/readings.json";

type Reading = {
  title: string;
  authors: string;
  year: number;
  journal?: string;
  url: string;
};

const ROTATE_MS = 6500; // time each set stays
const ANIM_MS = 450; // fade/slide duration
const SHOW_COUNT = 3;

const RecentReadings = (): JSX.Element => {
  const list = (readings as Reading[]) ?? [];

  // Shuffle once per mount so it feels "live" but stable within a session
  const shuffled = useMemo(() => {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, [list.length]);

  const [startIdx, setStartIdx] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  const visible = useMemo(() => {
    if (!shuffled.length) return [];
    const items: Reading[] = [];
    for (let k = 0; k < Math.min(SHOW_COUNT, shuffled.length); k++) {
      items.push(shuffled[(startIdx + k) % shuffled.length]);
    }
    return items;
  }, [shuffled, startIdx]);

  useEffect(() => {
    if (!shuffled.length) return;

    const interval = window.setInterval(() => {
      // animate out
      setPhase("out");

      // after fade-out completes, advance and animate in
      window.setTimeout(() => {
        setStartIdx((prev) => (prev + SHOW_COUNT) % shuffled.length);
        setPhase("in");
      }, ANIM_MS);
    }, ROTATE_MS);

    return () => window.clearInterval(interval);
  }, [shuffled.length]);

  if (!list.length) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Readings
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          No readings found. Check <code>components/data/readings.json</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 bg-white/50 dark:bg-gray-950/30">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Readings
        </h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          auto-rotating
        </span>
      </div>

      <div
        className={[
          "mt-4 space-y-3",
          "rr-anim",
          phase === "in" ? "rr-in" : "rr-out",
        ].join(" ")}
      >
        {visible.map((r, i) => (
          <a
            key={`${r.url}-${i}`}
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-900/40 transition"
          >
            <div className="font-semibold text-blue-700 dark:text-blue-400 leading-snug">
              {r.title}
            </div>
            <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {r.authors}
            </div>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {r.journal ? `${r.journal} · ` : ""}
              {r.year}
            </div>
          </a>
        ))}
      </div>

      {/* Optional: small controls later if you want */}
      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Showing {Math.min(SHOW_COUNT, list.length)} of {list.length}
      </p>
    </div>
  );
};

export default RecentReadings;
