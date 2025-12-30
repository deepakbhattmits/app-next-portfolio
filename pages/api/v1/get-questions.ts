import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers";
// import { fetchQuestions } from "./post-question";
const getQuestions = async (req: NextApiRequest, res: NextApiResponse) => {
  // const questions = await fetchQuestions();
  const client = await connectToDatabase();

  const db = client?.db();
  const questions = await db?.collection("questions").find().toArray();
  res.status(200).send({ success: "Fetched successfully !", questions });
  client.close();
};
export default getQuestions;
