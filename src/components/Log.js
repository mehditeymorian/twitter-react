import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonIcon from "@material-ui/icons/Person";
import RepeatIcon from "@material-ui/icons/Repeat";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import {LogsStyle} from "./LogsStyle";

function isRTL(s) {
	const ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'
		+ '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
	const rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
	const rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');
	
	return rtlDirCheck.test(s);
}

export default function Log(props) {
	const classes = LogsStyle();
	
	const avatarURLs = [
		props.target.profile_picture,
	];
	const targetName = props.target.name;
	const regex = props.tweetText.toString().match(new RegExp("Tweet (.*) at"));
	const tweetText = regex !== null ? regex[1] : "";
	const dir = isRTL(tweetText.toString().split(' ')[0]) ? "rtl" : "ltr";
	const type = props.type;
	const typeMap = {
		"Like": <FavoriteIcon className={classes.icon}
		                      style={{color: "#ff0000"}}/>,
		"Follow": <PersonIcon className={classes.icon}
		                      style={{color: "#0099ff"}}/>,
		"Retweet": <RepeatIcon className={classes.icon}
		                       style={{color: "#2ae000"}}/>,
	}
	const text = {
		"Like": <Typography display={"inline"}>You liked <Typography
			display={"inline"}
			className={classes.sourceName}>{targetName}</Typography>'s
			tweet.</Typography>,
		"Follow": <Typography display={"inline"}>You followed <Typography
			display={"inline"}
			className={classes.sourceName}>{targetName}</Typography>.</Typography>,
		"Retweet": <Typography display={"inline"}>You retweeted <Typography
			display={"inline"}
			className={classes.sourceName}>{targetName}</Typography>'s
			tweet.</Typography>,
	}
	
	return (
		<Card square className={classes.root}>
			<CardActionArea>
				<Grid container className={classes.notification}>
					{typeMap[type]}
					<div className={classes.profilePictures}>
						<Avatar item src={avatarURLs[0]}
						        className={classes.picture}/>
					</div>
					<Grid container className={classes.text}>
						{text[type]}
					</Grid>
					{type === "Follow" ? null :
						<Grid container className={classes.tweet}
						      style={{direction: dir}}>{tweetText}</Grid>}
				</Grid>
			</CardActionArea>
		</Card>
	);
}