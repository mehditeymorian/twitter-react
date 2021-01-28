import React from "react";
import Paper from "@material-ui/core/Paper";
import {NotificationsStyle} from "./NotificationsStyle";
import Notification from "./Notification";
import Grid from "@material-ui/core/Grid";
import {notificationList} from "../redux/actions";
import {connect} from "react-redux";
import {isStatePresent} from "../redux/stateUtils";

function Notifications({notifications, getNotifications}) {
    const style = NotificationsStyle();
 
	if (notifications.state === -1) {
		// console.log("getting notifs");
		// getNotifications();
	}
	
	const comeOn = () => {
		console.log("i am here, ", notifications);
		return notifications.events.map(n => <Notification n={n} unread={true}/>);
	}
    
    return (
        <Paper className={style.root}>
            <Grid item className={style.header}>Notifications</Grid>
            {
                isStatePresent(notifications) && "events" in notifications && notifications.events.length > 0
	                ? comeOn() : null
            }
        </Paper>
    );
}

const mapStateToProp = state => ({
    notifications: state.notifications,
});

const mapActionsToProp = dispatch => ({
    getNotifications: () => dispatch(notificationList()),
});

export default connect(mapStateToProp, mapActionsToProp)(Notifications);

