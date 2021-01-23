import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import React from "react";
import Link from "@material-ui/core/Link";

export default function PopHashtag() {
    return (
        <Link href={"#"}>
            <Typography>12.3k</Typography>
            <Typography>Biden is Fucked up!</Typography>
            <Divider/>
        </Link>);
};