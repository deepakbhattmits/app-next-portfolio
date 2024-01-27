import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers";

export const fetchQuestions = async () => {
  const client = await connectToDatabase();
  const db = client?.db();
  const questions = await db?.collection("questions").find().toArray();
  client.close();
  return questions;
};
export const fetchAnswers = async () => {
  const client = await connectToDatabase();

  const db = client?.db();
  const answers = await db?.collection("answers").find().toArray();
  client.close();
  return answers;
};
const postQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!!req?.method?.match(/post/i)) {
    const questions = await fetchQuestions();
    const {
      values: {
        userId,
        inputs: { que, answer },
      },
    } = req?.body;
    if (que?.trim()?.length === 0 || answer?.trim()?.length === 0) {
      res.status(401).send({ error: "Please enter all fields" });
      return;
    }
    const client = await connectToDatabase();

    const db = client.db();
    let lastElement: any = questions.slice(-1);
    try {
      await db.collection("questions").insertOne({
        id: +lastElement[0]?.id + 1,
        que,
        userId,
      });
      await db.collection("answers").insertOne({
        id: +lastElement[0]?.id + 1,
        answer,
      });
    } catch (err) {
      // console.error("If some error : ", err);
    }
    res.status(200).send({ message: "Saved successfully !" });
    client.close();
  } else {
    res.status(200).send({ messgae: "request reached" });
  }
};
export default postQuestion;
