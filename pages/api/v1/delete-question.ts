import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers";
const deleteQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!!req?.method?.match(/delete/i)) {
    const { id } = req?.body;
    if (!id) {
      res.status(401).send({ error: "Identifier missing" });
      return;
    }
    const client = await connectToDatabase();

    const db = client.db();
    try {
      const question = await db.collection("questions").find({ id })?.toArray();
      const answer = await db.collection("answers").find({ id })?.toArray();
      if (!question || !answer) {
        const error = new Error("Could not find question or answer.");
        res.status(404).send({ message: "Could not find question or answer." });
        throw error;
      }
      if (question[0].id !== id || answer[0].id !== id) {
        const error = new Error("Not authorized!");
        res.status(403).send({ message: "Not authorized!" });
        throw error;
      }
      await db.collection("questions").deleteOne({ id });
      await db.collection("answers").deleteOne({ id });
    } catch (err) {
      // console.error("If some error : ", err);
    }
    res.status(200).send({ message: "Deleted successfully !" });
    client.close();
  } else {
    res.status(200).send({ messgae: "request reached" });
  }
};
export default deleteQuestion;
