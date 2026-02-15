import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>

  {/* OpenGraph */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://magondal.com/" />
  <meta property="og:title" content="Muhammad Aslam | Biofabrication & Organoid Research" />
  <meta
    property="og:description"
    content="Biofabrication of vascularized tissue models, 3D in vitro systems, and bone marrow modeling."
  />
  <meta property="og:image" content="https://magondal.com/og.png" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://magondal.com/" />
  <meta name="twitter:title" content="Muhammad Aslam | Biofabrication & Organoid Research" />
  <meta
    name="twitter:description"
    content="Biofabrication of vascularized tissue models, 3D in vitro systems, and bone marrow modeling."
  />
  <meta name="twitter:image" content="https://magondal.com/og.png" />

</Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
