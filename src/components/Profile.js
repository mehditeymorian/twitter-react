import React, {Fragment} from "react";
import {useState} from "react";
import {Grid, Avatar, Button, Paper, Typography, Tabs, Tab} from "@material-ui/core";
import {ProfileStyle} from "./ProfileStyle";
import {Switch, Route, Link, useRouteMatch} from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Tweet from "./Tweet";

export default function Profile() {
    const classes = ProfileStyle();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => setValue(newValue);
    let {url} = useRouteMatch();

    return (
        <fragment className={classes.root}>
            <Paper>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Avatar src={"https://uifaces.co/our-content/donated/gPZwCbdS.jpg"} className={classes.profileImage}/>
                    </Grid>
                    <Grid item xs={12}>
                        <img src={"https://source.unsplash.com/random"} className={classes.image} alt={"Header Image"}/>
                    </Grid>
                    <Grid item xs={10}/>
                    <Grid item xs={2}><Button className={classes.editButton}>Edit profile</Button></Grid>
                    <Grid item xs={12}><Typography className={classes.bio}>Mehdi</Typography></Grid>
                    <Grid item xs={12}><Typography className={classes.bio}>@meyti_T</Typography></Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.bio}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Fragment>
                            <Tabs value={value} onChange={handleChange}
                                  indicatorColor="primary" textColor="primary" centered>
                                <Tab label="Tweets" component={Link} to={`${url}`}/>
                                <Tab label="Tweets & replies" component={Link} to={`${url}/with_replies`}/>
                                <Tab label="Media" component={Link} to={`${url}/media`}/>
                                <Tab label="Likes" component={Link} to={`${url}/likes`}/>
                            </Tabs>
                            <Divider />
                            <Switch>
                                <Route exact path={`${url}`}>
                                    <Tweet />
                                    <Tweet />
                                    <Tweet />
                                    <Tweet />
                                    <Tweet />
                                </Route>
                                <Route path={`${url}/with_replies`}><h1>With Replies</h1></Route>
                                <Route path={`${url}/media`}><h1>Media</h1></Route>
                                <Route path={`${url}/likes`}><h1>Like</h1></Route>
                            </Switch>

                        </Fragment>
                    </Grid>
                </Grid>
            </Paper>
            <Paper>

            </Paper>
        </fragment>

    );
}

