import React from "react";
import {makeStyles} from "@material-ui/core";


const URL_REGEX = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
const HASHTAG_REGEX = /#[\w_]+/gi;



export default function TweetText({value, textStyle}) {
    let result = value.replaceAll(HASHTAG_REGEX, oldValue => `<span><a href={"/hashtag"}>${oldValue}</a></span>`);
    result = result.replaceAll(URL_REGEX, oldValue => `<span><a href={"/url"}>${oldValue}</a></span>`);
    return (<div className={textStyle} dangerouslySetInnerHTML={{__html: result}}/>);

}