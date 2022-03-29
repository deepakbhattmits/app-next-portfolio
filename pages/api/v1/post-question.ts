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
      values: { que, answer },
    } = req?.body;
    if (!que || !answer) {
      console.log("inside validation ");
      res.status(401).send({ error: "Please enter all fields" });
      return;
    }
    const client = await connectToDatabase();

    const db = client.db();
    try {
      console.log("inside try before file write question");
      await db.collection("questions").insertOne({
        id: questions?.length + 2,
        que,
      });
      await db.collection("answers").insertOne({
        id: questions?.length + 2,
        answer,
      });
    } catch (err) {
      console.error("If some error : ", err);
    }
    res.status(200).send({ message: "Saved successfully !" });
    client.close();
  } else {
    res.status(200).send({ messgae: "request reached" });
  }
};
export default postQuestion;
