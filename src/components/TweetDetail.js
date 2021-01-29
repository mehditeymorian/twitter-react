import React, {useEffect} from "react";
import {useParams} from 'react-router-dom';
import {getTweet} from "../redux/actions";
import {connect} from "react-redux";
import Tweet, {TWEET_DETAIL, TWEET_REPLY} from "./Tweet";
import {getUserProfileImg, isStatePresent} from "../redux/stateUtils";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core";

const TweetDetailStyle = makeStyles((theme) => ({
    commentTitle: {
        padding: theme.spacing(1)
    }
}));


function TweetDetail({userState,tweetState,getTweetById, list}) {
    const classes = TweetDetailStyle();
    const {id} = useParams();

    useEffect(() => {
        getTweetById(id);
    }, [id]);
    
    return (
        <Card>
            {isStatePresent(tweetState) ? tweetState.parents.map(each=> <Tweet profilePic={getUserProfileImg(each.owner.profile_picture)} username={userState.username} tweet={each} /> ) : null}
            {isStatePresent(tweetState) ? <Tweet type={TWEET_DETAIL} profilePic={getUserProfileImg(tweetState.owner.profile_picture)} username={userState.username} tweet={tweetState} list={list} fallback="detail" shit={{id}} /> : null}
            <Typography className={classes.commentTitle} variant={"h6"}>Comments</Typography>
            <Divider/>
            {isStatePresent(tweetState) ? tweetState.comments.map(each=> <Tweet type={TWEET_REPLY} profilePic={getUserProfileImg(each.owner.profile_picture)} username={userState.username} tweet={each} /> ) : null}
        </Card>
    );

}

const mapStateToProp = state => ({
    userState: state.user,
    tweetState: state.getTweet,
    list: state.likeRetTweet,
});

const mapActionsToProp = dispatch => ({
    getTweetById: (id) => dispatch(getTweet(id)),
});

export default connect(mapStateToProp, mapActionsToProp)(TweetDetail);
