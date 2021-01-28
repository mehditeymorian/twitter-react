import React, {useEffect, useState} from 'react';
import {useTheme} from '@material-ui/core/styles';
import {
    AppBar,
    Button,
    CssBaseline,
    Divider,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from '@material-ui/core';
import {
    Bookmark as BookmarksIcon,
    Explore as ExploreIcon,
    Home as HomeIcon,
    Menu as MenuIcon,
    Message as MessageIcon,
    Notifications as NotificationsIcon,
    Person as ProfileIcon,
} from '@material-ui/icons';
import {MainStyle} from "./MainStyle";
import {Link, Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';
import Home from "./Home";
import Messages from "./Messages";
import Explore from "./Explore";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import Profile from "./Profile";
import PopHashtagList from "./PopHashtagList";
import ProfileMenu from "./ProfileMenu";
import Hidden from "@material-ui/core/Hidden";
import TweetDetail from "./TweetDetail";
import TweetDialog from "./TweetDialog";
import {connect} from "react-redux";
import Badge from "@material-ui/core/Badge";
import {notificationList} from "../redux/actions";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Suggestion from "./Suggestion";
import {isStatePresent} from "../redux/stateUtils";

const loginAddress = "/auth/sign-in";
const menu = ["Home", "Explore", "Notifications", "Messages", "Bookmarks", "Profile", "Suggestion"];
const notLogged = [loginAddress, "/Explore", loginAddress, loginAddress, loginAddress, loginAddress, loginAddress];
const icons = [<HomeIcon/>, <ExploreIcon/>, <NotificationsIcon/>, <MessageIcon/>, <BookmarksIcon/>, <ProfileIcon/>, <GroupAddIcon/>];



export let READ_COUNT = 0;
export let TOTAL_COUNT = 0;


function Main({userState, notifications, window, getNotifications}) {
    const classes = MainStyle();
    const theme = useTheme();
    let {url} = useRouteMatch();
    const logged = isStatePresent(userState);
    
    console.log("in main ", userState);
    
    useEffect(() => {
        console.log(notifications);
        setInterval(() => {
            getNotifications();
        }, 5000);
    }, []);
    
    if ("events" in notifications && notifications.events !== null) {
        if (notifications.events != null) TOTAL_COUNT = notifications.events.length;
    }
    
    
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const [openTweetDialog, setOpenTweetDialog] = useState(false);

    const generateMenuItems = ()=> {
        return menu.map((text, index) => (
            <ListItem button key={text} component={Link}
                      to={logged ? `/${menu[index].toLowerCase()}${index === 5 ? `/${userState.username}` : ''}` : notLogged[index].toLowerCase()}>
                <ListItemIcon>{icons[index]}</ListItemIcon>
                {
                    text === "Notifications" ?
                        <Badge color="secondary" badgeContent={TOTAL_COUNT - READ_COUNT} onClick={() => {return READ_COUNT = TOTAL_COUNT}}>
                            <ListItemText primary={text}/>
                        </Badge>
                        : <ListItemText primary={text}/>
                }
            </ListItem>
        ));
    }


    const drawer = (
        <div>
            <div className={classes.toolbar}>
            </div>
            <Divider/>
            <List>{generateMenuItems()}</List>
            <Divider/>
            {logged ?<Button className={classes.tweetButton} variant={"contained"} fullWidth
                    color={"primary"} onClick={() => setOpenTweetDialog(true)}>Tweet</Button> : null}
        </div>);

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <TweetDialog open={openTweetDialog} setOpen={setOpenTweetDialog} />
                <div>
                    <CssBaseline/>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" aria-label="open drawer" edge="start"
                                        onClick={handleDrawerToggle} className={classes.menuButton}><MenuIcon/></IconButton>
                            <Grid container alignItems={"center"} justify={"space-between"} spacing={3}>
                                <Grid item><Typography variant="h6" noWrap>Twitter</Typography></Grid>
                                <Grid item><ProfileMenu/></Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <nav className={classes.drawer} aria-label="mailbox folders">
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Hidden smUp implementation="css">
                            <Drawer
                                container={container}
                                variant="temporary"
                                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                classes={{paper: classes.drawerPaper,}}
                                ModalProps={{keepMounted: true,/* // Better open performance on mobile.*/}}>
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Drawer classes={{paper: classes.drawerPaper,}} variant="permanent" open>{drawer}</Drawer>
                        </Hidden>
                    </nav>
                </div>
            <Grid container className={classes.content} alignItems={"flex-start"} justify={"center"}>
                <Grid item xs={12}><div className={classes.toolbar}/></Grid>
                <Grid item xs={11} md={9} lg={7} xl={5} className={classes.timeline}>
                    <Switch>
                        <Route exact path={"/"} component={Home}/>
                        <Route path={`${url}${menu[0].toLowerCase()}`}>{logged ? <Home/> : <Redirect to={"/auth/sign-in"}/>}</Route>
                        <Route path={`${url}${menu[1].toLowerCase()}`} component={Explore}/>
                        <Route path={`${url}${menu[2].toLowerCase()}`}>{logged ? <Notifications /> : <Redirect to={"/auth/sign-in"}/>}</Route>
                        <Route path={`${url}${menu[3].toLowerCase()}`}>{logged ? <Messages/> : <Redirect to={"/auth/sign-in"}/>}</Route>
                        <Route path={`${url}${menu[4].toLowerCase()}`}>{logged ? <Bookmarks/> : <Redirect to={"/auth/sign-in"}/>}</Route>
                        <Route path={`${url}${menu[5].toLowerCase()}/:username`}><Profile/></Route>
                        <Route path={`${url}${menu[6].toLowerCase()}`}>{logged ? <Suggestion/> : <Redirect to={"/auth/sign-in"}/>}</Route>
                        <Route path={`${url}tweet-detail/:id`}><TweetDetail/></Route>
                    </Switch>
                </Grid>
                <Grid item md={false} lg={3} xl={3}><PopHashtagList/></Grid>
            </Grid>

        </div>
    );
}


const mapStateToProp = state => ({
    userState: state.user,
    notifications: state.notifications,
});

const mapActionsToProp = dispatch => ({
    getNotifications: () => dispatch(notificationList()),
});

export default connect(mapStateToProp, mapActionsToProp)(Main);