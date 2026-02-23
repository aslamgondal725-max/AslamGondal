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
    <aside className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 bg-white/50 dark:bg-gray-950/30">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-tight">
          Recent <br /> Readings
        </h3>

        {/* ✅ force it to stay visible */}
        <span className="sr-only">auto-rotating</span>
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

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Showing {Math.min(SHOW_COUNT, list.length)} of {list.length}
      </p>
    </aside>
  );
};

export default RecentReadings;