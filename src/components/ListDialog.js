import React, {useState} from "react";
import {Tab, Tabs, useMediaQuery, useTheme} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SwipeableViews from "react-swipeable-views";
import Identity from "./Identity";
import {isStatePresent} from "../redux/stateUtils";


function TabPanel(props) {
	const { children, value, index, ...other } = props;
	
	return (
		<div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`}
		     aria-labelledby={`full-width-tab-${index}`}{...other}>
			{value === index && (<Box p={3}><Typography>{children}</Typography></Box>)}
		</div>
	);
}



function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}


function ListDialog({name, list, open, setOpen}) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	
	const [dialogSelectedTab, setDialogSelectedTab] = useState(0);
	const handleDialogTabChange = (event, newValue) => setDialogSelectedTab(newValue);
	
	const handleClose = () => setOpen(false);
	
	
	return (
		<Dialog
			fullScreen={fullScreen}
			open={open}
			fullWidth
			maxWidth={"sm"}
			onClose={handleClose}
			aria-labelledby="responsive-dialog-title">
			<DialogTitle id="responsive-dialog-title">{"Follow List"}</DialogTitle>
			<DialogContent>
				<Tabs value={dialogSelectedTab} onChange={handleDialogTabChange} indicatorColor="primary"
				      textColor="primary" variant="fullWidth" aria-label="full width tabs example">
					<Tab label={name} {...a11yProps(0)} />
				</Tabs>
				<SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={dialogSelectedTab}>
					<TabPanel value={dialogSelectedTab} index={0} dir={theme.direction}>
						{list !== null ? list.map((each,i) => <Identity key={i} closeDialog={handleClose} identity={each}/>) : null}
					</TabPanel>
				</SwipeableViews>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={handleClose} color="primary">Close</Button>
			</DialogActions>
		</Dialog>
	);
	
}



export default ListDialog;