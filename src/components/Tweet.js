import React, {useRef, useState} from "react";
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
    BarChart as StatIcon,
    DeleteForever as DeleteIcon
} from '@material-ui/icons';
import TweetText from "./TweetText";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import {Link, Route, useRouteMatch} from "react-router-dom";
import TweetDialog from "./TweetDialog";
import {
    BASE_URL,
    deleteLike,
    deleteRetweet,
    deleteTweet,
    getLikeRetTweet, getProfile,
    likeTweet,
    retweet
} from "../redux/actions";
import {connect} from "react-redux";
import {isStatePresent} from "../redux/stateUtils";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {getLikeRetTweetReducer as likeRetTweet} from "../redux/reducers";
import {Link as UILink} from "@material-ui/core";
import FollowDialog from "./FollowDialog";
import ListDialog from "./ListDialog";
import Profile from "./Profile";

export const TWEET_NORMAL = 0;
export const TWEET_DETAIL = 1;
export const TWEET_REPLY = 2;

const getNameBP = (type) => type === TWEET_DETAIL ? 12 : "auto";

const getCommentsCount = (tweet) => tweet.comments != null ? tweet.comments.length: tweet.comments_count;

const getTopDateVisibility = (type) => type === TWEET_DETAIL ? "none" : "block";

function Tweet({type = TWEET_NORMAL, tweet, username,
                   actionResult,deleteTweet,userState,profilePic,
                   likeTweet, unlikeTweet, retweet, deleteRetweet, list, getProfile}) {
    const classes = TweetStyle();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [openLikeDialog, setOpenLikeDialog] = useState(false);
    const [openRetweetDialog, setOpenRetweetDialog] = useState(false);
    let {url} = useRouteMatch();
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

    if (isStatePresent(actionResult) && actionResult.id === tweet.id) {
        tweet.liked = actionResult.liked;
        tweet.retweeted = actionResult.retweeted;
        tweet.likes_count = actionResult.likes_count;
        tweet.retweets_count = actionResult.retweets_count;
    }


    const bookmarked = false;
    const myTweet = username === tweet.owner.username;
    const tweetText = tweet.text;
    let like = tweet.liked;
    let retweeted = tweet.retweeted;
    const commentCount =  getCommentsCount(tweet);
    const likesCount = tweet.likes_count;
    const retweetsCount = tweet.retweets_count;

    const [commentDialogOpen, setCommentDialogOpen] = useState(false);
    const onCommentHandle = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        setCommentDialogOpen(true);
    }

    const onLike = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        if (like) unlikeTweet(tweet.id);
        else likeTweet(tweet.id);
        like = !like;
    };

    const onRetweet = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        if (retweeted) deleteRetweet(tweet.id);
        else retweet(tweet.id);
        retweeted = !retweeted;
    };

    const onDeleteButton = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        setDeleteDialogOpen(true);
    };



    const onDeleteCancel = ev => setDeleteDialogOpen(false);
    const onDeleteConfirm = ev => {
        setDeleteDialogOpen(false);
        deleteTweet(tweet.id);
    }
    
    
    const goHome = () => {
        getProfile(userState.token, userState.username);
    }
    
    const content = (<Grid container className={classes.root}>
        <Grid item xs={2} md={1}><Avatar
            src={profilePic}/></Grid>
        <Grid container className={classes.tweetHeader} xs={10} md={11} spacing={1}>
            <Grid container xs={12} alignItems={"center"} justify={"space-between"}>
                <Grid container item xs>
                <Grid item xs={getNameBP(type)}><Typography display={"inline"} className={classes.name}>{tweet.owner.name}</Typography></Grid>
                <Grid item><Typography display={"inline"} className={classes.id} onClick={goHome} component={Link} to={`${url.slice(0, -url.indexOf('/'))}/profile/${tweet.owner.username}`}>@{tweet.owner.username}</Typography></Grid>
                <Grid item><Typography display={"inline"} style={{display: getTopDateVisibility(type)}} className={classes.date}>{tweet.date}</Typography></Grid>
                </Grid>
                <Grid item xs={1}>{tweet.owner.username === userState.username ? <IconButton onClick={onDeleteButton} onMouseDown={event => event.stopPropagation()}><DeleteIcon /></IconButton> : null}</Grid>
            </Grid>
            <Grid item xs={12}><TweetText value={tweetText} textStyle={classes.tweetText}/></Grid>
            {tweet.media !== "" ? <Grid item xs={12}><img className={classes.media} src={`${BASE_URL}/${tweet.media}`}/> </Grid> : null}
            {type === TWEET_DETAIL ? <Grid item xs={12}><Typography color={"secondary"} variant={"subtitle2"}>{tweet.time}</Typography></Grid>: null}
            <Divider />
            {type === TWEET_DETAIL ?
                <Grid container xs={12}>
                    <Typography component={UILink} onClick={() => setOpenRetweetDialog(true)} className={classes.list}>Retweets</Typography>
                    <Typography component={UILink} onClick={() => setOpenLikeDialog(true)} className={classes.list}>Likes</Typography>
                </Grid>
            : null}
            <Divider />
            {type === TWEET_DETAIL ? <Divider/>: null}
            <Grid item container justify={"space-between"} className={classes.tweetActions} xs={12}>
                <Grid item>
                    <IconButton onClick={onCommentHandle}  onMouseDown={event => event.stopPropagation()}><CommentIcon/></IconButton>
                    <Typography display={"inline"} className={classes.actionText}>{commentCount}</Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={onRetweet} onMouseDown={event => event.stopPropagation()}
                        className={retweeted ? classes.retweetStyle : null}><RetweetIcon/></IconButton>
                    <Typography display={"inline"} className={classes.actionText}>{retweetsCount}</Typography>
                </Grid>
                <Grid item>
                    <IconButton  onClick={onLike}  onMouseDown={event => event.stopPropagation()}
                        className={classes.likeStyle}>{like ? <LikeFilledIcon/> :
                        <LikeIcon/>}</IconButton>
                    <Typography display={"inline"} className={classes.actionText}>{likesCount}</Typography>
                </Grid>
                <Grid item><IconButton onClick={event => event.stopPropagation()} onMouseDown={event => event.stopPropagation()}
                    className={classes.bookmarkStyle}>
                    {bookmarked ? <BookmarkFilledIcon/> : <BookmarkIcon/>}</IconButton></Grid>
                {myTweet ? <Grid item><IconButton><StatIcon/></IconButton></Grid> : null}
            </Grid>
        </Grid>

    </Grid>);

    return (
        <Card square>
            <ListDialog name={"Likes"} list={list !== undefined && "likes" in list ? list.likes : null} open={openLikeDialog} setOpen={setOpenLikeDialog}/>
            <ListDialog name={"Retweets"} list={list !== undefined && "retweets" in list ? list.retweets : null} open={openRetweetDialog} setOpen={setOpenRetweetDialog}/>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                aria-labelledby="confirmation-dialog-title"
                open={deleteDialogOpen}>
                <DialogTitle>Delete Tweet</DialogTitle>
                <DialogContent>Tweet will be deleted permanently.</DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={onDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onDeleteConfirm} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <TweetDialog open={commentDialogOpen} setOpen={setCommentDialogOpen} parent={tweet.id} />
            {type !== TWEET_DETAIL ? <CardActionArea component={Link} to={`/tweet-detail/${tweet.id}`}>{content}</CardActionArea> : content}
            <Divider/>
        </Card>
    );

}

const mapStateToProp = state => ({
    userState: state.user,
    actionResult: state.tweetAction,
});

const mapActionsToProp = dispatch => ({
    likeTweet: (id) => dispatch(likeTweet(id)),
    unlikeTweet: (id) => dispatch(deleteLike(id)),
    retweet: (id) => dispatch(retweet(id)),
    deleteRetweet: (id) => dispatch(deleteRetweet(id)),
    deleteTweet: (id) => dispatch(deleteTweet(id)),
    getProfile: (token, username) => dispatch(getProfile(token, username)),
});

export default connect(mapStateToProp, mapActionsToProp)(Tweet);