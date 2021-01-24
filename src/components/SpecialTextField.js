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





export default function SpecialTextField() {
    const style = classes();
    const [input, setInput] = useState("");


    const onInputChange = input => setInput(input.target.value);

    return (
        <div className={style.textInputLayout}>
            <TextField
                placeholder={"What's happening?"}
                onInput={onInputChange}
                fullWidth
                multiline
                required
                rows={5}
                inputProps={{maxLength: 250, className: style.textInput}}
            />
            <TweetText value={input} textStyle={style.tweetText}/>
        </div>
    );
}