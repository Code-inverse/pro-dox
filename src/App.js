import React from 'react';
import './App.css';

import EditorComponent from "./editor/editor";
import SideNavbarComponent from "./side-navbar/side-navbar";

const firebase = require('firebase');

class App extends React.Component {

        state = {
            selectedDocIndex: null,
            selectedDoc: null,
            documents: null
        };

    render() {
        return (
            <div className="app-container">
                <SideNavbarComponent/>
                <EditorComponent/>
            </div>
        );
    }

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

}

export default App;
