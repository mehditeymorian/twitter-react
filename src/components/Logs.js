import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {LogsStyle} from "./LogsStyle";
import Log from "./Log";
import {isStatePresent} from "../redux/stateUtils";

export default function Logs({events}) {
	const style = LogsStyle();
	
	return (
		<Paper className={style.root}>
			{
				events.length > 0 ? events.map(l =>
					<Log type={l.mode} tweetText={l.content} targetName={l.target.username}/>
				)
				: null
			}
		</Paper>
	);
}