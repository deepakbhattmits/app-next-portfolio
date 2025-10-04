import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers";
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware'; // adjust path accordingly

const cors = initMiddleware(
  Cors({
    methods: ['GET'],
    origin: 'https://app-next-portfolio.vercel.app', // ← set your frontend URL here
    credentials: true,
  })
);

const getAnswer = async (req: NextApiRequest, res: NextApiResponse) => {
   await cors(req, res); // 👈 Important: run the CORS middleware first
   // const { questionId } = req?.query;
  const client = await connectToDatabase();
  const db = client?.db();
  const answer = await db?.collection("answers").findOne({ id: +questionId });
  res.status(200).json({ success: "Success", answer });
  client.close();
};
export default getAnswer;
