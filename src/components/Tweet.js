import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import {TweetStyle} from "./TweetStyle";
import IconButton from "@material-ui/core/IconButton";
import {
    Comment as CommentIcon,
    Repeat as RetweetIcon,
    FavoriteBorder as LikeIcon,
    Favorite as LikeFilledIcon,
    BookmarkBorder as BookmarkIcon,
    Bookmark as BookmarkFilledIcon,
    BarChart as StatIcon
} from '@material-ui/icons';
import TweetText from "./TweetText";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import {Link} from "react-router-dom";

export const TWEET_NORMAL = 0;
export const TWEET_DETAIL = 1;
export const TWEET_REPLY = 2;

const getNameBP = (type) => type === TWEET_DETAIL ? 12 : "auto";



const getTopDateVisibility = (type) => type === TWEET_DETAIL ? "none" : "block";

export default function Tweet({type = TWEET_NORMAL}) {
    const classes = TweetStyle();
    const tweetText = "Lorem Ipsum is simply #dummy text of the printing and typesetting.com industry.\n" +
        "                                Lorem Ipsum has been the #industry's standard dummy text.ir ever since the 1500s,\n" +
        "                                when an unknown printer took a #galley of type and #scrambled it to make a type specimen\n" +
        "                                book.info";

    const like = false;
    const bookmarked = false;
    const retweeted = false;
    const myTweet = false;
    return (
        <Card square>
            <CardActionArea disabled={type === TWEET_DETAIL} component={Link} to={"/tweet-detail/454534"}>
                <Grid container className={classes.root}>
                    <Grid item xs={2} md={1}><Avatar
                        src={"https://uifaces.co/our-content/donated/gPZwCbdS.jpg"}/></Grid>
                    <Grid container className={classes.tweetHeader} xs={10} md={11} spacing={1}>
                        <Grid container xs={12} alignItems={"flex-start"}>
                            <Grid item xs={getNameBP(type)}><Typography display={"inline"} className={classes.name}>Meyti</Typography></Grid>
                            <Grid item><Typography display={"inline"} className={classes.id}>@meyti_t</Typography></Grid>
                            <Grid item><Typography display={"inline"} style={{display: getTopDateVisibility(type)}} className={classes.date}>. Jan 20</Typography></Grid>
                        </Grid>
                        <Grid item xs={12}><TweetText value={tweetText} textStyle={classes.tweetText}/></Grid>
                        {type === TWEET_DETAIL ? <Grid item xs={12}><Typography>9:34 PM · Jan 24, 2021</Typography></Grid>: null}
                        {type === TWEET_DETAIL ? <Divider/>: null}
                        <Grid container justify={"space-between"} className={classes.tweetActions} xs={12}>
                            <Grid item>
                                <IconButton><CommentIcon/></IconButton>
                                <Typography display={"inline"} className={classes.actionText}>12</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton
                                    className={retweeted ? classes.retweetStyle : null}><RetweetIcon/></IconButton>
                                <Typography display={"inline"} className={classes.actionText}>2</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton className={classes.likeStyle}>{like ? <LikeFilledIcon/> :
                                    <LikeIcon/>}</IconButton>
                                <Typography display={"inline"} className={classes.actionText}>60</Typography>
                            </Grid>
                            <Grid item><IconButton className={classes.bookmarkStyle}>{bookmarked ?
                                <BookmarkFilledIcon/> : <BookmarkIcon/>}</IconButton></Grid>
                            {myTweet ? <Grid item><IconButton><StatIcon/></IconButton></Grid> : null}
                        </Grid>
                    </Grid>

                </Grid>
            </CardActionArea>
            <Divider/>
        </Card>
    );

}