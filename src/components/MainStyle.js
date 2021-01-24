import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 200;

export const MainStyle = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        padding: "0",
        margin: "0",
        display: 'flex',
        backgroundImage: `url(/assets/wallpaper.jpg)`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center"
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        flexGrow: 1,
    },
    timeline:{
        marginRight: theme.spacing(2)
    },
    tweetButton: {
        backgroundColor: theme.palette.primary.main,
        margin: theme.spacing(2,2),
        color: "white"
    }
}));
