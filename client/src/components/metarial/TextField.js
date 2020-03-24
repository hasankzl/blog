import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { themeColor, bgColor } from "../../utils/constants"
const styles = {
    root: {
        '& label.Mui-focused': {
            color: themeColor,
        },
        '& .Mui-required': {
            color: themeColor,
        },
        '& .MuiInput-input': {
            color:themeColor,
            border:"none"
        },
        '& a': {
            color: themeColor,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: "white",
        }
    }
}

function HigherOrderComponent(props) {
    const { classes } = props;
    return <TextField {...props} className={classes.root}>{props.children}</TextField>;
}

HigherOrderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HigherOrderComponent);