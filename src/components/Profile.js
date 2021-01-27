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
import {followList, getProfile} from "../redux/actions";
import {connect} from "react-redux";
import {isStatePresent} from "../redux/stateUtils";
import Box from "@material-ui/core/Box";
import FollowDialog from "./FollowDialog";
import Tweet from "./Tweet";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`}
             aria-labelledby={`full-width-tab-${index}`}{...other}>
            {value === index && (<Box p={3}><Typography>{children}</Typography></Box>)}
        </div>
    );
}



function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const getFollowingCount = state => isStatePresent(state) ? state.profile.followings.length : -1;
const getFollowersCount = state => isStatePresent(state) ? state.profile.followers.length : -1;

function Profile({profileState, token, tweets, getUserProfile,getFollowList, followListState}) {
    const classes = ProfileStyle();
    let {url} = useRouteMatch();
    let {username} = useParams();

    const [openFollowDialog, setOpenFollowDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const [selectedTab, setSelectedTab] = useState(0);
    const handleTabChange = (event, newValue) => setSelectedTab(newValue);


    console.log("reload");


    useEffect(() => {
                getUserProfile(token, username);
                getFollowList(username);
    },[username]);



    const userProfile = {
        username: isStatePresent(profileState) ? profileState.profile.username : "Loading..",
        name: isStatePresent(profileState) ? profileState.profile.name : "Loading..",
        bio: isStatePresent(profileState) ? profileState.profile.bio : "Loading..",
        profilePicture: isStatePresent(profileState) ? profileState.profile.profile_picture : "https://i.stack.imgur.com/34AD2.jpg",
        header: isStatePresent(profileState) ? profileState.profile.header_picture : "assets/header_default.png"
    };
    
    return (
        <Paper className={classes.root}>
            <FollowDialog followListState={followListState} open={openFollowDialog} setOpen={setOpenFollowDialog} />

            <Grid container spacing={0} >
                <Grid item xs={12}>
                    <img src={"/assets/header_default.png"}  className={classes.image} alt={"random"}/>
                </Grid>
                <Grid item xs={1} sm={8}><Avatar src={userProfile.profilePicture}
                                                 className={classes.profileImage}/></Grid>
                <Grid container xs={11} sm={4} justify={"flex-end"} spacing={2}>
                    <Grid item><Button className={classes.editButton} variant={"outlined"} component={Link} to={`${url}/edit`} onClick={() => setOpenEditDialog(true)}>Edit profile</Button></Grid>
                    <Route path={`${url}/edit`}>
                        {/*<EditProfile profile={userProfile} open={openEditDialog} setOpen={setOpenEditDialog}/>*/}
                    </Route>
                </Grid>
                <Grid item xs={12}><Typography className={classes.userName}>{userProfile.name}</Typography></Grid>
                <Grid item xs={12}><Typography className={classes.bio} variant={"caption"}>@{userProfile.username}</Typography></Grid>
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
                    <Typography component={UILink} onClick={() => setOpenFollowDialog(true)} className={classes.bioInfo}>{getFollowingCount(profileState)} Followings</Typography>
                    <Typography component={UILink} onClick={() => setOpenFollowDialog(true)} className={classes.bioInfo}>{getFollowersCount(profileState)} Followers</Typography>
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
                                {isStatePresent(tweets) ? tweets.tweets.map(each=> <Tweet username={username} tweet={each}/>) : null}
                            </Route>
                            <Route path={`${url}/with_replies`}><h1>With Replies</h1></Route>
                            <Route path={`${url}/media`}><h1>Media</h1></Route>
                            <Route path={`${url}/logs`}>{Logs()}</Route>
                        </Switch>

                    </Fragment>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProp = state => ({
    token: state.user.token,
    profileState: state.profile,
    followListState: state.followList,
    tweets: state.getTweets,
});

const mapActionsToProp = dispatch => ({
    getUserProfile: (token, username) => dispatch(getProfile(token, username)),
    getFollowList: (username) => dispatch(followList(username)),
});

export default connect(mapStateToProp, mapActionsToProp)(Profile);
