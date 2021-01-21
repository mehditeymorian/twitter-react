import {Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from "react";
import {Link} from 'react-router-dom'
import {AuthStyle} from "./AuthStyle";


export default function SignIn() {
    const classes = AuthStyle();

    return (
        <div className={classes.paper} >
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >Sign In</Button>
                <Grid container>
                    <Grid item xs><Link to={"#"} variant="body2">Forgot password?</Link></Grid>
                    <Grid item><Link to={`sign-up`} variant="body2">Don't have an account? Sign Up</Link></Grid>
                </Grid>
            </form>
        </div>
    );
}