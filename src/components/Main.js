import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Home as HomeIcon, Explore, Notifications, Message, Bookmark, Person} from '@material-ui/icons'
import {MainStyle} from "./MainStyle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

const menu = ["Main", "Explore", "Notifications", "Messages", "Bookmarks", "Profile"];
const icons = [<HomeIcon/>, <Explore/>, <Notifications/>, <Message/>, <Bookmark/>, <Person/>];


export default function Main() {
    const classes = MainStyle();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {[classes.appBarShift]: open,})}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {[classes.hide]: open,})}>
                        <MenuIcon/>
                    </IconButton>
                    <Grid container alignItems={"center"} spacing={3}>
                        <Grid item xs={10}>
                            <Typography variant="h6" noWrap>Twitter</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container alignItems={"center"} spacing={2}>
                                <Grid item><Avatar src={"https://uifaces.co/our-content/donated/gPZwCbdS.jpg"} /></Grid>
                                <Grid item><Typography>Your Profile</Typography></Grid>
                            </Grid>

                        </Grid>
                    </Grid>


                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}>
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {menu.map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{icons[index]}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                {open ? <Button className={classes.tweetButton}>Tweet</Button> : null}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                {/* content goes here*/}

            </main>
        </div>
    )
        ;
}
