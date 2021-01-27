import React, {useEffect} from "react";
import {useParams} from 'react-router-dom';
import {getTweet} from "../redux/actions";
import {connect} from "react-redux";
import Tweet, {TWEET_DETAIL, TWEET_NORMAL, TWEET_REPLY} from "./Tweet";
import {isStatePresent} from "../redux/stateUtils";


function TweetDetail({userState,tweetState,getTweetById}) {
    const {id} = useParams();

    useEffect(() => {
        getTweetById(id);
    }, [id]);

    return (
        <>
            {isStatePresent(tweetState) ? tweetState.parents.map(each=> <Tweet username={userState.username} tweet={each} /> ) : null}
            {isStatePresent(tweetState) ? <Tweet type={TWEET_DETAIL} username={userState.username} tweet={tweetState} /> : null}
            {isStatePresent(tweetState) ? tweetState.comments.map(each=> <Tweet type={TWEET_REPLY} username={userState.username} tweet={each} /> ) : null}
        </>
    );

}

const mapStateToProp = state => ({
    userState: state.user,
    tweetState: state.getTweet
});

const mapActionsToProp = dispatch => ({
    getTweetById: (id) => dispatch(getTweet(id)),
});

export default connect(mapStateToProp, mapActionsToProp)(TweetDetail);
