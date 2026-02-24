import Link from "next/link";
import { NextPage } from "next";

const FourOFour: NextPage<unknown> = () => (
  <section className="mx-auto flex min-h-[55vh] max-w-3xl items-center">
    <div className="surface-card w-full p-8 text-center sm:p-12">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
        Error 404
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
        The page you requested does not exist or may have been moved.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          Back to home
        </Link>
      </div>
    </div>
  </section>
);

export default FourOFour;
