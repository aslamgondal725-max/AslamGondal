import { useEffect, useMemo, useRef, useState } from "react";
import readings from "./data/readings.json";

type Reading = {
  title: string;
  authors: string;
  year: number;
  journal?: string;
  url: string;
};

const ROTATE_MS = 6500;
const ANIM_MS = 450;
const SHOW_COUNT = 3;

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const RecentReadings = (): JSX.Element => {
  const list = (readings as Reading[]) ?? [];

  // ✅ SSR-stable first render (server & first client render match)
  const [shuffled, setShuffled] = useState<Reading[]>(list);
  const [startIdx, setStartIdx] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  const timeoutRef = useRef<number | null>(null);

  // ✅ Shuffle AFTER mount (client only) to avoid hydration mismatch
  useEffect(() => {
    if (!list.length) return;
    setShuffled(shuffleArray(list));
    setStartIdx(0);
    setPhase("in");
    // run once on mount intentionally
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visible = useMemo(() => {
    if (!shuffled.length) return [];
    const items: Reading[] = [];
    const count = Math.min(SHOW_COUNT, shuffled.length);
    for (let k = 0; k < count; k++) {
      items.push(shuffled[(startIdx + k) % shuffled.length]);
    }
    return items;
  }, [shuffled, startIdx]);

  useEffect(() => {
    if (!shuffled.length) return;

    const interval = window.setInterval(() => {
      setPhase("out");

      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

      timeoutRef.current = window.setTimeout(() => {
        setStartIdx((prev) => (prev + SHOW_COUNT) % shuffled.length);
        setPhase("in");
      }, ANIM_MS);
    }, ROTATE_MS);

    return () => {
      window.clearInterval(interval);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [shuffled.length]);

  if (!list.length) {
    return (
      <div className="surface-card p-5">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Recent Readings
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          No readings found. Check <code>components/data/readings.json</code>.
        </p>
      </div>
    );
  }

  return (
    <aside className="surface-card relative sticky top-24 overflow-hidden p-5">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" aria-hidden="true" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Reading List
          </p>
          <h3 className="mt-1 text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
            Recent Readings
          </h3>
        </div>

        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
          rotating
        </span>
      </div>

      <div
        className={[
          "mt-4 space-y-3",
          "rr-anim",
          phase === "in" ? "rr-in" : "rr-out",
        ].join(" ")}
      >
        {visible.map((r) => (
          <a
            key={r.url}
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="group block rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="font-semibold leading-snug text-sky-700 transition group-hover:text-blue-700 dark:text-sky-300 dark:group-hover:text-blue-300">
              {r.title}
            </div>
            <div className="mt-1 text-sm text-slate-700 dark:text-slate-300">
              {r.authors}
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {r.journal ? `${r.journal} · ` : ""}
              {r.year}
            </div>
          </a>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Showing {Math.min(SHOW_COUNT, list.length)} of {list.length}
      </p>
    </aside>
  );
};

export default RecentReadings;
