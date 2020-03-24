import React, { Component } from 'react'
import i18n from "../i18n"
import tr from "../icon/tr.png"
import en from "../icon/en.png"
import changeLanguage from "../components/header/action"
import { Button, NativeSelect, Select, MenuItem, makeStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { themeColor, bgColor } from "./constants"
const StyledSelect = withStyles(theme => ({
    root: {
        border: "none !important",
        margin: "10px",
        marginTop: "20px"
    },
}))(Select);
const LangButtons = props => (
    <div>
        <StyledSelect
            onChange={(e) => {
                props.changeLanguage(e.target.value)
            }}
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={props.currentLang}
            label="lang"
            disableUnderline={true}
        >

            <MenuItem value="en"><img src={en} /></MenuItem>
            <MenuItem value="tr"><img src={tr} /></MenuItem>
        </StyledSelect>
    </div>
)
const mapStateToProps = ({ headerReducer }) => ({
    currentLang: headerReducer.currentLang
})
const mapDispatchToProps = {
    changeLanguage
}
export default connect(mapStateToProps, mapDispatchToProps)(LangButtons);