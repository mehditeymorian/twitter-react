import Card from "@material-ui/core/Card";
import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {NotificationsStyle} from "./NotificationsStyle";
import FavoriteIcon from '@material-ui/icons/Favorite';
import RepeatIcon from '@material-ui/icons/Repeat';
import PersonIcon from '@material-ui/icons/Person';
import Typography from "@material-ui/core/Typography";
import {
	deleteLike,
	deleteRetweet,
	deleteTweet, getProfile, getTweet,
	likeTweet,
	retweet
} from "../redux/actions";
import {connect} from "react-redux";
import {Link, useRouteMatch} from "react-router-dom";
import Tweet from "./Tweet";

function isRTL(s) {
	const ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'
		+ '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
	const rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
	const rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');
	
	return rtlDirCheck.test(s);
}

function Notification({n, userState, unread, getT}) {
	const classes = NotificationsStyle();
	// need to change these to actual input
	let {url} = useRouteMatch();
	const avatarURLs = [
		"https://uifaces.co/our-content/donated/gPZwCbdS.jpg",
		"https://uifaces.co/our-content/donated/gPZwCbdS.jpg",
		"https://uifaces.co/our-content/donated/gPZwCbdS.jpg"
	];
	const blueShade = unread;
	const srcName = n.source.name;
	const type = n.mode;
	const regex = n.content.toString().match(new RegExp("Tweet (.*) at"));
	const tweetText = regex !== null ? regex[1] : "";
	const dir = isRTL(tweetText.split(' ')[0]) ? "rtl" : "ltr";
	const typeMap = {
		"Like": <FavoriteIcon className={classes.icon}
		                      style={{color: "#ff0000"}}/>,
		"Follow": <PersonIcon className={classes.icon}
		                      style={{color: "#0099ff"}}/>,
		"Retweet": <RepeatIcon className={classes.icon}
		                       style={{color: "#2ae000"}}/>,
	}
	const remainingText = {
		"Like": avatarURLs.length > 1 ? <Grid item><Typography
			display={"inline"}>and {avatarURLs.length - 1} others liked your
			tweet.</Typography></Grid> : <Grid item><Typography
			display={"inline"}>liked your tweet.</Typography></Grid>,
		"Follow": <Grid item><Typography display={"inline"}>followed
			you.</Typography></Grid>,
		"Retweet": <Grid item><Typography display={"inline"}>retweeted your
			tweet.</Typography></Grid>,
	}
	
	const showTweet = () => {
		if (n !== undefined && "tweet" in n && n.tweet.id !== undefined && type !== "Follow") {
			getT(n.tweet.id);
			return <Tweet tweet={n.tweet} fallback="timeline"/>
		}
	}
	
	return (
		<Card square className={classes.root}>
			<CardActionArea>
				<Grid container className={classes.notification} style={blueShade ? {backgroundColor: "#d6edff"} : null}>
					{typeMap[type]}
					<div className={classes.profilePictures}>
						{
							avatarURLs.map((url) => {
								return <Avatar item src={url} className={classes.picture}/>
							})
						}
					</div>
					<Grid container className={classes.text}>
						<Grid item>
							<Typography display={"inline"} className={classes.sourceName}>
								{srcName}
							</Typography>
						</Grid>
						{remainingText[type]}
					</Grid>
					<Grid container component={Link} to={`${url.slice(0, -url.indexOf('/'))}/tweet-detail/${n.tweet.id}`} className={classes.tweet} style={{direction: dir}} onClick={showTweet}>
						{tweetText}
					</Grid>
				</Grid>
			</CardActionArea>
		</Card>
	);
};

const mapStateToProp = state => ({
	userState: state.user,
});

const mapActionsToProp = dispatch => ({
	getT: (id) => dispatch(getTweet(id)),
});

export default connect(mapStateToProp, mapActionsToProp)(Notification);
