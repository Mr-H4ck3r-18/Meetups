import { MongoClient } from "mongodb";
import Head from "next/head";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const user = process.env.DB_USERNAME;
const pass = process.env.DB_PASS;

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

export default function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    `mongodb+srv://${user}:${pass}@meetups.mjzqr.mongodb.net/meetups?retryWrites=true&w=majority&appName=Meetups`
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const Meetups = await meetupCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: Meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        description: meetup.description,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
