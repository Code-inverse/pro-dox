import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends Component {
    //component state
    state = {
        body: '',
        title: '',
        id: ''
    };

    //updating title handled in this function
    updateTitle = async (val) => {
        await this.setState({
            title: val
        });
        this.update();
    };

    //updating body handled in this function
    updateBody = async (val) => {
        await this.setState({
            body: val
        });
        this.update();
    };
    //debouncing here to update DB at a "5 seconds" delay after user stops typing
    update = debounce(() => {
        //TODO: Come back later here
        console.log('updating DB');
        this.props.docUpdate(this.state.id,
            {
                title: this.state.title,
                body: this.state.body
            });
    }, 5000);

    componentDidMount = () => {
        this.setState({
            body: this.props.selectedDoc.body,
            title: this.props.selectedDoc.title,
            id: this.props.selectedDoc.id
        });
    }

    componentDidUpdate = () => {
        if (this.props.selectedDoc.id !== this.state.id) {
            this.setState({
                body: this.props.selectedDoc.body,
                title: this.props.selectedDoc.title,
                id: this.props.selectedDoc.id
            });
        }
    }

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.editorContainer}>
                <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
                <input
                    className={classes.titleInput}
                    placeholder='Document Title...'
                    value={this.state.title ? this.state.title : ''}
                    onChange={(event) => this.updateTitle(event.target.value)}
                >
                </input>
                <ReactQuill
                    value={this.state.body}
                    onChange={this.updateBody}
                    modules={EditorComponent.modules}
                    formats={EditorComponent.formats}>
                </ReactQuill>
            </div>
        );
    }
}

//Editor configuration
EditorComponent.modules = {
    toolbar: [
        [{'header': '1'}, {'header': '2'}, {'font': []}],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'},
            {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}

EditorComponent.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

export default withStyles(styles)(EditorComponent);
