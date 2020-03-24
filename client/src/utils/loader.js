import React, { Component } from 'react'
import { Theme, createStyles } from '@material-ui/core/styles';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { themeColor, bgColor } from "./constants"
import { connect } from "react-redux"
const styles = theme => ({
    root: {
        position: "absolute",
        width: "100%",
        height: "80%",
        zIndex: 9999,
        pointerEvents: "none",
        filter: "blur(4px)",
        transition: "background-color 0.5s ease"
    },
    spinner: {

        backgroundColor: bgColor,
        '& .MuiLinearProgress-bar2Indeterminate': {
            backgroundColor: themeColor,
        },
        '& .MuiLinearProgress-bar1Indeterminate': {
            backgroundColor: themeColor,
        },

    }
})
class loader extends Component {

    render() {
        const { classes, fetching } = this.props;
        return fetching == true ? (

            <div>
                <LinearProgress color="secondary" className={classes.spinner} />
                <div className={classes.root}>
                    {this.props.children}
                </div>
            </div>
        ) : (

                <div>

                    <div>
                        {this.props.children}
                    </div>
                </div>
            )

    }
}
const mapStateToProps = ({ axiosReducer }) => ({
    fetching: axiosReducer.fetching
})
export default connect(mapStateToProps)(withStyles(styles)(loader))