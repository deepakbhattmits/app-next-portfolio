/** @format */
// import Link from 'next/link';
import { useState, useEffect } from "react";
import { skills, socials } from "../constants";
// import styles from '../styles/IndexPage.module.css';
import SideBar from "../components/SideBar";
import Main from "../components/Main";
import Error from "./_error";
import DarkModeToggle from "../components/DarkModeToggle";
import useWindowDimensions from "../hooks/useWindowDimensions";
import axios from "axios";
const Index = ({ user = {}, statusCode }) => {
  const { width } = useWindowDimensions();
  const [isActive, setIsActive] = useState<boolean>(false);
  if (!user) {
    return <Error/>;
  }
  useEffect(() => {
    if (width <= 640) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [width]);
  return (
    <div className="ui grid">
      <div className={`sidebar ${isActive ? "active" : ""}`}>
        {isActive && (
          <SideBar
            user={user}
            skills={skills}
            socials={socials}
            setIsActive={setIsActive}
          />
        )}
        {width <= 640 && (
          <button
            className="custom-button"
            onClick={() => {
              setIsActive((prevState) => !prevState);
            }}
          >
            {isActive ? "User <" : "User >"}
          </button>
        )}
      </div>
      <div className={`main ${isActive ? "active " : ""}`}>
        <Main />
        <DarkModeToggle />
      </div>
      <style jsx>{`
        .grid {
          display: grid;
          grid-gap: 10px;
          margin: 5px;
          margin-top: 5rem;
          grid-template-columns: 0% 1fr;
          height: calc(100vh - 10px);
        }
        @media (min-width: 40rem) {
          .grid {
            grid-template-columns: 20% 1fr;
            margin-top: 0;
          }
        }
        .sidebar {
          border-radius: 3px;
          padding: 15px;
          background: var(--color-background);
          color: var(--color-primary);
          margin: 0.5em;
          position: relative;
          left: -100vw;
          overflow-y: auto;
          transition: 1s;
        }
        .sidebar.active {
          transition: 0.4s;
          overflow-y: auto;
          margin: 0;
          left: 8px;
          top: 7px;
          width: 25rem;
          z-index: 1;
          box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
        }
        @media (min-width: 40rem) {
          .sidebar {
            box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
            left: 0;
          }
          .sidebar.active {
            width: 100%;
          }
        }
        .main {
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0;
          height: calc(100% - 3rem);
        }
        .main.active {
          overflow-y: hidden;
        }
        @media (min-width: 40rem) {
          .main.active {
            overflow-y: auto;
          }
        }
        /* Track */
        .sidebar.active::-webkit-scrollbar-track,
        .main::-webkit-scrollbar-track {
          background: #ccc;
        }

        /* Handle */
        .sidebar.active::-webkit-scrollbar-thumb,
        .main::-webkit-scrollbar-thumb {
          background: var(--color-primary-dark);
          border-radius: 0;
        }

        /* Handle on hover */
        .sidebar.active::-webkit-scrollbar-thumb:hover,
        .main::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .custom-button {
          left: 1.6em;
          width: auto;
          margin: 0.5em 0;
          position: fixed;
          top: 0.2em;
          z-index: 1;
          background: var(--color-primary-dark);
          color: #fff;
          border: 2px solid var(--color-primary-dark);
          width: 80px;
          border-radius: 50px;
          padding: 0.5em;
        }
        .custom-button:hover {
          background: var(--color-background);
          color: var(--color-primary-dark);
          border-color: var(--color-primary-dark);
        }
      `}</style>
    </div>
  );
};
Index.getInitialProps = async (ctx) => {
  const { data } = await axios.get(
    "https://api.github.com/users/deepakbhattmits"
  );
  const user = data;
  return { user };
};
export default Index;
