import {makeStyles} from "@material-ui/core";


export const TweetStyle = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(2)
    },
    tweetHeader: {
        padding: theme.spacing(0,1)
    },
    name: {
    },
    id: {
        padding: theme.spacing(1,1),
        cursor: "pointer"
    },
    date: {

    },
    tweetActions: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
    },
    actionText: {
        cursor: "pointer"
    },
    retweetStyle: {
        color: "#228B22",
    },
    likeStyle: {
        color: "#FF0000"
    },
    bookmarkStyle: {
      color: theme.palette.primary
    },
    media: {
        width: "200px",
        height: "200px",
    }
}));