import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';

import 'react-quill/dist/quill.snow.css';

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
    toolbar: {
        container:[
        [{'header': [1, 2, 3, 4, 5, 6]}, {'font': []}],
        [{size: []}],[{'color':
                ['#000000', '#e60000', '#ff9900', '#ffff00',
                    '#008a00', '#0066cc', '#9933ff', '#ffffff',
                    '#facccc', '#ffebcc', '#ffffcc', '#cce8cc',
                    '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666',
                    '#ffc266', '#ffff66', '#66b966', '#66a3e0',
                    '#c285ff', '#888888', '#a10000', '#b26b00',
                    '#b2b200', '#006100', '#0047b2', '#6b24b2',
                    '#444444', '#5c0000', '#663d00', '#666600',
                    '#003700', '#002966', '#3d1466', 'custom-color']}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'},
            {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ],
        handlers: {
            'color': function (value) {
                if (value === 'custom-color') value = window.prompt('Enter Hex Color Code');
                this.quill.format('color', value);
            }
        }
},
    clipboard: {
        matchVisual: false,
    }
}

EditorComponent.formats = [
    'header', 'font', 'size', 'color',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'emoji',
]

export default withStyles(styles)(EditorComponent);
