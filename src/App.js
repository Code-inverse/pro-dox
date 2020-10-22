import React from 'react';
import './App.css';

import EditorComponent from "./editor/editor";
import SideNavbarComponent from "./side-navbar/side-navbar";

const firebase = require('firebase');

class App extends React.Component {
    // app wide state
    state = {
        selectedDocIndex: null,
        selectedDoc: null,
        documents: null
    };
    //function to handle document selection in SideNavbarComponent
    selectDocHandler = (doc, index) => {
        this.setState({
            selectedDoc: doc,
            selectedDocIndex: index
        });
    }
    //function to handle document deletion in SideNavbarComponent
    deleteDocHandler = () => {
    };

    //function to handle new document creation in SideNavbarComponent
    newDocHandler = () => {

    };

    docUpdateHandler = (id, docObject) => {
        console.log(id, docObject);
        firebase
            .firestore()
            .collection('docs')
            .doc(id)
            .update({
                title: docObject.title,
                body: docObject.body,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
    };

    //mapping data from DB to notes constant
    componentDidMount = () => {
        firebase
            .firestore()
            .collection('docs')
            .onSnapshot(serverUpdate => {
                const notes = serverUpdate.docs.map(_doc => {
                    const data = _doc.data();
                    data['id'] = _doc.id;
                    return data;
                });
                console.log(notes);
                this.setState({documents: notes});
            });
    };

    //main render method rendering all underlying components
    render() {
        return (
            <div className="app-container">
                <SideNavbarComponent
                    selectedDocIndex={this.state.selectedDocIndex}
                    documents={this.state.documents}
                    selectDoc={this.selectDocHandler}
                    deleteDoc={this.deleteDocHandler}
                    newDoc={this.newDocHandler}
                />
                {
                    this.state.selectedDoc ?
                        <EditorComponent
                            selectedDoc={this.state.selectedDoc}
                            selectedDocIndex={this.state.selectedDocIndex}
                            documents={this.state.documents}
                            docUpdate={this.docUpdateHandler}
                        />
                        : null
                }
            </div>
        );
    }
}

export default App;
