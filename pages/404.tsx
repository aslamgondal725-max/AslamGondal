import Link from "next/link";
import { NextPage } from "next";

const FourOFour: NextPage<unknown> = () => (
  <section className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
    <div className="w-full text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 font-serif text-5xl font-medium tracking-tight text-ink sm:text-6xl">
        Page not found
      </h1>
      <p className="section-subtext mx-auto max-w-md">
        The page you requested does not exist or may have been moved.
      </p>
      <div className="mt-8 flex justify-center">
        <Link href="/" className="btn-ink">
          Back to home
        </Link>
      </div>
    </div>
  </section>
);

export default FourOFour;
