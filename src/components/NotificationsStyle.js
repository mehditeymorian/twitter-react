import {makeStyles} from "@material-ui/core";


export const NotificationsStyle = makeStyles((theme) => ({
	root: {},
	header: {
		borderRadius: "15px 15px 0 0",
		paddingTop: theme.spacing(1),
		paddingLeft: theme.spacing(1),
		fontSize: "20px",
		fontWeight: "bold",
		borderStyle: "solid",
		borderWidth: "0 0 2px 0",
		borderColor: "lightblue"
	},
	notification: {
		paddingLeft: theme.spacing(6),
		paddingRight: theme.spacing(3),
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		borderStyle: "solid",
		borderWidth: "0 0 1px 0",
		borderColor: "#a7a7a7",
	},
	icon: {
		marginTop: 3,
		marginLeft: -35,
		marginRight: 10,
		height: theme.spacing(3),
		width: theme.spacing(3),
	},
	profilePictures: {
		display: "flex",
		paddingBottom: theme.spacing(1),
	},
	picture: {
		marginRight: theme.spacing(1),
		width: theme.spacing(4),
		height: theme.spacing(4),
	},
	text: {
		paddingBottom: theme.spacing(0.5),
	},
	tweet: {
		color: "#a0a0a0",
		fontSize: 14,
		visibility: 0.5
	},
	sourceName: {
		fontWeight: "bold",
		paddingRight: theme.spacing(0.5)
	},
}));