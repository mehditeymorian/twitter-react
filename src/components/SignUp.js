import React, { useState} from 'react';
import {Avatar, Typography, Container, CssBaseline, TextField, Button, Grid} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Link} from 'react-router-dom'
import {AuthStyle} from "./AuthStyle";
import {connect} from 'react-redux';
import {signup} from "../redux/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import {isStateFailed, isStateLoading} from "../redux/stateUtils";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";


function SignUp({userState, signupUser}) {
    const classes = AuthStyle();
    const [fNameInput, setFName] = useState("");
    const [lNameInput, setLName] = useState("");
    const [usernameInput, setUsername] = useState("");
    const [emailInput, setEmail] = useState("");
    const [passwordInput, setPassword] = useState("");


    const handleSubmit = ev => {
        ev.preventDefault();
        const user = {
            firstName: fNameInput,
            lastName: lNameInput,
            username: usernameInput,
            email: emailInput,
            password: passwordInput
        };
        signupUser(user);
    };

    const [dialogOpen, setDialogOpen] = React.useState(isStateFailed(userState));

    const handleDialogOpen = () => setDialogOpen(true);

    const handleDialogClose = () => setDialogOpen(false);



    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                {isStateLoading(userState) ? <LinearProgress className={classes.progress}/> : null}
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField autoComplete="fname" name="firstName" variant="outlined" required fullWidth
                                       id="firstName" label="First Name" autoFocus
                                       onChange={event => setFName(event.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField variant="outlined" required fullWidth id="lastName" label="Last Name"
                                       name="lastName" autoComplete="lname"
                                       onChange={event => setLName(event.target.value)}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="outlined" required fullWidth id="username"
                                       label="Username" name="username" autoComplete="username"
                                       onChange={event => setUsername(event.target.value)}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="outlined" required fullWidth id="email"
                                       label="Email Address" name="email" autoComplete="email"
                                       onChange={event => setEmail(event.target.value)}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="outlined" required fullWidth name="password" label="Password"
                                       type="password" id="password" autoComplete="current-password"
                                       onChange={event => setPassword(event.target.value)}/>
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Sign Up</Button>
                    <Grid container justify="flex-end">
                        <Grid item><Link to={`sign-in`} variant="body2">Already have an account? Sign in</Link></Grid>
                    </Grid>
                </form>
            </div>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Failed to Sign Up"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">There was an error in sign-up.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

const mapStateToProp = state => ({
    userState: state.user
});

const mapActionsToProp = dispatch => ({
    signupUser: user => dispatch(signup(user)),
});

export default connect(mapStateToProp, mapActionsToProp)(SignUp);