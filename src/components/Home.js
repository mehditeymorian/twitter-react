import React from "react";
import Paper from "@material-ui/core/Paper";
import TweetWriter from "./TweetWriter";
import Tweet from "./Tweet";
import {connect} from "react-redux";
import {createTweet} from "../redux/actions";

function Home() {
    return (
       <Paper>
           <TweetWriter />
           <Tweet />
           <Tweet />
           <Tweet />
           <Tweet />
           <Tweet />
           <Tweet />
           <Tweet />
           <Tweet />
           <Tweet />
           <Tweet />
           <Tweet />
           <Tweet />
       </Paper>
    );
}

const mapStateToProp = state => ({
       createState: state.createState
});

const mapActionsToProp = dispatch => ({
       createTweet: tweet => dispatch(createTweet(tweet)),
});

export default connect(mapStateToProp, mapActionsToProp)(Home);

