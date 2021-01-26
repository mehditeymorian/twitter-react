import React, {Fragment, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {
    Image as MediaIcon,
    Gif as GifIcon,
    Poll as PollIcon,
    EmojiEmotionsOutlined as EmojiIcon,
    Schedule as ScheduleIcon

} from "@material-ui/icons";
import {TweetWriterStyle} from "./TweetWriterStyle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import SpecialTextField from "./SpecialTextField";
import {createTweet} from "../redux/actions";
import {connect} from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import {isStateLoading} from "../redux/stateUtils";

function TweetWriter({userState, createState, createTweet}) {
    const style = TweetWriterStyle();
    const [tweetText, setTweetText] = useState("");

    const onSend = ev => {
        const tweet = {
            text: tweetText,
            media: null,
            parent: null
        };
        createTweet(tweet);
    };

    return (
        <>
            <Grid container className={style.root}>
                <Grid item xs={2} md={1}><Avatar src={userState.profile_picture} alt={userState.username}/></Grid>
                <Grid container xs={10} md={11}>
                    <Grid item xs={12}><SpecialTextField text={tweetText} setText={setTweetText}/></Grid>
                    <Grid container alignItems={"center"} justify={"space-between"} className={style.actionsLayout}>
                        <Grid container  xs>
                            <Grid item><IconButton><MediaIcon/></IconButton></Grid>
                            <Grid item><IconButton><GifIcon/></IconButton></Grid>
                            <Grid item><IconButton><PollIcon/></IconButton></Grid>
                            <Grid item><IconButton><EmojiIcon/></IconButton></Grid>
                            <Grid item><IconButton><ScheduleIcon/></IconButton></Grid>
                        </Grid>
                        <Grid item xs={3} sm={3} md={2} lg={2}>
                            <Button variant={"contained"} onClick={onSend} disableElevation color={"secondary"} className={style.sendButton}>Tweet</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {isStateLoading(createState)? <LinearProgress /> : null}
            <Divider/>
        </>
    );
};

const mapStateToProp = state => ({
    createState: state.createTweet,
    userState: state.user
});

const mapActionsToProp = dispatch => ({
    createTweet: tweet => dispatch(createTweet(tweet)),
});

export default connect(mapStateToProp, mapActionsToProp)(TweetWriter);