/** @format */
import Link from "next/link";
const Custom404 = () => {
  return (
    <div className="main-error-section">
      <h1>404 - Page Not Found</h1>
      <Link legacyBehavior href="/">
        <a id="link">Go Back to Home Page</a>
      </Link>
      <style jsx>{`
        .main-error-section {
          display: flex;
          align-items: center;
          justify-content: center;
          height: calc(100vh);
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};
export default Custom404;
