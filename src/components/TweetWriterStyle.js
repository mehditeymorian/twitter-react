import {makeStyles} from "@material-ui/core";


export const TweetWriterStyle = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    actionsLayout: {
        paddingTop: theme.spacing(1)
    },
    field: {
        width: '100%'
    },
    sendButton: {
        borderRadius: "20px",
        marginBottom: theme.spacing(1)
    },

}));