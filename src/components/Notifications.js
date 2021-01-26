import React from "react";
import Paper from "@material-ui/core/Paper";
import {NotificationsStyle} from "./NotificationsStyle";
import Notification from "./Notification";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

export default function Notifications() {
    const style = NotificationsStyle();

    // TODO get the input from the server
    const notifEvent = {
    
    };
    
    return (
        <Paper className={style.root}>
            <Grid item className={style.header}>Notifications</Grid>
            <Notification type="like" tweetText="سلام من به" srcName="dadashi"/>
            <Notification type="retweet" tweetText="asdfasdweryweryfasdfdfaasdywerywerfsadfasdfasdf" srcName="dadashi"/>
            <Notification type="follow" tweetText="asdfayweryasdfsdfasdfasywerywerdfsadfasdfasdf" srcName="dadashi"/>
            <Notification type="like" tweetText="asdfasdrywerfawererywersdasfaadfasfadfasdfasdf" srcName="dadashi"/>
            <Notification type="retweet" tweetText="سعزی asdfa" srcName="dadashi"/>
            <Notification type="like" tweetText="asdfasdferyweasdffasdsffaffasdfasadfasdfasdf" srcName="dadashi"/>
            <Notification type="follow" tweetText="asdfayweryasdfsdfasdfasywerywerdfsadfasdfasdf" srcName="dadashi"/>
            <Notification type="like" tweetText="asdfasdfaswerywerywdfsdfasdasdfsadfasdfasdf" srcName="dadashi"/>
        </Paper>
    );
}

