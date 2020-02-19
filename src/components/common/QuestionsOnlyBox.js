import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { 
    FormLabel, Radio, FormControl, FormControlLabel, RadioGroup 
} from '@material-ui/core';
import { postQuestion } from '../../store/actions/appActions';

const styles = theme => ({
    box: {
        margin: '10px 10px',
        padding: '15px 15px',
        backgroundColor: '#F6FAFD',
        borderRadius: '5px'
    }
})

class QuestionsOnlyBox extends Component {
    constructor(props){
        super(props);

        this.state = {
            animate: true,
            questionId: '',
            value: 0
        }
    }

    handleChange = (e) => {
        const newPost = {
            questionId: e.target.value
        };

        this.setState({
            value: Number(e.target.value)
        });

        this.props.postQuestion(newPost);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.box}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">All Profiling Questions</FormLabel>
                    <RadioGroup aria-label="question" name="question" value={this.state.value} onChange={this.handleChange}>
                        {this.props.question.data.map((question, index) => 
                            <FormControlLabel
                                key={index} 
                                value={question.id} 
                                control={<Radio />} 
                                label={question.question}
                            />
                        )} 
                    </RadioGroup>
                </FormControl>
                </div>
            </div>
        )
    }
}

QuestionsOnlyBox.propTypes = {
    postQuestion: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps, { postQuestion }
)(withStyles(styles)(QuestionsOnlyBox));
