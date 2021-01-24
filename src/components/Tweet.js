import React, {Fragment} from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import {TweetStyle} from "./TweetStyle";
import IconButton from "@material-ui/core/IconButton";
import {
    Comment as CommentIcon,
    Repeat as RetweetIcon,
    FavoriteBorder as LikeIcon,
    Bookmark as BookmarkIcon,
    BarChart as StatIcon
} from '@material-ui/icons';
import TweetText from "./TweetText";


export default function Tweet() {
    const classes = TweetStyle();
    const tweetText = "Lorem Ipsum is simply #dummy text of the printing and typesetting.com industry.\n" +
        "                                Lorem Ipsum has been the #industry's standard dummy text.ir ever since the 1500s,\n" +
        "                                when an unknown printer took a #galley of type and #scrambled it to make a type specimen\n" +
        "                                book.info";

    return (
        <Fragment>
            <Grid container className={classes.root}>
                <Grid item xs={2} md={1}><Avatar src={"https://uifaces.co/our-content/donated/gPZwCbdS.jpg"}/></Grid>
                <Grid container className={classes.tweetHeader} xs={10} md={11}>
                    <Grid item xs={12}>
                        <Typography display={"inline"} className={classes.name}>Meyti</Typography>
                        <Typography display={"inline"} className={classes.id}>@meyti_t</Typography>
                        <Typography display={"inline"} className={classes.date}>. Jan 20</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TweetText value={tweetText} textStyle={classes.tweetText}/>
                    </Grid>
                    <Grid container justify={"space-between"} className={classes.tweetActions} xs={12}>
                        <Grid item>
                            <IconButton><CommentIcon/></IconButton>
                            <Typography display={"inline"} className={classes.actionText}>12</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton><RetweetIcon/></IconButton>
                            <Typography display={"inline"} className={classes.actionText}>2</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton><LikeIcon/></IconButton>
                            <Typography display={"inline"} className={classes.actionText}>60</Typography>
                        </Grid>
                        <Grid item><IconButton><BookmarkIcon/></IconButton></Grid>
                        <Grid item><IconButton><StatIcon/></IconButton></Grid>
                    </Grid>
                </Grid>

            </Grid>

            <Divider/>
        </Fragment>
    );

}