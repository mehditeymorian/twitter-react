import React from "react";
import {useMediaQuery, useTheme} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TweetWriter from "./TweetWriter";


export default function TweetDialog({open,setOpen, parent}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => setOpen(false);


    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            fullWidth
            maxWidth={"sm"}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{"Tweet"}</DialogTitle>
            <DialogContent>
                <TweetWriter parent={parent} setDialogClose={handleClose} />
            </DialogContent>
        </Dialog>
    );

};