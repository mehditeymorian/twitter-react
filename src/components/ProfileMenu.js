import React, {Fragment} from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import {Avatar, Grid, makeStyles, Typography} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Link} from "react-router-dom";

const profileMenuLinks = ["/profile","/settings","/logout"];

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

export default function ProfileMenu() {
    const classes = style();
    const [profileMenuAnchor, setProfileMenuAnchor] = React.useState(null);
    const handleProfileClick = (event) => setProfileMenuAnchor(event.currentTarget);
    const handleProfileMenuClose = () => setProfileMenuAnchor(null);


    return (
        <Fragment>
            <Card elevation={0} className={classes.profileMenuLayout} onClick={handleProfileClick}>
                <CardActionArea className={classes.profileMenuActionArea}>
                    <Avatar src={"https://uifaces.co/our-content/donated/gPZwCbdS.jpg"}/>
                    <Typography display={"inline"} className={classes.profileMenuTitle}>Your Profile</Typography>
                </CardActionArea>
            </Card>
            <Menu
                id="profile-menu"
                anchorEl={profileMenuAnchor}
                keepMounted
                open={Boolean(profileMenuAnchor)}
                onClose={handleProfileMenuClose}>
                <MenuItem onClick={handleProfileMenuClose} component={Link} to={profileMenuLinks[0]}>Profile</MenuItem>
                <MenuItem onClick={handleProfileMenuClose} component={Link} to={profileMenuLinks[1]}>Settings</MenuItem>
                <MenuItem onClick={handleProfileMenuClose} component={Link} to={profileMenuLinks[2]}>Logout</MenuItem>
            </Menu>
        </Fragment>
    );

};