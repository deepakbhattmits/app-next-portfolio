/** @format */
import { FC } from "react";
import Link from "next/link";
import { IProp } from "../interfaces";

const Card: FC<IProp> = ({ repos }): JSX.Element => {
  return (
    <>
      <div className="ui cards">
        {repos.map(({ appName, repoUrl, webUrl, stacks, description }, i) => (
          <div className="card" key={i}>
            <div className="content">
              <div className="header">
                {appName} <i className="rocket green icon"></i>
              </div>
              <div className="meta">
                <strong className="header">Stacks : </strong>
                {stacks
                  .map(
                    (e) => e.split("")[0].toUpperCase() + e.slice(1, e.length)
                  )
                  .join(", ")}
              </div>
              <div className="description">{description}</div>
            </div>
            <div className="action extra">
              <Link href={!!repoUrl ? repoUrl : "/_error"}>
                <a
                  target="_blank"
                  rel="noopener noreferer"
                  className="ui button"
                >
                  Repo
                </a>
              </Link>

              <Link href={!!webUrl ? webUrl : "/_error"}>
                <a
                  target="_blank"
                  rel="noopener noreferer"
                  className="ui button"
                >
                  {!!webUrl ? "Demo" : "Not Deployed"}
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .ui.cards {
          margin: 0;
          justify-content: center;
        }
        @media (min-width: 40rem) {
          .ui.cards {
            justify-content: left;
          }
        }
        .ui.card,
        .ui.cards > .card {
          width: 95%;
        }
        @media (min-width: 40rem) {
          .ui.card,
          .ui.cards > .card {
            width: 298px;
          }
        }
        .ui.cards > .card > .extra.action {
          display: flex;
          justify-content: space-between;
        }
        .ui.cards > .card > .extra.action .ui.button {
          background: var(--color-primary-dark);
          color: #fff;
          border: 2px solid var(--color-primary-dark);
          width: auto;
          border-radius: 50px;
          padding: 0.5rem 2rem;
          font-size: var(--default-font-size);
          transition: 0.4s all;
        }
        .ui.cards > .card > .extra.action .ui.button:hover {
          background: transparent;
          color: var(--color-primary-dark);
        }
        .ui.cards > .card > .content > .header,
        .ui.cards > .card > .content > .meta > .header {
          color: var(--color-primary);
        }
        .ui.cards > .card > .content > .description {
          color: var(--color-description);
        }
        .ui.cards > .card > .content > .meta {
          color: var(--color-meta);
        }
        .ui.cards > .card {
          background: var(--color-background);
          color: var(--color-primary);
          margin: 0.5em;
        }
        .card:hover {
          transform: scale(1.05);
          z-index: 1;
          /*box-shadow: rgb(0 0 0 / 12%) 0px 30px 60px;*/
          transition: 0.4s;
        }
      `}</style>
    </>
  );
};
export default Card;
