/** @format */

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="a site for portfolio" />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
         
          <meta name="robots" content="noindex, nofollow" />

          <link rel="icon" type="image/png" href="/images/favicon.png" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto"
          />
        </Head>
        <body className="body">
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: blockingSetInitialColorMode,
            }}
          ></script>
        </body>
        {/* <style jsx>{`
					.ui * {
						font-family: 'Roboto', sans-serif;
					}
					.body {
						background: #ededed;
						overflow: hidden;
					}
				`}</style> */}
      </Html>
    );
  }
}

// our function needs to be a string
const blockingSetInitialColorMode = `(function() {
	${setInitialColorMode.toString()}
	setInitialColorMode();
})()
`;

function setInitialColorMode() {
  function getInitialColorMode() {
    const persistedColorPreference = window.localStorage.getItem("theme");
    const hasPersistedPreference = typeof persistedColorPreference === "string";

    /**
     * If the user has explicitly chosen light or dark,
     * use it. Otherwise, this value will be null.
     */
    if (hasPersistedPreference) {
      return persistedColorPreference;
    }

    // If there is no saved preference, use a media query
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const hasMediaQueryPreference = typeof mql.matches === "boolean";

    if (hasMediaQueryPreference) {
      return mql.matches ? "dark" : "light";
    }

    // default to 'light'.
    return "light";
  }

  const colorMode = getInitialColorMode();
  const root = document.documentElement;
  root.style.setProperty("--initial-color-mode", colorMode);

  // add HTML attribute if dark mode
  if (colorMode === "dark")
    document.documentElement.setAttribute("data-theme", "dark");
}
export default MyDocument;
