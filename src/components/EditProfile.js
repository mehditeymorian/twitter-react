// import React, {useState} from "react";
// import {EditProfileStyle} from "./EditProfileStyle";
// import {Button, useMediaQuery} from "@material-ui/core";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import DialogContent from "@material-ui/core/DialogContent";
// import Dialog from "@material-ui/core/Dialog";
// import useTheme from "@material-ui/core/styles/useTheme";
// import {useHistory} from "react-router-dom";
// import CardMedia from "@material-ui/core/CardMedia";
// import TextField from "@material-ui/core/TextField";
// import DialogActions from "@material-ui/core/DialogActions";
// import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// import CancelIcon from '@material-ui/icons/Cancel';
// import IconButton from "@material-ui/core/IconButton";
// import {updateProfile} from "../redux/actions";
// import {connect} from "react-redux";
//
// function EditProfile({profile, open, setOpen, token, updateUserProfile}) {
// 	const style = EditProfileStyle();
// 	const fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
// 	const h = useHistory()
// 	const handleClose = () => {
// 		setOpen(false);
// 		h.goBack()
// 	}
//
// 	const [bioInput, setBio] = useState("");
// 	const [nameInput, setName] = useState("");
// 	const [profilePictureInput, setProfilePicture] = useState("");
// 	const [headerInput, setHeaderInput] = useState("");
//
// 	function handleChangeHeader() {
//
// 	}
//
// 	const updateProfile = e => {
// 		e.preventDefault();
// 		const np = {
// 			username: profile.username,
// 			name: nameInput,
// 			bio: bioInput,
// 			profilePicture: profilePictureInput,
// 			header: headerInput,
// 		};
// 		updateUserProfile(token, np)
// 	};
//
// 	return (
// 		<form onSubmit={updateProfile}>
// 			<Dialog
// 				className={style.root}
// 				fullScreen={fullScreen}
// 				open={open}
// 				fullWidth
// 				maxWidth={"sm"}
// 				onClose={handleClose}
// 				aria-labelledby="responsive-dialog-title">
// 				<DialogActions style={{paddingTop: "20px"}}>
// 					<IconButton onClick={handleClose} color="primary" className={style.close}>
// 						<CancelIcon/>
// 					</IconButton>
// 					<DialogTitle id="title" style={{left: "50px", position: "absolute"}}>{"Edit Profile"}</DialogTitle>
// 					<Button type="submit" color="primary" variant="contained" className={style.edit} disableElevation clic>
// 						Edit Profile
// 					</Button>
// 				</DialogActions>
// 				<DialogContent>
// 					<IconButton className={style.addHeaderIcon} onClick={handleChangeHeader()}>
// 						<AddAPhotoIcon />
// 					</IconButton>
// 					<IconButton className={style.deleteIcon} onClick={handleChangeHeader()}>
// 						<HighlightOffIcon/>
// 					</IconButton>
// 					<CardMedia image={profile.header} className={style.header}/>
// 					<IconButton className={style.addProfileIcon} onClick={handleChangeHeader()}>
// 						<AddAPhotoIcon />
// 					</IconButton>
// 					<CardMedia image={profile.profilePicture} className={style.profile}/>
// 				</DialogContent>
// 				<DialogContent>
// 					<TextField
// 						autoFocus
// 						margin="dense"
// 						id="name"
// 						label="Name"
// 						defaultValue={profile.name}
// 						type="text"
// 						fullWidth
// 						required
// 						onChange={event => setName(event.target.value)}
// 					/>
// 				</DialogContent>
// 				<DialogContent>
// 					<TextField
// 						margin="dense"
// 						id="bio"
// 						label="Bio"
// 						defaultValue={profile.bio}
// 						type="text"
// 						multiline
// 						rows={3}
// 						fullWidth
// 						onChange={event => setBio(event.target.value)}
// 					/>
// 				</DialogContent>
// 			</Dialog>
// 		</form>
// 	);
// }
//
// const mapStateToProp = state => ({
// 	token: state.user.token,
// });
//
// const mapActionsToProp = dispatch => ({
// 	updateUserProfile: (token, newProfile) => dispatch(updateProfile(token, newProfile)),
// });
//
// export default connect(mapStateToProp, mapActionsToProp)(EditProfile);
