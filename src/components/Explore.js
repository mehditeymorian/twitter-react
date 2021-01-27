import React, {Fragment, useState} from "react";
import {Paper} from "@material-ui/core";
import {ExploreStyle} from "./ExploreStyle";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import {search} from "../redux/actions";
import {connect} from "react-redux";
import Tweet from "./Tweet";
import Identity from "./Identity";

function Explore({searchState, userState, searchQuery}) {
	const classes = ExploreStyle();
	const [textInput, setTextInput] = useState("");
	
	const searchHandler = (e) => {
		if (textInput.startsWith("#")) {
			searchQuery("hashtag", textInput.slice(1));
		} else if (textInput.startsWith("@")) {
			searchQuery("user", textInput.slice(1));
		} else {
			searchQuery("tweet", textInput);
		}
	};
	
	return (
		<Paper className={classes.root}>
			<Grid item className={classes.header}>Explore</Grid>
			<AppBar position="relative">
				<Toolbar>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon/>
						</div>
						<InputBase
							onChange={e => setTextInput(e.target.value)}
							onKeyPress={e => e.code === "Enter" || e.code === "NumpadEnter" ? searchHandler(e) : null}
							placeholder="Search..."
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{'aria-label': 'search'}}
						/>
					</div>
				</Toolbar>
			</AppBar>
			<Fragment>
				{"tweets" in searchState ? searchState.tweets.map(t => {
					return <Tweet tweet={t} username={userState.username}/>
				}) : null}
				{"users" in searchState ? searchState.users.map(u => {
					return <Identity identity={u}/>
				}) : null}
			</Fragment>
		</Paper>
	);
}

const mapStateToProp = state => ({
	userState: state.user,
	searchState: state.search
});

const mapActionsToProp = dispatch => ({
	searchQuery: (type, query) => dispatch(search(type, query)),
});

export default connect(mapStateToProp, mapActionsToProp)(Explore);

