import TextField from "@material-ui/core/TextField";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core";
import TweetText from "./TweetText";

const classes = makeStyles(() => ({
    textInput: {
        fontSize: "medium",
        lineHeight: "20px",
        color: "transparent",
        caretColor: "black",
        zIndex: "1",
        "&::placeholder": {
            color: "#434343"
        }
    },
    tweetText: {
        width: "100%",
        position: "absolute",
        top: "5px",
        fontSize: "medium",
        lineHeight: "20px",

    },
    textInputLayout: {
        position: "relative",
        zIndex: "0"
    },

}));





export default function SpecialTextField({textRef, clearInput=false}) {
    const style = classes();
    const [text, setText] = useState("");


    const onChange = ev => {setText(ev.target.value);};

    return (
        <div className={style.textInputLayout}>
            <TextField
                placeholder={"What's happening?"}
                fullWidth
                multiline
                required
                rows={5}
                inputRef={textRef}
                onChange={onChange}
                inputProps={{maxLength: 250, className: style.textInput}}
            />
            <TweetText value={text} textStyle={style.tweetText}/>
        </div>
    );
}