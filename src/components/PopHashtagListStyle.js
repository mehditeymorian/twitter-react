import {makeStyles} from "@material-ui/core";


export const PopHashtagListStyle = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1,1)
    },
    title: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(1),
    },
    hashtag: {
        padding: theme.spacing(1,1)
    }
}));