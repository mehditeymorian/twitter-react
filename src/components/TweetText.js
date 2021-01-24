import React from "react";
import {makeStyles} from "@material-ui/core";


const URL_REGEX = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
const HASHTAG_REGEX = /#[\w_]+/gi;

const Classes = makeStyles(() => ({
    root: {
        width: "100%",
        position: "absolute",
        top: "5px",
        fontSize: "medium",
        lineHeight: "20px",

    }
}));

export default function TweetText({value}) {
    const style = Classes();
    let result = value.replaceAll(HASHTAG_REGEX, oldValue => `<span><a href={"/hashtag"}>${oldValue}</a></span>`);
    result = result.replaceAll(URL_REGEX, oldValue => `<span><a href={"/url"}>${oldValue}</a></span>`);
    return (<div className={style.root} dangerouslySetInnerHTML={{__html: result}}/>);

}