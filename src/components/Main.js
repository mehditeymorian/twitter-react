import React from 'react';
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
import Hidden from "@material-ui/core/Hidden";
import TweetDetail from "./TweetDetail";
import TweetDialog from "./TweetDialog";

const menu = ["Home", "Explore", "Notifications", "Messages", "Bookmarks", "Profile"];
const icons = [<HomeIcon/>, <ExploreIcon/>, <NotificationsIcon/>, <MessageIcon/>, <BookmarksIcon/>, <ProfileIcon/>];




function generateMenuItems() {
    return menu.map((text, index) => (
        <ListItem button key={text} component={Link} to={`/${menu[index].toLowerCase()}${index === 5 ? '/mehdi' : ''}`}>
            <ListItemIcon>{icons[index]}</ListItemIcon>
            <ListItemText primary={text}/>
        </ListItem>
    ));
}


export default function Main(props) {
    const { window } = props;
    const classes = MainStyle();
    const theme = useTheme();
    let {url} = useRouteMatch();

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const [openTweetDialog, setOpenTweetDialog] = React.useState(false);


    const drawer = (
        <div>
            <div className={classes.toolbar}>
            </div>
            <Divider/>
            <List>{generateMenuItems()}</List>
            <Divider/>
            <Button className={classes.tweetButton} variant={"contained"} fullWidth
                    color={"primary"} onClick={() => setOpenTweetDialog(true)}>Tweet</Button>
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
            <Grid container className={classes.content} alignItems={"flex-start"} justify={"center"} xs={12}>
                <Grid item xs={12}><div className={classes.toolbar}/></Grid>
                <Grid item xs={11} md={9} lg={7} xl={5} className={classes.timeline}>
                    <Switch>
                        <Route exact path={"/"} component={Home}/>
                        <Route path={`${url}${menu[0].toLowerCase()}`} component={Home}/>
                        <Route path={`${url}${menu[1].toLowerCase()}`} component={Explore}/>
                        <Route path={`${url}${menu[2].toLowerCase()}`} component={Notifications}/>
                        <Route path={`${url}${menu[3].toLowerCase()}`} component={Messages}/>
                        <Route path={`${url}${menu[4].toLowerCase()}`} component={Bookmarks}/>
                        <Route path={`${url}${menu[5].toLowerCase()}/:id`} component={Profile}/>
                        <Route path={`${url}tweet-detail/:id`} component={TweetDetail} />
                    </Switch>
                </Grid>
                <Grid item md={false} lg={3} xl={3}><PopHashtagList/></Grid>
            </Grid>

        </div>
    );
}
