import {connect} from "react-redux";
import {makeStyles, Paper} from "@material-ui/core";
import {suggestionList} from "../redux/actions";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import React, {Fragment} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Tweet from "./Tweet";
import Identity from "./Identity";

const SuggestionStyle = makeStyles((theme) => ({
	root: {},
	header: {
		borderRadius: "15px 15px 0 0",
		paddingTop: theme.spacing(1),
		paddingLeft: theme.spacing(1),
		fontSize: "20px",
		fontWeight: "bold",
		borderStyle: "solid",
		borderWidth: "0 0 5px 0",
		borderColor: "lightblue"
	},
}));

function Suggestion({suggestion, getSuggestion}) {
	const classes = SuggestionStyle();
	
	if (suggestion.state === -1) {
		getSuggestion();
	}
	
	console.log(suggestion);
	
	return (
		<Paper className={classes.root}>
			<Grid item className={classes.header}>Suggestion</Grid>
			<Fragment>
				{"users" in suggestion ? suggestion.users.map(u => {
					return <Identity identity={u}/>
				}) : null}
			</Fragment>
		</Paper>
	);
}

const mapStateToProp = state => ({
	userState: state.user,
	suggestion: state.suggestion,
});

const mapActionsToProp = dispatch => ({
	getSuggestion: () => dispatch(suggestionList()),
});

export default connect(mapStateToProp, mapActionsToProp)(Suggestion);
