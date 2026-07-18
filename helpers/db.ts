import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_CLUSTER}.7kfrz.mongodb.net/${process.env.MONGO_DB}`
  );
  // const client = await MongoClient.connect(
  //   `mongodb://localhost:27017/${process.env.MONGO_DB}`
  // );

  return client;
};
