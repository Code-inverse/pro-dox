import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import {Divider, Button} from '@material-ui/core';
import SideNavbarItemComponent from '../side-navbar-item/side-navbar-item';

class SideNavbarComponent extends Component {
    state = {
        addingDoc: false,
        title: null
    };

    //func to handle new note button click
    newNoteBtnClickHandler =() => {
        this.setState({
            title: null,
            addingDoc: !this.state.addingDoc
        });
    };

    // function to handle title update
    updateTitleHandler = (txt) => {
        this.setState({title: txt});
    };
    newDoc = () => {
        this.props.newDoc(this.state.title);
        this.setState({
            title: null,
            addingDoc: false
        });
    };
    selectDoc = (doc, index) => {
        this.props.selectDoc(doc, index);
    };
    deleteDoc = (doc) => {
        this.props.deleteDoc(doc);
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
                            this.state.addingDoc ? 'Cancel' : 'New document'
                        }
                    </Button>
                    {
                        this.state.addingDoc ?
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
                                    onClick={this.newDoc}>
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
    };
}

export default withStyles(styles)(SideNavbarComponent);
