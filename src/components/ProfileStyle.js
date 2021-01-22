import {makeStyles} from "@material-ui/core";


export const ProfileStyle =  makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    image: {
        width: "100%",
        height: "250px",

    },
    profileImage: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        position: "absolute",
        top: "315px",
        left: "5px"
    },
    editButton: {
        color: "white"
    },

    bio:{
        padding: theme.spacing(0,2)
    }
}));