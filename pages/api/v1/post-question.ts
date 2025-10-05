import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers";
import Cors from 'cors';
import initMiddleware from '../../../lib/init-middleware'; // adjust path accordingly
const cors = initMiddleware(
  Cors({
    methods: ['POST'],
    origin: 'https://app-next-portfolio.vercel.app', // ← set your frontend URL here
    credentials: true,
  })
);
const postQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res)
  if (!!req?.method?.match(/post/i)) {
    const timeStamp = Date.now()
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
    try {
      await db.collection("questions").insertOne({
        id: timeStamp,
        que,
        userId,
      });
      await db.collection("answers").insertOne({
        id: timeStamp,
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
