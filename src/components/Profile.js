import React, {Fragment, useState} from "react";
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
import Tweet from "./Tweet";
import FollowDialog from "./FollowDialog";
import Logs from "./Logs";
import EditProfile from "./EditProfile";
import {getProfile} from "../redux/actions";
import {connect} from "react-redux";

function Profile({profile, token, getUserProfile}) {
    const classes = ProfileStyle();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => setValue(newValue);
    let {url} = useRouteMatch();
    let {username} = useParams();
    
    if (profile.state === -1) {
        const result = getUserProfile(token, username);
        console.log("GETTING IT");
    }

    const [openFollowDialog, setOpenFollowDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    
    const userProfile = {
        username: profile.username,
        name: profile.name,
        bio:profile.bio,
        profilePicture: profile.profile_picture === "" ? "https://i.stack.imgur.com/34AD2.jpg" : profile.profile_picture,
        header: profile.header_picture === "" ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAW8AAACJCAMAAADUiEkNAAAAA1BMVEVpo7nX6yl3AAAASElEQVR4nO3BMQEAAADCoPVPbQsvoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICXAcTwAAG9LRdQAAAAAElFTkSuQmCC" : profile.header_picture
    }
    
    console.log(profile);
    return (
        <Paper className={classes.root}>
            <FollowDialog open={openFollowDialog} setOpen={setOpenFollowDialog} />

            <Grid container spacing={0} >
                <Grid item xs={12}><img src={userProfile.header} className={classes.image} alt={"random"}/></Grid>
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
                    <Typography component={UILink} onClick={() => setOpenFollowDialog(true)} className={classes.bioInfo}>{"followings" in profile ? profile.followings.length : 0} Followings</Typography>
                    <Typography component={UILink} onClick={() => setOpenFollowDialog(true)} className={classes.bioInfo}>{"followers" in profile ? profile.followers.length : 0} Followers</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Fragment>
                        <Tabs value={value} onChange={handleChange}
                              indicatorColor="primary" textColor="primary" variant={"fullWidth"}>
                            <Tab label="Tweets" component={Link} to={`${url}`}/>
                            <Tab label="Tweets & replies" component={Link} to={`${url}/with_replies`}/>
                            <Tab label="Media" component={Link} to={`${url}/media`}/>
                            <Tab label="Logs" component={Link} to={`${url}/logs`}/>
                        </Tabs>
                        <Divider/>
                        <Switch>
                            <Route exact path={`${url}`}>
                                {"Tweets" in profile ? profile.Tweets.tweets.map((t) => {
                                    return <Tweet tweet={t}/>
                                }) : null}
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
    profile: state.profile,
});

const mapActionsToProp = dispatch => ({
    getUserProfile: (token, username) => dispatch(getProfile(token, username)),
});

export default connect(mapStateToProp, mapActionsToProp)(Profile);
