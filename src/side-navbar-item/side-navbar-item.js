import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from "./styles";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import {removeHTMLTags} from '../helpers';

class SideNavbarItemComponent extends Component {
    render() {

        const {_index, _doc, selectedDocIndex, classes} = this.props;

        return (
            <div key={_index}>
                <ListItem
                    className={classes.listItem}
                    selected={selectedDocIndex === _index}
                    alignItems='flex-start'
                >
                    <div className={classes.textSection}
                         onClick={()=>this.selectDocHandler(_doc, _index)}>
                        <ListItemText
                            primary={_doc.title}
                            secondary={removeHTMLTags(_doc.body.substring(0, 35)) + '...'}
                        />
                    </div>
                    <DeleteIcon
                        className={classes.deleteIcon}
                        onClick={() => this.deleteDocHandler(_doc)}/>
                </ListItem>
            </div>
        );
    }

    selectDocHandler = (doc, index) => {
        this.props.selectDoc(doc, index);
    };
    deleteDocHandler = (doc) => {
        if (window.confirm(`Are you sure to delete: ${doc.title}`)){
            this.props.deleteDoc(doc);
        }
    };
}

export default withStyles(styles)(SideNavbarItemComponent);
