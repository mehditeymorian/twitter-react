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


export default function Tweet() {
    const classes = TweetStyle();

    return (
        <Fragment>
            <Grid container className={classes.root}>
                <Grid item xs={1}><Avatar src={"https://uifaces.co/our-content/donated/gPZwCbdS.jpg"}/></Grid>
                <Grid item xs={11}>
                    <Grid container className={classes.tweetHeader}>
                        <Grid item xs={12}>
                            <Typography display={"inline"} className={classes.name}>Meyti</Typography>
                            <Typography display={"inline"} className={classes.id}>@meyti_t</Typography>
                            <Typography display={"inline"} className={classes.date}>. Jan 20</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type specimen
                                book.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justify={"space-between"} className={classes.tweetActions}>
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
                </Grid>

            </Grid>

            <Divider/>
        </Fragment>
    );

}