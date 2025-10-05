import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers";

const postQuestion = async (req: NextApiRequest, res: NextApiResponse) => {

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
