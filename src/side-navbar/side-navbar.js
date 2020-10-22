import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SideNavbarItemComponent from '../side-navbar-item/side-navbar-item';
class SideNavbarComponent extends Component {
    render() {
        return (<div>Hello from side Navbar</div>);
    }
}

export default withStyles(styles)(SideNavbarComponent);
