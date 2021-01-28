import CardActionArea from "@material-ui/core/CardActionArea";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import React from "react";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {getUserProfileImg} from "../redux/stateUtils";

const IdentityStyle = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(1),
    },
    button: {
        marginTop: "20%",
        borderRadius: "20px",
    },
    infoSection: {
        marginLeft: "10px"
    }
}));


export default function Identity({logged = false, closeDialog, identity}) {
    const classes = IdentityStyle();

    const profileImg = identity.profile_picture === "" ? "https://i.stack.imgur.com/34AD2.jpg" : getUserProfileImg(identity.profile_picture);

    const onIdentityClick = ev => {
        if (closeDialog != null)
            closeDialog();
    };

    return (
        <Card square>
            <CardActionArea onClick={onIdentityClick} component={Link} to={`/profile/${identity.username}`}>
                <Grid container className={classes.root}>
                    <Grid item xs={2} sm={1}><Avatar src={getUserProfileImg(profileImg)}/></Grid>
                    <Grid container xs={9} sm={10} direction={"column"} className={classes.infoSection}>
                        <Grid container xs={12}>
                            <Grid item xs={9} sm={10}>
                                <Typography>{identity.name}</Typography>
                                <Typography>{identity.username}</Typography>
                            </Grid>
                            <Grid item xs={3} sm={2}>
                                {logged ? <Button size={"small"} color={"secondary"} variant={identity.is_following ? "contained" : "outlined"}
                                        className={classes.button} disableElevation>{identity.is_following ? "Following" : "Follow"}</Button> : null}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}><Typography>{identity.bio}</Typography></Grid>
                    </Grid>
                </Grid>
            </CardActionArea>
            <Divider/>
        </Card>
    );

};