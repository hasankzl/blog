import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { themeColor, bgColor } from "../../utils/constants"
const styles = {
    root: {
        color: themeColor
    }
}

function HigherOrderComponent(props) {
    const { classes } = props;
    return <Typography {...props} className={classes.root}>{props.children}</Typography>;
}

HigherOrderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HigherOrderComponent);