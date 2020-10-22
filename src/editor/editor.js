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

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.editorContainer}>
                <ReactQuill
                    value={this.state.text}
                    onChange={this.updateBody}>

                </ReactQuill>
            </div>
        );
    }
    updateBody= async (val)=> {
        await this.setState({text:val});
        this.update();
    };
    //debouncing here to update DB at a 5 s delay after user stops typing
    update = debounce(()=>{
        //TODO: Come back later here
        console.log('updating DB');
    },5000);
}

export default withStyles(styles)(EditorComponent);
