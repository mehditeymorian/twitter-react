import {makeStyles} from "@material-ui/core";


export const EditProfileStyle = makeStyles((theme) => ({
	root: {
		height: "auto",
	},
	header: {
		height: 300,
		zIndex: "0"
	},
	profile: {
		borderStyle: "solid",
		borderColor: "white",
		borderWidth: "5px",
		borderRadius: "100px",
		position: "relative",
		height: 150,
		width: 150,
		marginTop: "-75px",
		marginLeft: "10px"
	},
	addHeaderIcon: {
		color: "#000000",
		marginTop: "23%",
		marginLeft: "35%",
		position: "absolute"
	},
	deleteIcon: {
		color: "#000000",
		marginTop: "23%",
		marginLeft: "45%",
		position: "absolute"
	},
	addProfileIcon: {
		color: "#000000",
		marginTop: "-25px",
		marginLeft: "10%",
		position: "absolute",
		zIndex: "1",
	},
	close: {
		left: "5px",
		position: "absolute",
		color: "#4947ff"
	},
	edit: {
		borderRadius: "30px",
		color: "#ffffff",
		fontWeight: "bold",
		backgroundColor: "#4947ff"
	}
}));