import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { getSession, signIn, signOut } from "next-auth/react";
import Modal from "../components/Modal";
import useQuestions from "../hooks/useQuetions";
import usePost from "../hooks/usePost";
import styles from "../styles/Questions.module.scss";
import useAnswer from "../hooks/useAnswer";
import useDelete from "../hooks/useDelete";
import { GetServerSideProps } from "next";
import ErrorNotification from "../components/reusable/ErrorNotification";
import LoadingNotification from "../components/reusable/LoadingNotification";
import SuccessNotification from "../components/reusable/SuccessNotification";
import { LogOut, Minus, Plus } from "lucide-react";



// Individual Accordion Item Component
const AccordionItem = ({ title, answer, isOpen, onClick, handleRemove, session, userId, question, id }) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 p-5" onClick={onClick}>
      <div>
        {/* Trigger Button */}
        <button
          // onClick={onClick}
          className="flex items-center justify-between py-4 text-left font-medium text-slate-800 transition-colors hover:text-indigo-600 focus:outline-none"
          aria-expanded={isOpen}
        >
          {/* {question === id ? <Minus className="mr-2" /> : <Plus className="mr-2" />} */}
          {/* Animated Icon Container */}
          {/* Icon Wrapper Stack */}
          <span className="relative h-10 w-10 flex items-center justify-center">
            {/* Plus Icon */}
            <Plus
              className={`absolute h-10 w-10 hover:text-indigo-600 transition-all duration-300 ease-in-out ${isOpen ? 'rotate-90 opacity-0 scale-75' : 'rotate-0 opacity-100 scale-100'
                }`}
            />

            {/* Minus Icon */}
            <Minus
              className={`absolute h-10 w-10 hover:text-indigo-600 transition-all duration-300 ease-in-out ${isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-75'
                }}`}
            />
          </span>
          <span className="text-3xl first-letter:uppercase">{title}</span>

        </button>
        {/* Animated Content Wrapper using CSS Grid Trick */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
        >
          <div className="overflow-hidden">
            <span className="pb-4 pr-6 text-2xl leading-relaxed text-slate-600">
              {answer}
            </span>
          </div>
        </div>
      </div>
      {!!session && session?.user?.id === userId ? (
        <div><button
          className="btn btn-border btn-remove"
          onClick={(e) => handleRemove(e, id)}
        >
          Remove
        </button>
        </div>
      ) : null}
    </div>
  );
};

const Questions = ({ session }) => {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const answerRef = useRef<HTMLSpanElement>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [question, setQuestion] = useState<number>(0);
  const [deleteQuestion, setDeleteQuestion] = useState<string>("");
  const [wantDelete, setWantDelete] = useState<boolean>(false);

  const [wantDeleteQuestionId, setWantDeleteQuestionId] = useState<string>("");

  const { answerInfo } = useAnswer(question);
  const { queryInfo } = useQuestions();
  const deleteMutation = useDelete();
  const postMutation = usePost();
  const handleAddQuestion = () => {
    setIsModalVisible((prevState) => !prevState);
  };
  const handleDismiss = (e: any) => {
    setIsModalVisible((prevState) => !prevState);
  };
  const handleQuestion = (e: any, id: any) => {
    e.stopPropagation();
    e.preventDefault();
    setQuestion((prevState) => (prevState === 0 ? id : 0));
  };
  const handleRemove = (e, id: string) => {
    e.stopPropagation();
    setWantDelete(true);
    setWantDeleteQuestionId(id);
  };
  const handleRemoveQuestion = () => {
    setWantDelete(false);
    deleteMutation.mutate(wantDeleteQuestionId);
  };
  useEffect(() => {
    if (
      (postMutation?.isSuccess && !queryInfo?.isFetching) ||
      (queryInfo?.isSuccess && !filteredData?.length) ||
      filteredData?.length > queryInfo?.data?.questions?.length
    ) {
      setFilteredData(queryInfo?.data?.questions);
    }
  }, [filteredData, queryInfo]);
  useEffect(() => {
    const i_id = setInterval(() => {
      if (
        (postMutation?.isSuccess && !queryInfo?.isFetching) ||
        (postMutation?.isError && !queryInfo?.isFetching) ||
        (deleteMutation?.isSuccess && !queryInfo?.isFetching) ||
        (deleteMutation?.isError && !queryInfo?.isFetching)
      ) {
        postMutation?.reset();
        deleteMutation?.reset();
        // setIsModalVisible(false);
      }
      // if (postMutation.isError && !queryInfo.isFetching) {
      //   // postMutation.reset();
      // }
    }, 1000);
    return () => {
      clearInterval(i_id);
    };
  }, [postMutation, queryInfo]);
  // Keeps track of the currently opened item's index (null means all closed)
  const [openIndex, setOpenIndex] = useState(null);

  // Sample Data Array
  const faqData = [
    {
      id: 1,
      title: "How does the CSS Grid transition work?",
      answer: "Instead of transitioning 'height: auto' which CSS cannot naturally calculate, we transition the grid row fraction ('0fr' to '1fr'). This achieves a perfectly smooth CSS-only collapse animation regardless of content length.",
    },
    {
      id: 2,
      title: "Is this component fully accessible?",
      answer: "Yes. It uses native semantic HTML buttons with the 'aria-expanded' property toggling dynamically based on state, meeting standard web accessibility criteria.",
    },
    {
      id: 3,
      title: "Can I customize the colors easily?",
      answer: "Absolutely. Simply swap out the Tailwind color tokens (e.g., changing 'text-slate-800' to 'text-gray-900' or 'text-indigo-600' to your brand palette colors).",
    },
  ];

  const handleToggle = (index) => {
    // If clicked item is already open, close it; otherwise, open the new one
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className={styles?.question__container}>
      <div className={`${styles.padding__top__bottom1} ${styles.center}`}>
        <h3 className={styles?.header}>JS Questions</h3>
      </div>
      <div className={styles.link__wrapper}>
        <Link legacyBehavior href="/">
          <a className="">Back to home page</a>
        </Link>
        <div className='flex gap-2'>

          <button
            className="btn btn-border btn-primary"
            onClick={handleAddQuestion}
          >
            Add question
          </button>

          {!!session ? (
            <button
              className="flex gap-2 items-center rounded-full px-4 btn-border btn-remove"
              onClick={() => signOut()}
            >
              <LogOut />
              Logout
            </button>

          ) : null}
        </div>
      </div>
      {!filteredData?.length ? (
        <div>Loading....</div>
      ) : !!filteredData?.length ? (
        <div className={`ui styled fluid accordion divide-y divide-slate-100 ${styles.customAccordion}`}>
          {filteredData.map((faq, index) => (
            <AccordionItem
              question={question}
              session={session}
              key={faq.id}
              title={faq.que}
              userId={faq.userId}
              id={faq.id}
              answer={answerInfo.isLoading
                ? "Loading..."
                : answerInfo.isSuccess
                  ? answerInfo?.data?.answer?.answer
                  : answerInfo.isError
                    ? "Something went wrong"
                    : ""}
              isOpen={openIndex === faq.id}
              onClick={(e) => {
                handleToggle(faq.id);
                handleQuestion(e, faq.id);
              }
              }
              handleRemove={handleRemove}
            />
          ))}
        </div>) : null}
      <Modal
        userId={session?.user?.id}
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
      {wantDelete ? (
        <div className="confirm__wrapper">
          <div className="confirm__wrapper--content">
            <h1 className="confirm__wrapper--header">
              Are you sure want to delete selected question ?
            </h1>
            <div className="confirm__wrapper--actions">
              <span
                className="btn btn-border btn-primary"
                onClick={handleRemoveQuestion}
              >
                OK
              </span>
              <span
                className="btn btn-border btn-primary"
                onClick={() => setWantDelete(false)}
              >
                Cancel
              </span>
            </div>
          </div>
        </div>
      ) : null}
      {postMutation?.isLoading || deleteMutation?.isLoading ? (
        <LoadingNotification />
      ) : postMutation?.isError || deleteMutation?.isError ? (
        <ErrorNotification
          text={
            (postMutation?.error as any)?.response?.data ||
            (deleteMutation?.error as any)?.response?.data
          }
        />
      ) : postMutation?.isSuccess || deleteMutation?.isSuccess ? (
        <SuccessNotification
          text={postMutation?.data?.message || deleteMutation?.data?.message}
        />
      ) : null}
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
          .title {
            display: flex;
          }
          .btn-primary {
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
          .btn-primary:hover {
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
