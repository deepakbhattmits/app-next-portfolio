import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";
export const fetchQuestionsFile = async () => {
  const questionFilePath = path.join(
    process.cwd(),
    "public",
    "db",
    "questions.json"
  );
  const questionJsonData = await fs.readFile(questionFilePath);
  const questionsString = questionJsonData?.toString();
  const { data } = JSON.parse(questionsString);
  return data;
};
export const fetchAnswersFile = async () => {
  const answerFilePath = path.join(
    process.cwd(),
    "public",
    "db",
    "answers.json"
  );
  const answerJsonData = await fs.readFile(answerFilePath);
  const answersString = answerJsonData?.toString();
  const { data } = JSON.parse(answersString);

  return data;
};
const postQuestionFile = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!!req?.method?.match(/post/i)) {
    const questions = await fetchQuestionsFile();
    const answers = await fetchAnswersFile();
    const {
      values: { que, answer },
    } = req?.body;
    if (!que || !answer) {
      res.status(401).send({ error: "Please enter all fields" });
      return;
    }
    // write question to whole file
    const questionFilePath = path.join(
      process.cwd(),
      "public",
      "db",
      "questions.json"
    );
    const postQuestion: { id: number; que: string }[] = [
      ...questions,
      { id: questions?.length + 2, que },
    ];
    const postQuestionJson = JSON.stringify({
      status: "Request Completed",
      statusCode: 200,
      data: postQuestion,
    });
    try {
      fs.writeFile(questionFilePath, postQuestionJson, { flag: "w" });
    } catch (err) {
      // An error occurred
      console.error("If some error : ", err);
    }

    // write answer to whole file
    const answerFilePath = path.join(
      process.cwd(),
      "public",
      "db",
      "answers.json"
    );
    const postAnswer: { id: number; answer: string }[] = [
      ...answers,
      { id: questions?.length + 2, answer },
    ];
    const postAnswerJson = JSON.stringify({
      status: "Request Completed",
      statusCode: 200,
      data: postAnswer,
    });
    try {
      fs.writeFile(answerFilePath, postAnswerJson, { flag: "w" });
    } catch (err) {
      // An error occurred
      console.error("If some error answer ", err);
    }
    res.status(200).send({ message: "Saved successfully !" });
  } else {
    res.status(200).send({ messgae: "request reached" });
  }
};
export default postQuestionFile;
