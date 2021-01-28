import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import {Avatar, makeStyles, Typography} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Link} from "react-router-dom";
import {logoutUser} from "../redux/actions";
import {connect} from "react-redux";
import {getUserProfileImg, isStatePresent} from "../redux/stateUtils";

const profileMenuLinks = ["/profile", "/settings","/auth/sign-in"];

const style = makeStyles((theme) => ({
    profileMenuLayout: {
        width: "max-content",
        backgroundColor: "transparent",
        borderRadius: "35px"
    },
    profileMenuActionArea: {
        width: "auto",
        padding: theme.spacing(1),
        display: "flex",
        flexDirection: "row"
    },
    profileMenuTitle: {
        marginLeft: theme.spacing(1),
        color: "white"
    },
}));

function ProfileMenu({userState, logout}) {
    const classes = style();
    const logged = isStatePresent(userState);
    const [profileMenuAnchor, setProfileMenuAnchor] = React.useState(null);
    const handleProfileClick = (event) => setProfileMenuAnchor(event.currentTarget);
    const handleProfileMenuClose = (which = -1) => {
        setProfileMenuAnchor(null);
        if (which === 2) { // logout
            logout();
        }
    }


    return (
        <>
            <Card elevation={0} className={classes.profileMenuLayout} onClick={handleProfileClick}>
                <CardActionArea className={classes.profileMenuActionArea}>
                    <Avatar src={getUserProfileImg(userState.profile_picture)} alt={userState.username}/>
                    <Typography display={"inline"}
                                className={classes.profileMenuTitle}>{logged ? userState.username : "Sign In"}</Typography>
                </CardActionArea>
            </Card>
            <Menu
                id="profile-menu"
                anchorEl={profileMenuAnchor}
                keepMounted
                open={Boolean(profileMenuAnchor)}
                onClose={() => handleProfileMenuClose()}>
                {logged ? <MenuItem onClick={() => handleProfileMenuClose(0)} component={Link}
                                    to={`${profileMenuLinks[0]}/${userState.username}`}>Profile</MenuItem> : null}
                {logged ? <MenuItem onClick={() => handleProfileMenuClose(1)} component={Link}
                                    to={profileMenuLinks[1]}>Settings</MenuItem> : null}
                {logged ? <MenuItem onClick={() => handleProfileMenuClose(2)} component={Link}
                                    to={profileMenuLinks[2]}>Logout</MenuItem> : null}
                {!logged ? <MenuItem onClick={() => setProfileMenuAnchor(null)} component={Link} to={"/auth/sign-in"}>Sign in</MenuItem> : null}

            </Menu>
        </>
    );

};

const mapStateToProp = state => ({
    userState: state.user
});

const mapActionsToProp = dispatch => ({
    logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProp, mapActionsToProp)(ProfileMenu);