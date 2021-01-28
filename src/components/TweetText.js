import React from "react";
import {makeStyles} from "@material-ui/core";
import {Link} from "@material-ui/core";

const URL_REGEX = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
const HASHTAG_REGEX = /#[\w_]+/gi;
const HANDLER_REGEX = /@[\w_]+/gi;
const PURE = /[^\n\w\t\f\v@#\.]/i;

function mapEach(value, level) {
    if (value.length === 1){
        let space = level === 0 ? ' ' :  '';
        return <a >{`${space}${value}`}</a>;
    }
    let result = value.match(PURE);
    if (result !== null) {
        return <span>
            {mapEach(value.slice(0,result.index), 1)}
            {mapEach(value.slice(result.index,result.index+1),1)}
            {mapEach(value.slice(result.index+1),1)}
        </span>;
    } else {
        if (HASHTAG_REGEX.test(value)) return <span>{' '}<Link display={"inline"} onClick={event => event.stopPropagation()} color={"secondary"} href={`/explore?query=${value.slice(1)}`}>{`${value}`}</Link></span>;
        else if (HANDLER_REGEX.test(value)) return <span>{' '}<Link display={"inline"} onClick={event => event.stopPropagation()} color={"secondary"} href={`/profile/${value.slice(1)}`}>{`${value}`}</Link></span>;
        else if (URL_REGEX.test(value)) return <span>{' '}<Link display={"inline"} onClick={event => event.stopPropagation()} color={"secondary"} href={`http://${value}`}>{`${value}`}</Link></span>;
        else return <a>{` ${value}`}</a>;
    }
}

export default function TweetText({value, textStyle}) {

    return (
        <div className={textStyle}>
            {value.split(/\n/)
                .map(each => (
                    <span>
                        {each.trim().split(/\s/).map( second=>mapEach(second,0))}
                        <br/>
                    </span>
                ))}
        </div>
    )
}