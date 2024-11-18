import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.DB_USERNAME;
const pass = process.env.DB_PASS;

import MeetupDetails from "../../components/meetups/MeetupDetails";

export default function Meetup(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetup.title}</title>
        <meta
          name="description"
          content={props.meetup.description}
        />
      </Head>
      <MeetupDetails
        image={props.meetup.image}
        title={props.meetup.title}
        address={props.meetup.address}
        description={props.meetup.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://${user}:${pass}@meetups.mjzqr.mongodb.net/meetups?retryWrites=true&w=majority&appName=Meetups`
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    `mongodb+srv://${user}:${pass}@meetups.mjzqr.mongodb.net/meetups?retryWrites=true&w=majority&appName=Meetups`
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const SelectedMeetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetup: {
        title: SelectedMeetup.title,
        id: SelectedMeetup._id.toString(),
        description: SelectedMeetup.description,
        image: SelectedMeetup.image,
        address: SelectedMeetup.address,
      },
    },
  };
}
