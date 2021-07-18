import React, { useEffect, useState } from "react";
import { Header } from "../container";
import { TweetForm } from "../component/tweetForm";
import { TweetList } from "../component/tweetList";

export default function Home() {
  const [tweetText, setTweetText] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetch("tweetData.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTweets(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function onChangeTweetForm(e) {
    setTweetText(e.target.value);
    console.log(tweetText);
  }

  const handleTweetSubmit = () => {
    setTweets([
      {
        id: tweets.length + 1,
        name: localStorage.getItem("username"),
        username: localStorage.getItem("username"),
        tweetContent: tweetText,
        likeCount: 5,
        retweetCount: 5,
        replyCount: 5,
        dateTime: "2020-07-01 09:17:20",
      },
      ...tweets,
    ]);
  };

  return (
    <div className="latestTweets">
      <Header title="Home" />
      <TweetForm
        tweetText={tweetText}
        onChangeTweetForm={onChangeTweetForm}
        handleTweetSubmit={handleTweetSubmit}
      />
      <div className="latestTweets__divisor" />
      {tweets.length > 0 ? (
        <TweetList tweets={tweets} />
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
