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

const IdentityStyle = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(1),
    },
    button: {
        borderRadius: "20px",
    },
    infoSection: {
        marginLeft: "10px"
    }
}));


export default function Identity({closeDialog,identity}) {
    const classes = IdentityStyle();

    const profileImg = identity.profile_picture === "" ? "https://i.stack.imgur.com/34AD2.jpg" : identity.profile_picture;

    const onIdentityClick = ev => {
        closeDialog();
    };

    return (
        <Card square>
            <CardActionArea onClick={onIdentityClick} component={Link} to={`/profile/${identity.username}`}>
                <Grid container className={classes.root}>
                    <Grid item xs={2} sm={1} ><Avatar src={profileImg}/></Grid>
                    <Grid container xs={9} sm={10} direction={"column"} className={classes.infoSection}>
                        <Grid container xs={12}>
                            <Grid item xs={9} sm={10}>
                                <Typography >{identity.name}</Typography>
                                <Typography >{identity.username}</Typography>
                            </Grid>
                            <Grid item xs={3} sm={2}>
                                <Button size={"small"} color={"secondary"} variant={"contained"}
                                        className={classes.button} disableElevation>Following</Button>
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