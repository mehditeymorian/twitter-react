import {makeStyles} from "@material-ui/core";


export const ProfileStyle =  makeStyles((theme) => ({
    root: {
        position: "relative",
        borderRadius: "8px"
    },
    image: {
        width: "100%",
        height: "250px",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px"
    },
    profileImage: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        zIndex: 20,
        position: "absolute",
        top: "200px",
        left: "5%"
    },
    editButton: {
        color: "black",
        marginTop: theme.spacing(2),
        borderRadius: "16px"
    },
    userName: {
        padding: theme.spacing(0,2),
        fontWeight: "bold"
    },
    bio:{
        padding: theme.spacing(0,2)
    },
    bioInfoLayout: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(1),
    },
    bioInfo: {
        marginRight: theme.spacing(2),
        alignItems: "center",
        textDecoration: "none"
    },
    bioInfoIcon: {
        position: "relative",
        marginRight: theme.spacing(1),
        width: theme.typography.body1.fontSize,
        height: theme.typography.body1.fontSize
    },
    invis: {
        visibility: "hidden"
    }
}));