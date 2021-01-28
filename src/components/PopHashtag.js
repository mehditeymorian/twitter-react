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


export default function PopHashtag({hashtag}) {
    const style = classes();
    return (
        <Card elevation={0} component={Link} to={`/explore?query=${hashtag.name}`} className={style.root}>
            <CardActionArea className={style.content}>
                <Typography>#{hashtag.name}</Typography>
                <Typography>count:{hashtag.count}</Typography>
            </CardActionArea>
            <Divider/>
        </Card>
    );
};