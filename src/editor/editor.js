import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends Component {
    state = {
        text: '',
        title: '',
        id: ''
    };

    updateBody = async (val) => {
        await this.setState({text: val});
        this.update();
    };
    //debouncing here to update DB at a "5 seconds" delay after user stops typing
    update = debounce(() => {
        //TODO: Come back later here
        console.log('updating DB');
    }, 5000);

    componentDidMount = () => {
        this.setState({
            text: this.props.selectedDoc.body,
            title: this.props.selectedDoc.title,
            id: this.props.selectedDoc.id
        });
    }

    componentDidUpdate =() => {
        if (this.props.selectedDoc.id !== this.state.id){
            this.setState({
                text: this.props.selectedDoc.body,
                title: this.props.selectedDoc.title,
                id: this.props.selectedDoc.id
            });
        }
    }

    render() {

        const {classes, documents, selectedDoc, selectedDocIndex} = this.props;

        return (
            <div className={classes.editorContainer}>
                <ReactQuill
                    value={this.state.text}
                    onChange={this.updateBody}>

                </ReactQuill>
            </div>
        );
    }
}

export default withStyles(styles)(EditorComponent);
