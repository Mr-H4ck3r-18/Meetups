// /new-meetup
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Fragment } from "react";
import Head from "next/head";

export default function NewMeetup() {
  const router = useRouter();
  async function handleFormSubmission(data) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log(result);
    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Add new meetup</title>
        <meta
          name="description"
          content="Create meetup to build network"
        />
      </Head>
      <NewMeetupForm onAddMeetup={handleFormSubmission} />
    </Fragment>
  );
}
