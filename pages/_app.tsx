/** @format */

import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/_globals.scss";
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    setPageLoading(true);
    setTimeout(() => {
      setPageLoading(false);
    }, 2000); //lag for 2 sec.
  }, []);
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>App Portfolio</title>
      </Head>
      {pageLoading ? (
        <div className="loding-parent">
          <div className="loading-child">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </Hydrate>
        </QueryClientProvider>
      )}
      <style jsx>{`
        @keyframes loading-child {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        .loading-child div {
          left: 94px;
          top: 48px;
          position: absolute;
          animation: loading-child linear 1s infinite;
          background: #7726ed;
          width: 12px;
          height: 24px;
          border-radius: 6px / 12px;
          transform-origin: 6px 52px;
        }
        .loading-child div:nth-child(1) {
          transform: rotate(0deg);
          animation-delay: -0.9166666666666666s;
          background: #7726ed;
        }
        .loading-child div:nth-child(2) {
          transform: rotate(30deg);
          animation-delay: -0.8333333333333334s;
          background: #7726ed;
        }
        .loading-child div:nth-child(3) {
          transform: rotate(60deg);
          animation-delay: -0.75s;
          background: #7726ed;
        }
        .loading-child div:nth-child(4) {
          transform: rotate(90deg);
          animation-delay: -0.6666666666666666s;
          background: #7726ed;
        }
        .loading-child div:nth-child(5) {
          transform: rotate(120deg);
          animation-delay: -0.5833333333333334s;
          background: #7726ed;
        }
        .loading-child div:nth-child(6) {
          transform: rotate(150deg);
          animation-delay: -0.5s;
          background: #7726ed;
        }
        .loading-child div:nth-child(7) {
          transform: rotate(180deg);
          animation-delay: -0.4166666666666667s;
          background: #7726ed;
        }
        .loading-child div:nth-child(8) {
          transform: rotate(210deg);
          animation-delay: -0.3333333333333333s;
          background: #7726ed;
        }
        .loading-child div:nth-child(9) {
          transform: rotate(240deg);
          animation-delay: -0.25s;
          background: #7726ed;
        }
        .loading-child div:nth-child(10) {
          transform: rotate(270deg);
          animation-delay: -0.16666666666666666s;
          background: #7726ed;
        }
        .loading-child div:nth-child(11) {
          transform: rotate(300deg);
          animation-delay: -0.08333333333333333s;
          background: #7726ed;
        }
        .loading-child div:nth-child(12) {
          transform: rotate(330deg);
          animation-delay: 0s;
          background: #7726ed;
        }
        .loding-parent {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .loading-child {
          width: 200px;
          height: 200px;
          position: relative;
          transform: translateZ(0) scale(1);
          backface-visibility: hidden;
          transform-origin: 0 0; /* see note above */
        }
        .loading-child div {
          box-sizing: content-box;
        }
      `}</style>
    </SessionProvider>
  );
};

export default MyApp;
