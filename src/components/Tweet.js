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

export default function Tweet({type = TWEET_NORMAL, tweet, username}) {
    const classes = TweetStyle();
    /*
    What does each tweet have:
        liked? (by me),
        likeCount
        media,
        owner -> bio, name, profile_picture, username
        parents
        retweeted? (by me),
        retweetCount
        text
        time
     */
    
    const tweetText = tweet.text;
    const like = tweet.liked;
    const bookmarked = false;
    const retweeted = tweet.retweeted;
    const myTweet = username === tweet.owner.username;
    return (
        <Card square>
            <CardActionArea disabled={type === TWEET_DETAIL} component={Link} to={`/tweet-detail/${tweet.id}`}>
                <Grid container className={classes.root}>
                    <Grid item xs={2} md={1}><Avatar
                        src={tweet.owner.profile_picture}/></Grid>
                    <Grid container className={classes.tweetHeader} xs={10} md={11} spacing={1}>
                        <Grid container xs={12} alignItems={"flex-start"}>
                            <Grid item xs={getNameBP(type)}><Typography display={"inline"} className={classes.name}>{tweet.owner.name}</Typography></Grid>
                            <Grid item><Typography display={"inline"} className={classes.id}>@{tweet.owner.username}</Typography></Grid>
                            <Grid item><Typography display={"inline"} style={{display: getTopDateVisibility(type)}} className={classes.date}>{tweet.date}</Typography></Grid>
                        </Grid>
                        <Grid item xs={12}><TweetText value={tweetText} textStyle={classes.tweetText}/></Grid>
                        {type === TWEET_DETAIL ? <Grid item xs={12}><Typography>{tweet.date}</Typography></Grid>: null}
                        {type === TWEET_DETAIL ? <Divider/>: null}
                        <Grid container justify={"space-between"} className={classes.tweetActions} xs={12}>
                            <Grid item>
                                <IconButton><CommentIcon/></IconButton>
                                <Typography display={"inline"} className={classes.actionText}>{tweet.comments.length}</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton
                                    className={retweeted ? classes.retweetStyle : null}><RetweetIcon/></IconButton>
                                <Typography display={"inline"} className={classes.actionText}>{tweet.retweets_count}</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton className={classes.likeStyle}>{like ? <LikeFilledIcon/> :
                                    <LikeIcon/>}</IconButton>
                                <Typography display={"inline"} className={classes.actionText}>{tweet.likes_count}</Typography>
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