import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { themeColor, bgColor } from "../../utils/constants"
const styles = {
    root: {
        color: themeColor,
        marginBottom: "40px",
        marginTop: "20px",
        padding: "10px",
        '&:hover': {
            background: bgColor,
            color: "#fff",
            transition: "0.7s",
        },
    },
};

function HigherOrderComponent(props) {
    const { classes } = props;
    return <Button {...props} className={classes.root}>{props.children}</Button>;
}

HigherOrderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HigherOrderComponent);