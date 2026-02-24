import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Muhammad Aslam | Biofabrication Researcher</title>
        <meta
          name="description"
          content="Muhammad Aslam — Biofabrication researcher focused on vascularized tissue models, organoids, spheroids, and advanced 3D human in vitro systems."
        />

        {/* OpenGraph */}
        <meta property="og:title" content="Muhammad Aslam | Biofabrication Researcher" />
        <meta
          property="og:description"
          content="Biofabrication researcher working on vascularized tissue models, bone marrow systems, organoids, and 3D in vitro platforms."
        />
        <meta property="og:url" content="https://magondal.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://magondal.com/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Muhammad Aslam | Biofabrication Researcher" />
        <meta
          name="twitter:description"
          content="Biofabrication researcher working on vascularized tissue models, bone marrow systems, organoids, and 3D in vitro platforms."
        />
        <meta name="twitter:image" content="https://magondal.com/og.png" />
        <meta name="twitter:url" content="https://magondal.com/" />
      </Head>

      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
