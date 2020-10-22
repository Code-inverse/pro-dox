import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import {Divider, Button} from '@material-ui/core';
import SideNavbarItemComponent from '../side-navbar-item/side-navbar-item';

class SideNavbarComponent extends Component {
    state = {
        addingNote: false,
        title: null
    };

    render() {

        const {documents, classes, selectedDocIndex} = this.props;
        //if documents is not null then return the below component else return empty div
        //using map function inside therefore this if statement
        if (documents){
            return (
                <div className={classes.sidebarContainer}>
                    <Button onClick={this.newNoteBtnClickHandler}
                            className={classes.newNoteBtn}>
                        {
                            this.state.addingNote ? 'Cancel' : 'New document'
                        }
                    </Button>
                    {
                        this.state.addingNote ?
                            <div>
                                <input
                                    type='text'
                                    className={classes.newNoteInput}
                                    placeholder='Document title'
                                    onKeyUp={(event)=>this.updateTitleHandler(event.target.value)}
                                >
                                </input>
                                <Button
                                    className={classes.newNoteSubmitBtn}
                                    onClick={this.newNote}>
                                    Submit Note
                                </Button>
                            </div>
                            :null
                    }
                    <List>
                        {
                            documents.map((_doc, _index) => {
                                return (
                                    <div key={_index}>
                                        <SideNavbarItemComponent
                                            _doc={_doc}
                                            _index={_index}
                                            selectedDocIndex={selectedDocIndex}
                                            selectDoc={this.selectDoc}
                                            deleteDoc={this.deleteDoc}
                                        />
                                        <Divider/>
                                    </div>
                                );
                            })
                        }
                    </List>
                </div>
            );
        }else{
            return (<div>Loading..</div>);
        }
    }

    //func to handle new note button click
    newNoteBtnClickHandler =() => {
        console.log('newNoteButton clicked');
        this.setState({
            title: null,
            addingNote: !this.state.addingNote
        });
    };

    // function to handle title , keystroke handling
    updateTitleHandler = (txt) => {
        console.log('updating Title', txt);
        this.setState({title: txt});
    };
    newNote = () => {
        console.log(this.state);
    };
    selectDoc = (doc, index) => {
        this.props.selectDoc(doc, index);
    };
    deleteDoc = () => {
        console.log('delete doc');
    };
}

export default withStyles(styles)(SideNavbarComponent);
