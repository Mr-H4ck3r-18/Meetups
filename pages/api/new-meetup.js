import { MongoClient } from "mongodb";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const user = process.env.DB_USERNAME;
const pass = process.env.DB_PASS;
console.log(user, pass);
export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      `mongodb+srv://${user}:${pass}@meetups.mjzqr.mongodb.net/meetups?retryWrites=true&w=majority&appName=Meetups`
    );
    const db = client.db();

    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    client.close();

    return res.status(201).json({ message: "Data saved" });
  }
}
