import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {PopHashtagListStyle} from "./PopHashtagListStyle";
import Divider from "@material-ui/core/Divider";
import PopHashtag from "./PopHashtag";
import {getTrends, notificationList} from "../redux/actions";
import {connect} from "react-redux";
import {isStatePresent} from "../redux/stateUtils";


function PopHashtagList({trendsState,getTrends}) {
    const style = PopHashtagListStyle();

    useEffect(() => {
        getTrends();
    }, []);

    return (
        <Paper className={style.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant={"h5"} className={style.title}>What's Happening</Typography>
                    <Grid item><Divider/></Grid>
                </Grid>

                {isStatePresent(trendsState) ? trendsState.trends.map(each => <Grid item xs={12} className={style.hashtag}><PopHashtag hashtag={each}/></Grid>) : null}
            </Grid>
        </Paper>
    );

};

const mapStateToProp = state => ({
    trendsState: state.trends
});

const mapActionsToProp = dispatch => ({
    getTrends: () => dispatch(getTrends()),
});

export default connect(mapStateToProp, mapActionsToProp)(PopHashtagList);