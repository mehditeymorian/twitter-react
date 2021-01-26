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

function isRTL(s) {
	const ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'
		+ '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
	const rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
	const rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');
	
	return rtlDirCheck.test(s);
}

export default function Notification(props) {
	const classes = NotificationsStyle();
	
	// need to change these to actual input
	const avatarURLs = [
		"https://uifaces.co/our-content/donated/gPZwCbdS.jpg",
		"https://uifaces.co/our-content/donated/gPZwCbdS.jpg",
		"https://uifaces.co/our-content/donated/gPZwCbdS.jpg"
	];
	const srcName = props.srcName
	const tweetText = props.tweetText;
	const dir = isRTL(tweetText.toString().split(' ')[0]) ? "rtl" : "ltr";
	const type = props.type;
	const typeMap = {
		"like": <FavoriteIcon className={classes.icon}
		                      style={{color: "#ff0000"}}/>,
		"follow": <PersonIcon className={classes.icon}
		                      style={{color: "#0099ff"}}/>,
		"retweet": <RepeatIcon className={classes.icon}
		                       style={{color: "#2ae000"}}/>,
	}
	const remainingText = {
		"like": avatarURLs.length > 1 ? <Grid item><Typography
			display={"inline"}>and {avatarURLs.length - 1} others liked your
			tweet.</Typography></Grid> : <Grid item><Typography
			display={"inline"}>liked your tweet.</Typography></Grid>,
		"follow": <Grid item><Typography display={"inline"}>followed
			you.</Typography></Grid>,
		"retweet": <Grid item><Typography display={"inline"}>retweeted your
			tweet.</Typography></Grid>,
	}
	
	return (
		<Card square className={classes.root}>
			<CardActionArea>
				<Grid container className={classes.notification}>
					{typeMap[type]}
					<div className={classes.profilePictures}>
						{
							avatarURLs.map((url) => {
								return <Avatar item src={url}
								               className={classes.picture}/>
							})
						}
					</div>
					<Grid container className={classes.text}>
						<Grid item><Typography display={"inline"}
						                       className={classes.sourceName}>{srcName} </Typography></Grid>
						{remainingText[type]}
					</Grid>
					<Grid container className={classes.tweet}
					      style={{direction: dir}}>{tweetText}</Grid>
				</Grid>
			</CardActionArea>
		</Card>
	);
};