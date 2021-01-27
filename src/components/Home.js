import React, {useEffect} from "react";
import Paper from "@material-ui/core/Paper";
import TweetWriter from "./TweetWriter";
import {connect} from "react-redux";
import {getTimeline} from "../redux/actions";
import Tweet from "./Tweet";
import {isStatePresent} from "../redux/stateUtils";
import LinearProgress from "@material-ui/core/LinearProgress";

function Home({user, timeline, getTimeline}) {


    useEffect(() => {
        getTimeline();
    }, []);

    console.log(timeline);
    return (
        <Paper>
            <TweetWriter/>
            {isStatePresent(timeline) ? timeline.tweets.map(each => <Tweet tweet={each} username={user.username}/>):<LinearProgress/>}
        </Paper>
    );
}

const mapStateToProp = state => ({
    user: state.user,
    timeline: state.timeline
});

const mapActionsToProp = dispatch => ({
    getTimeline: () => dispatch(getTimeline()),
});

export default connect(mapStateToProp, mapActionsToProp)(Home);

