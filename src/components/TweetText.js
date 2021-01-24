import React from "react";
import {makeStyles} from "@material-ui/core";


const URL_REGEX = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
const HASHTAG_REGEX = /#[\w_]+/gi;



export default function TweetText({value, textStyle}) {

    const classes = makeStyles((theme) => ({
        something: {
            textDecoration: "none",
            color: "red"
        }
    }));

    /* todo: change style of text links*/

    let result = value.replaceAll(HASHTAG_REGEX, oldValue => `<a className={"${classes.something}"} href={"/hashtag"}>${oldValue}</a>`);
    result = result.replaceAll(URL_REGEX, oldValue => `<a className={"${classes.something}"} href={"/url"}>${oldValue}</a>`);
    return (<div className={textStyle} dangerouslySetInnerHTML={{__html: result}}/>);

}