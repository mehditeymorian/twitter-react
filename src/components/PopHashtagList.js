import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {PopHashtagListStyle} from "./PopHashtagListStyle";
import Divider from "@material-ui/core/Divider";
import PopHashtag from "./PopHashtag";


export default function PopHashtagList() {
    const style = PopHashtagListStyle();
    return (
        <Paper className={style.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant={"h4"}>What's Happening</Typography>
                    <Grid item><Divider/></Grid>
                </Grid>

                <Grid item xs={12} className={style.hashtag}><PopHashtag /></Grid>
                <Grid item xs={12} className={style.hashtag}><PopHashtag /></Grid>
                <Grid item xs={12} className={style.hashtag}><PopHashtag /></Grid>
                <Grid item xs={12} className={style.hashtag}><PopHashtag /></Grid>
                <Grid item xs={12} className={style.hashtag}><PopHashtag /></Grid>


            </Grid>
        </Paper>
    );

};