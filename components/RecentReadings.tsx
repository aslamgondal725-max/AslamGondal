import { useEffect, useMemo, useRef, useState } from "react";
import readings from "./data/readings.json";

type Reading = {
  title: string;
  authors: string;
  year: number;
  journal?: string;
  url: string;
};

const ROTATE_MS = 11000;
const ANIM_MS = 450;
const SHOW_COUNT = 6;

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
      <div id="reading">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          Recent readings
        </h2>
        <p className="mt-3 text-ink-soft">
          No readings found. Check{" "}
          <code className="rounded-sm bg-paper-deep px-1.5 py-0.5 text-sm">
            components/data/readings.json
          </code>
          .
        </p>
      </div>
    );
  }

  return (
    <div id="reading">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          Recent readings
        </h2>
        <span className="eyebrow">Rotating</span>
      </div>

      <ul
        className={[
          "mt-6",
          "rr-anim",
          phase === "in" ? "rr-in" : "rr-out",
        ].join(" ")}
      >
        {visible.map((r) => (
          <li key={r.url} className="border-t border-line first:border-t-0">
            <a
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="group block py-4"
            >
              <div className="font-serif text-base leading-snug text-ink underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-line-strong">
                {r.title}
              </div>
              <div className="mt-1 text-sm text-ink-soft">{r.authors}</div>
              <div className="mt-1 text-xs text-ink-mut">
                {r.journal ? `${r.journal}, ` : ""}
                {r.year}
              </div>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-ink-mut">
        Showing {Math.min(SHOW_COUNT, list.length)} of {list.length}
      </p>
    </div>
  );
};

export default RecentReadings;
