import React, {useState} from 'react';
import clsx from 'clsx';
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
    Message as MessageIcon,
    Notifications as NotificationsIcon,
    Person as ProfileIcon,
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon
} from '@material-ui/icons';
import {MainStyle} from "./MainStyle";
import {Switch, Route, Link, useRouteMatch} from 'react-router-dom';
import Home from "./Home";
import Messages from "./Messages";
import Explore from "./Explore";
import Notifications from "./Notifications";
import Bookmarks from "./Bookmarks";
import Profile from "./Profile";
import PopHashtagList from "./PopHashtagList";
import ProfileMenu from "./ProfileMenu";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

const menu = ["Home", "Explore", "Notifications", "Messages", "Bookmarks", "Profile"];
const icons = [<HomeIcon/>, <ExploreIcon/>, <NotificationsIcon/>, <MessageIcon/>, <BookmarksIcon/>, <ProfileIcon/>];

const bottomNavMenu = ["Home", "Explore", "Notifications", "Messages", "Profile"];
const bottomNavIcons = [<HomeIcon/>, <ExploreIcon/>, <NotificationsIcon/>, <MessageIcon/>, <ProfileIcon/>];

const MENU_SWAP_BREAKPOINT = 600;

function getDrawerClass(classes, open) {
    return clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
    });
}

function generateMenuItems() {
    return menu.map((text, index) => (
        <ListItem button key={text} component={Link} to={`/${menu[index].toLowerCase()}`}>
            <ListItemIcon>{icons[index]}</ListItemIcon>
            <ListItemText primary={text}/>
        </ListItem>
    ));
}

function generateNavMenuItems() {
    return bottomNavMenu.map((text, index) => (
        <BottomNavigationAction label={text} icon={bottomNavIcons[index]} component={Link} to={`/${text.toLowerCase()}`} />
    ));
}

export default function Main() {
    const classes = MainStyle();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    let {url} = useRouteMatch();

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const [bottomMenuValue, setBottomMenuValue] = React.useState(0);


    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    window.addEventListener("resize", ev => setScreenWidth(window.innerWidth));

    return (
        <div className={classes.root}>
            {screenWidth > MENU_SWAP_BREAKPOINT ?
                <div>
                    <CssBaseline/>
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {[classes.appBarShift]: open})}>
                        <Toolbar>
                            <IconButton color="inherit" aria-label="open drawer"
                                        onClick={handleDrawerOpen} edge="start"
                                        className={clsx(classes.menuButton, {[classes.hide]: open,})}><MenuIcon/></IconButton>
                            <Grid container alignItems={"center"} spacing={3}>
                                <Grid item xs={10}><Typography variant="h6" noWrap>Twitter</Typography></Grid>
                                <Grid item xs={2}><ProfileMenu/></Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={getDrawerClass(classes, open)}
                        classes={{paper: getDrawerClass(classes, open)}}>
                        <div className={classes.toolbar}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                            </IconButton>
                        </div>
                        <Divider/>
                        <List>{generateMenuItems()}</List>
                        <Divider/>
                        {open ? <Button className={classes.tweetButton}>Tweet</Button> : null}
                    </Drawer>
                </div>: null}
            <Grid container className={classes.content} alignItems={"flex-start"} justify={"center"} spacing={2}>
                <Grid item xs={12}><div className={classes.toolbar}/></Grid>
                <Grid item xs={12} lg={7} xl={5}>
                    <Switch>
                        <Route exact path={"/"} component={Home}/>
                        <Route path={`${url}${menu[0].toLowerCase()}`} component={Home}/>
                        <Route path={`${url}${menu[1].toLowerCase()}`} component={Explore}/>
                        <Route path={`${url}${menu[2].toLowerCase()}`} component={Notifications}/>
                        <Route path={`${url}${menu[3].toLowerCase()}`} component={Messages}/>
                        <Route path={`${url}${menu[4].toLowerCase()}`} component={Bookmarks}/>
                        <Route path={`${url}${menu[5].toLowerCase()}`} component={Profile}/>
                    </Switch>
                </Grid>
                <Grid item xs={false} md={3}><PopHashtagList/></Grid>
            </Grid>

            {
                screenWidth < MENU_SWAP_BREAKPOINT ?
                    <BottomNavigation
                        value={bottomMenuValue}
                        onChange={(event, newValue) => setBottomMenuValue(newValue)}
                        showLabels
                        className={classes.bottomNav}>
                        {generateNavMenuItems()}
                    </BottomNavigation>: null }
            }
        </div>
    );
}
