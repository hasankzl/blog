import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from './Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';

import Link from "./Link"
import { themeColor, bgColor } from "../../utils/constants"

const StyledMenu = withStyles({

})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: bgColor,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function CustomizedMenus(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { i18n } = props;
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Link
                onClick={handleClick}
            >
                {i18n.t("header.settings")}
            </Link>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link href="#/user-settings">

                    <StyledMenuItem>
                        <ListItemIcon>
                            <PermIdentityOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={i18n.t("header.userSettings")} />
                    </StyledMenuItem></Link>
                <StyledMenuItem>
                    <ListItemIcon>
                        <InboxIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={i18n.t("header.inbox")} />
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}
