import React from "react";
import Tweet, {TWEET_DETAIL, TWEET_REPLY} from "./Tweet";


export default function TweetDetail() {
    return (
        <>
            <Tweet/>
            <Tweet/>
            <Tweet type={TWEET_DETAIL}/>
            <Tweet type={TWEET_REPLY}/>
            <Tweet type={TWEET_REPLY}/>
        </>
    );

}