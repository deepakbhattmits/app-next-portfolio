import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers";

const getAnswer = async (req: NextApiRequest, res: NextApiResponse) => {
  const { questionId } = req?.query;
  const client = await connectToDatabase();
  const db = client?.db();
  const answer = await db?.collection("answers").findOne({ id: +questionId });
  res.status(200).json({ success: "Success", answer });
  client.close();
};
export default getAnswer;
