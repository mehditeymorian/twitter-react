import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import React from "react";
import {makeStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import {Link} from "react-router-dom";

const classes = makeStyles((theme) => ({
    root: {
        textDecoration: "none",
    },
    content: {
        padding: theme.spacing(1)
    }
}));


export default function PopHashtag() {
    const style = classes();
    return (
        <Card elevation={0} component={Link} to={"#"} className={style.root}>
            <CardActionArea className={style.content}>
            <Typography>12.3k</Typography>
            <Typography>Biden is Fucked up!</Typography>
            </CardActionArea>
            <Divider/>
        </Card>
    );
};