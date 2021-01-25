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


export default function Identity() {
    const classes = IdentityStyle();

    return (
        <Card square>
            <CardActionArea component={Link} to={"/profile"}>
                <Grid container className={classes.root}>
                    <Grid item xs={2} sm={1} ><Avatar src={"https://uifaces.co/our-content/donated/gPZwCbdS.jpg"}/></Grid>
                    <Grid container xs={9} sm={10} direction={"column"} className={classes.infoSection}>
                        <Grid container xs={12}>
                            <Grid item xs={9} sm={10}>
                                <Typography >Tweet name</Typography>
                                <Typography >My Handler</Typography>
                            </Grid>
                            <Grid item xs={3} sm={2}>
                                <Button size={"small"} color={"secondary"} variant={"contained"}
                                        className={classes.button} disableElevation>Following</Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}><Typography>This is my shitty bio</Typography></Grid>
                    </Grid>
                </Grid>
            </CardActionArea>
            <Divider/>
        </Card>
    );

};