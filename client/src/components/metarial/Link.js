import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { themeColor, bgColor } from "../../utils/constants"
const styles = {
    root: {
        color: themeColor,
        marginLeft: "20px",
        fontWeight: "bold",
        padding: "10px",
        '&:hover': {
            color: "#fff",
            transition: "0.3s",
            textDecoration: "none",
            cursor: "pointer",
        },
    },
};

function HigherOrderComponent(props) {
    const { classes } = props;
    return <Link {...props} className={classes.root}>{props.children}</Link>;
}

HigherOrderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HigherOrderComponent);