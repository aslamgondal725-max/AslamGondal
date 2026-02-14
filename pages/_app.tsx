import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Muhammad Aslam | Biofabrication Researcher</title>
        <meta
          name="description"
          content="Muhammad Aslam — Biofabrication researcher focused on vascularized tissue models, organoids, spheroids, and advanced 3D human in vitro systems."
        />

        {/* OpenGraph (LinkedIn / Social Media Preview) */}
        <meta property="og:title" content="Muhammad Aslam | Biofabrication Researcher" />
        <meta
          property="og:description"
          content="Biofabrication researcher working on vascularized tissue models, bone marrow systems, organoids, and 3D in vitro platforms."
        />
        <meta property="og:url" content="https://magondal.com" />
        <meta property="og:type" content="website" />

        {/* Preview Image */}
        <meta property="og:image" content="https://magondal.com/images/ProfilePhoto.png" />

        {/* Optional but recommended */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
