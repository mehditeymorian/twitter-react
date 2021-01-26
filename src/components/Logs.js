import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {LogsStyle} from "./LogsStyle";
import Log from "./Log";

export default function Logs() {
	const style = LogsStyle();
	
	// TODO get the input from the server
	const logEvent = {
	
	};
	
	return (
		<Paper className={style.root}>
			<Log type="like" tweetText="سلام من به" targetName="dadashi"/>
			<Log type="retweet" tweetText="asdfasdweryweryfasdfdfaasdywerywerfsadfasdfasdf" targetName="dadashi"/>
			<Log type="follow" tweetText="asdfayweryasdfsdfasdfasywerywerdfsadfasdfasdf" targetName="dadashi"/>
			<Log type="like" tweetText="asdfasdrywerfawererywersdasfaadfasfadfasdfasdf" targetName="dadashi"/>
			<Log type="retweet" tweetText="سعزی asdfa" targetName="dadashi"/>
			<Log type="like" tweetText="asdfasdferyweasdffasdsffaffasdfasadfasdfasdf" targetName="dadashi"/>
			<Log type="follow" tweetText="asdfayweryasdfsdfasdfasywerywerdfsadfasdfasdf" targetName="dadashi"/>
			<Log type="like" tweetText="asdfasdfaswerywerywdfsdfasdasdfsadfasdfasdf" targetName="dadashi"/>
		</Paper>
	);
}