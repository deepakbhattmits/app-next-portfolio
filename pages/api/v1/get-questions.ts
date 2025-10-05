import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers";
// import { fetchQuestions } from "./post-question";
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware'; // adjust path accordingly
const cors = initMiddleware(
  Cors({
    methods: ['DELETE'],
    origin: 'https://app-next-portfolio.vercel.app', // ← set your frontend URL here
    credentials: true,
  })
);
const getQuestions = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res)
  // const questions = await fetchQuestions();
  const client = await connectToDatabase();

  const db = client?.db();
  const questions = await db?.collection("questions").find().toArray();
  res.status(200).send({ success: "Fetched successfully !", questions });
  client.close();
};
export default getQuestions;
