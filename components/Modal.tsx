import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingNotification from "./reusable/LoadingNotification";
import ErrorNotification from "./reusable/ErrorNotification";
import SuccessNotification from "./reusable/SuccessNotification";
import { IProp } from "../interfaces";
import { formOptions, isEmpty } from "../utils";
const Modal: FC<IProp> = ({
  isModalVisible,
  handleDismiss,
  postMutation,
  queryInfo,
  loginButton,
  logoutButton,
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm(formOptions());
  const [inputs, setInputs] = useState<{ que: string; answer: string }>({
    que: "",
    answer: "",
  });
  const handleDiscard = () => {
    reset();
    setInputs({
      que: "",
      answer: "",
    });
    handleDismiss();
  };
  const handlekeyDown = useCallback((e: any) => {
    if (e.keyCode === 27) {
      handleDismiss();
      reset();
    }
  }, []);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (e: any) => {
    if (isEmpty(errors)) {
      postMutation.mutate(inputs);
      reset();
      setInputs({
        que: "",
        answer: "",
      });
    }
  };
  //detect esc key pressed
  useEffect(() => {
    document.addEventListener("keydown", handlekeyDown);

    return () => {
      document.removeEventListener("keydown", handlekeyDown);
    };
  }, [handlekeyDown]);
  useEffect(() => {
    const i_id = setInterval(() => {
      if (
        postMutation.isSuccess &&
        !queryInfo.isFetching &&
        queryInfo?.isSuccess
      ) {
        postMutation.reset();
        handleDismiss();
      }
      if (postMutation.isError && !queryInfo.isFetching) {
        postMutation.reset();
      }
    }, 1000);
    return () => {
      clearInterval(i_id);
    };
  }, [postMutation, queryInfo]);
  return (
    <div
      className={`ui dimmer modals page transition animating fade modal__dimmer ${
        isModalVisible ? "visible active in" : " hidden out "
      }`}
      onClick={handleDiscard}
    >
      <div
        className={`ui mini modal transition animating fade modal-${
          postMutation?.isLoading
            ? "loading"
            : postMutation?.isError
            ? "error"
            : postMutation?.isSuccess
            ? "success"
            : "default"
        }${isModalVisible ? "visible active in" : " hidden out"}`}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        {!!loginButton ? (
          loginButton
        ) : (
          <>
            <div className="header">
              Add Question
              {logoutButton}
            </div>
            <div className="content">
              <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
                <div
                  className={`required field ${!!errors?.que ? "error" : ""}`}
                >
                  <label>Enter your Question</label>
                  <input
                    name="que"
                    type="text"
                    {...register("que", {
                      required: true,
                      onChange: handleChange,
                    })}
                    value={inputs?.que}
                    autoComplete="off"
                  />
                  <div className="modal--invalid-feedback">
                    {errors?.que?.message}
                  </div>
                </div>
                <div
                  className={`required field ${
                    !!errors?.answer ? "error" : ""
                  }`}
                >
                  <label>Answer</label>
                  <textarea
                    name="answer"
                    {...register("answer", {
                      required: true,
                      onChange: handleChange,
                    })}
                    onChange={handleChange}
                    value={inputs?.answer}
                  ></textarea>
                  <div className="modal--invalid-feedback">
                    {errors?.answer?.message}
                  </div>
                </div>
                <div className="field actions">
                  <button
                    className="ui btn btn-reset"
                    type="reset"
                    onClick={handleDiscard}
                  >
                    Discard
                  </button>
                  <button className="ui btn btn-primary" type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
        {postMutation?.isLoading ? (
          <LoadingNotification />
        ) : postMutation?.isError ? (
          <ErrorNotification
            text={(postMutation?.error as any)?.response?.data}
          />
        ) : postMutation?.isSuccess ? (
          <SuccessNotification text={postMutation?.data?.message} />
        ) : null}
      </div>
      <style jsx>{`
        .btn {
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
        }
        .btn-primary {
          background: var(--color-primary-dark);
          color: var(--color-background);
        }
        .btn-reset {
          background: var(--color-primary-light);
          color: var(--color-background);
          border-color: var(--color-primary-light);
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
        .ui.mini.modal > .header:not(.ui) {
          font-size: var(--default-font-size);
        }
      `}</style>
    </div>
  );
};
export default Modal;
