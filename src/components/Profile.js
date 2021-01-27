import React, {Fragment, useEffect, useState} from "react";
import {
    Avatar,
    Button,
    Divider,
    Grid,
    Link as UILink,
    Paper,
    Tab,
    Tabs,
    Typography
} from "@material-ui/core";
import {ProfileStyle} from "./ProfileStyle";
import {Link, Route, Switch, useParams, useRouteMatch} from "react-router-dom";
import {
    Cake as BirthdayIcon,
    CalendarToday as JoinDateIcon,
    LocationOn as LocationIcon
} from "@material-ui/icons";
import Logs from "./Logs";
import {follow, followList, getProfile, logs, unfollow} from "../redux/actions";
import {connect} from "react-redux";
import {getUserProfileImg, isStatePresent} from "../redux/stateUtils";
import FollowDialog from "./FollowDialog";
import EditProfile from "./EditProfile";
import Tweet from "./Tweet";

const PROFILE_FALLBACK = "https://i.stack.imgur.com/34AD2.jpg";
const HEADER_FALLBACK = "https://www.tweetbrander.com/wp-content/uploads/2013/01/twitter-header-post-640x360.png";

const getFollowingCount = state => isStatePresent(state) ? state.profile.followings.length : -1;
const getFollowersCount = state => isStatePresent(state) ? state.profile.followers.length : -1;


function Profile({profileState, userState,followUser, unfollowUser, tweets, getUserProfile, getFollowList, followListState, logs, getLogs}) {
    const classes = ProfileStyle();
    let {url} = useRouteMatch();
    let {username} = useParams();

    const [openFollowDialog, setOpenFollowDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const [selectedTab, setSelectedTab] = useState(0);
    const handleTabChange = (event, newValue) => setSelectedTab(newValue);


    useEffect(() => {
        getUserProfile(userState.token, username);
        getFollowList(username);
        getLogs(username);
    }, [username]);



    const userProfile = {
        username: isStatePresent(profileState) ? profileState.profile.username : "Loading..",
        name: isStatePresent(profileState) ? profileState.profile.name : "Loading..",
        bio: isStatePresent(profileState) ? profileState.profile.bio : "Loading..",
        profilePicture: isStatePresent(profileState) && profileState.profile.profile_picture !== "" ? getUserProfileImg(profileState.profile.profile_picture) : PROFILE_FALLBACK,
        header: isStatePresent(profileState) && profileState.profile.header_picture !== "" ? getUserProfileImg(profileState.profile.header_picture) : HEADER_FALLBACK
    };

    const handleFollow = (ev) => {
        console.log(profileState.profile.username);
        if (profileState.profile.is_following) unfollowUser(profileState.profile.username);
        else followUser(profileState.profile.username);
    };

    const getHeaderButton = () => {
        if (!isStatePresent(profileState)) return null;

        if (profileState.profile.username === userState.username)
            return <Button className={classes.editButton}
                           variant={"outlined"}
                           component={Link} to={`${url}`}
                           onClick={() => setOpenEditDialog(true)}>Edit profile</Button>

        else return <Button className={classes.editButton}
                variant={profileState.profile.is_following ? "contained" : "outlined"}
                            onClick={handleFollow}>
            {profileState.profile.is_following ? 'Following' : 'Follow'}
        </Button>
    }

    return (
        <Paper className={classes.root}>
            <FollowDialog followListState={followListState} open={openFollowDialog} setOpen={setOpenFollowDialog}/>

            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <img src={userProfile.header} className={classes.image} alt={"random"}/>
                </Grid>
                <Grid item xs={1} sm={8}><Avatar src={userProfile.profilePicture}
                                                 className={classes.profileImage}/></Grid>
                <Grid container xs={11} sm={4} justify={"flex-end"} spacing={2}>
                    <Grid item>{getHeaderButton(profileState, userState)}</Grid>
                    {/*<Route path={`${url}`}>*/}
                    <EditProfile profile={userProfile} open={openEditDialog} setOpen={setOpenEditDialog}/>
                    {/*</Route>*/}
                </Grid>
                <Grid item xs={12}><Typography className={classes.userName}>{userProfile.name}</Typography></Grid>
                <Grid item xs={12}><Typography className={classes.bio}
                                               variant={"caption"}>@{userProfile.username}</Typography></Grid>
                <Grid item xs={12}>
                    <Typography className={classes.bio}>{userProfile.bio}</Typography>
                </Grid>
                <Grid container xs={12} className={classes.bioInfoLayout}>
                    <Typography display={"inline"} className={classes.bioInfo}><LocationIcon
                        className={classes.bioInfoIcon}/>Mars</Typography>
                    <Typography display={"inline"} className={classes.bioInfo}><BirthdayIcon
                        className={classes.bioInfoIcon}/>Born December 13, 1999</Typography>
                    <Typography display={"inline"} className={classes.bioInfo}><JoinDateIcon
                        className={classes.bioInfoIcon}/>Joined August 2016</Typography>
                </Grid>
                <Grid container xs={12} className={classes.bioInfoLayout}>
                    <Typography component={UILink} onClick={() => setOpenFollowDialog(true)}
                                className={classes.bioInfo}>{getFollowingCount(profileState)} Followings</Typography>
                    <Typography component={UILink} onClick={() => setOpenFollowDialog(true)}
                                className={classes.bioInfo}>{getFollowersCount(profileState)} Followers</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Fragment>
                        <Tabs value={selectedTab} onChange={handleTabChange}
                              indicatorColor="primary" textColor="primary" variant={"fullWidth"}>
                            <Tab label="Tweets" component={Link} to={`${url}`}/>
                            <Tab label="Tweets & replies" component={Link} to={`${url}/with_replies`}/>
                            <Tab label="Media" component={Link} to={`${url}/media`}/>
                            <Tab label="Logs" component={Link} to={`${url}/logs`}/>
                        </Tabs>
                        <Divider/>
                        <Switch>
                            <Route exact path={`${url}`}>
                                {isStatePresent(tweets) ? tweets.tweets.map(each => <Tweet username={username} profilePic={userProfile.profilePicture}
                                                                                           tweet={each}/>) : null}
                            </Route>
                            <Route path={`${url}/with_replies`}><h1>With Replies</h1></Route>
                            <Route path={`${url}/media`}><h1>Media</h1></Route>
                            <Route path={`${url}/logs`} ><Logs events={isStatePresent(logs) && "events" in logs ? logs.events : null}/></Route>
                        </Switch>

                    </Fragment>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProp = state => ({
    userState: state.user,
    profileState: state.profile,
    followListState: state.followList,
    tweets: state.getTweets,
    logs: state.logs,
});

const mapActionsToProp = dispatch => ({
    getUserProfile: (token, username) => dispatch(getProfile(token, username)),
    getFollowList: (username) => dispatch(followList(username)),
    followUser: (username) => dispatch(follow(username)),
    unfollowUser: (username) => dispatch(unfollow(username)),
    getLogs: (username) => dispatch(logs(username)),
});

export default connect(mapStateToProp, mapActionsToProp)(Profile);
