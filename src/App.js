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
    deleteDocHandler = async (document) => {
        const docIndex = this.state.documents.indexOf(document);
        await this.setState({
            documents: this.state.documents.filter(_doc => _doc !== document)
        });
        //if the document that is selected is to be deleted then deselecting it
        if (this.state.selectedDocIndex === docIndex){
            this.setState({
                selectedDocIndex: null,
                selectedDoc: null
            });
        } else {
            //if more than one document then select the document at (index - 1) else set null
            this.state.documents.length > 1 ?
                this.selectDocHandler(this.state.documents[this.state.selectedDocIndex - 1], this.state.selectedDocIndex - 1)
                : this.setState({
                    selectedDocIndex: null,
                    selectedDoc: null
                });
        }
        firebase.firestore().collection('docs').doc(document.id).delete();
    };

    //function to handle new document creation in SideNavbarComponent
    newDocHandler = async(title) => {
        const newDoc = {
            title: title,
            body: ''
        };
        const newDocFromDB = await firebase
            .firestore()
            .collection('docs')
            .add({
                title: newDoc.title,
                body: newDoc.body,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        const newId = newDocFromDB.id;
        await this.setState({
            documents: [...this.state.documents, newDoc]
            });
        const newDocIndex = this.state.documents.indexOf(this.state.documents.filter(_doc => _doc.id === newId)[0]);
        this.setState({
            selectedDoc: this.state.documents[newDocIndex],
            selectedDocIndex: newDocIndex
        });
    };

    //updating document to DB here
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
