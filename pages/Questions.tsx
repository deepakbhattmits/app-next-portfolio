import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { getSession, useSession, signIn, signOut } from "next-auth/react";
import Modal from "../components/Modal";
import useQuestions from "../hooks/useQuetions";
import usePost from "../hooks/usePost";
import styles from "../styles/Questions.module.scss";
import useAnswer from "../hooks/useAnswer";
import { GetServerSideProps } from "next";

const Questions = ({ session }) => {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const answerRef = useRef<HTMLSpanElement>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [question, setQuestion] = useState<number>(0);
  const { answerInfo } = useAnswer(question);
  const { queryInfo } = useQuestions();
  const postMutation = usePost();
  const handleAddQuestion = () => {
    setIsModalVisible((prevState) => !prevState);
  };
  const handleDismiss = (e: any) => {
    setIsModalVisible((prevState) => !prevState);
  };
  const handleQuestion = (id: any) => {
    setQuestion((prevState) => (prevState === 0 ? id : 0));
  };
  useEffect(() => {
    if (
      (queryInfo?.isSuccess && !filteredData?.length) ||
      filteredData?.length < queryInfo?.data?.questions?.length
    ) {
      setFilteredData(queryInfo?.data?.questions);
    }
  }, [filteredData, queryInfo]);
  // useEffect(() => {
  //   const i_id = setInterval(() => {
  //     if (postMutation.isSuccess && !queryInfo.isFetching) {
  //       // postMutation.reset();
  //       // setIsModalVisible(false);
  //       // signOut();
  //     }
  //     // if (postMutation.isError && !queryInfo.isFetching) {
  //     //   // postMutation.reset();
  //     // }
  //   }, 1000);
  //   return () => {
  //     clearInterval(i_id);
  //   };
  // }, [postMutation, queryInfo]);
  return (
    <div className={styles?.question__container}>
      <div className={`${styles.padding__top__bottom1} ${styles.center}`}>
        <h3 className={styles?.header}>JS Questions</h3>
      </div>
      <div className={styles.link__wrapper}>
        <Link href="/">
          <a className="">Back to home page</a>
        </Link>

        <button
          className="btn btn-border btn-secondary"
          onClick={handleAddQuestion}
        >
          Add question
        </button>
      </div>
      {!filteredData?.length ? (
        <div>Loading....</div>
      ) : !!filteredData?.length ? (
        <div className={`ui styled fluid accordion ${styles.customAccordion}`}>
          {filteredData?.map(({ que, id }) => (
            <Fragment key={id}>
              <div
                className={`title animating ${question === id ? "active" : ""}`}
                onClick={() => handleQuestion(id)}
              >
                <i
                  className={`angle ${
                    question === id ? "down " : "right"
                  } icon`}
                />
                {que}
              </div>
              <div
                className={`content animating ${
                  question === id ? "active" : "hidden"
                }`}
              >
                <i className="angle right icon" />
                <span ref={answerRef}>
                  {answerInfo.isLoading
                    ? "Loading..."
                    : answerInfo.isSuccess
                    ? answerInfo?.data?.answer?.answer
                    : answerInfo.isError
                    ? "Something went wrong"
                    : ""}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
      ) : null}
      {/* {console.log("session : ", session)} */}
      <Modal
        isModalVisible={isModalVisible}
        handleDismiss={handleDismiss}
        postMutation={postMutation}
        queryInfo={queryInfo}
        loginButton={
          !session ? (
            <>
              <h1 className="ui center aligned header">
                To add a question you need to first login
              </h1>
              <div className="logout__wrapper">
                <button
                  className="ui google plus button"
                  type="button"
                  onClick={() => signIn()}
                >
                  <i className="google plus icon" />
                  Google Login
                </button>
              </div>
            </>
          ) : null
        }
        logoutButton={
          session ? (
            <button
              className="ui google plus button btn-logout"
              onClick={() => signOut()}
            >
              <i className="google plus icon" /> Logout
            </button>
          ) : null
        }
      />
      <style jsx>
        {`
          .ui.styled.accordion {
            border-radius: 0;
            width: 100%;
          }
          .ui.styled .title,
          .ui.styled .content {
            transition: all 0.2s;
            font-size: var(--default-font-size);
            text-transform: capitalize;
            background-image: linear-gradient(
              to right,
              var(--color-primary-dark),
              var(--color-primary-light)
            );
            -webkit-background-clip: text;
            color: transparent;
            counter-increment: css-counter 1;
          }
          .ui.styled i:before {
            color: var(--color-primary-light);
          }
          .title:before {
            content: counter(css-counter) ". ";
          }
          .btn {
            background: var(--color-primary-dark);
            color: var(--color-background);
            text-transform: uppercase;
            text-decoration: none;
            padding: 0.5rem 2rem;
            display: inline-block;
            border-radius: 10rem;
            transition: all 0.2s;
            position: relative;
            font-size: var(--default-font-size);
            width: fit-content;
            border: 2px solid var(--color-primary-dark);
            cursor: pointer;
          }
          .btn:hover {
            background-image: linear-gradient(
              to right,
              var(--color-primary-light),
              var(--color-primary-dark)
            );
            -webkit-background-clip: text;
            color: transparent;
          }
        `}
      </style>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context);
  // if (!session) {
  //   context?.res?.writeHead(302, { location: "/" });
  //   context?.res?.end();
  // }
  return {
    props: { session },
  };
};
export default Questions;