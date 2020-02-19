import React, {useState, useRef, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm, Controller } from "react-hook-form";
import { InputLabel, MenuItem, FormControl, Grow, FormHelperText, Select, Grid, OutlinedInput, Typography, Button, Paper, FormControlLabel, RadioGroup, FormLabel, Radio } from '@material-ui/core';

import { postNewQuestion, getLastQuestionGroupId, postQuestionWithTagId } from '../../store/actions/appActions';
import Loader from './Loading';

const useStyles = makeStyles(theme => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title: {
    textAlign: 'center',
    fontSize: '17px'
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    border: '1px solid #ccc'
  },
  questionTypeBox: {
    border: '1px solid #ccc',
    padding: theme.spacing(2)
  },
  btnColor: {
    backgroundColor: '#F8991D',
    color: '#fff'
  },
  errors: {
    color: 'red'
  }
}));

const defaultValues = {
  question: "",
  control_id: "",
  answerA: "",
  answerB: "",
  answerC: "",
  answerD: "",
  answerE: "",
};

function QuestionForm(props) {
  const classes = useStyles();
 
  const [count, setCount] = useState(0);
  const [checked ] = useState(true);
  const [labelWidth, setLabelWidth] = useState(0);

  const inputLabel = useRef(null);

  const {results, loading} = props.questionGroupId;

  const { register, handleSubmit, errors, control, reset } = useForm({defaultValues});

  const onSubmit = data => {
    let answer = [];
    if(data.answerA !== ''){
      answer.push(data.answerA)
    }

    if(data.answerB !== ''){
      answer.push(data.answerB)
    }

    if(typeof data.answerC !== 'undefined'){
      answer.push(data.answerC)
    }

    if(typeof data.answerD !== 'undefined'){
      answer.push(data.answerD)
    }

    if(typeof data.answerE !== 'undefined'){
      answer.push(data.answerE)
    }

    const newQuestion = {
      group_name : data.group_name,
      status: 1,
      question : data.question,
      control_id: data.control_id,
      type_id: 1,
      question_status: 0,
      answer: answer
    }

    props.postNewQuestion(newQuestion);

    reset({ defaultValues })

  };


  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  useEffect(() => {
    props.getLastQuestionGroupId();
  }, [props.toggleDisable, props.questionWithTag, props.questions])

  
  const handleAdd = () => {
    setCount(count + 1)
  }

  const handleRemove = () => {
    setCount(count - 1);
  }

  return (
    <Paper className={classes.paper} elevation={0}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Typography className={classes.title} variant="overline" display="block" gutterBottom>
          Add New Question
        </Typography>
        <Grid container spacing={3}>
          {(results === null || loading) ? 
            <div className={classes.loader}>
               <Loader />
            </div>  
          : (results.data === undefined || results.data.length === 0) ?
         
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <InputLabel htmlFor="question-group">Tag</InputLabel>
                <OutlinedInput
                  id="question-group"
                  name="group_name"
                  error={errors.group_name && true}
                  defaultValue=""
                  inputRef={register({ required: true})}
                  labelWidth={27}
                />
                {errors.group_name && <FormHelperText className={classes.errors}>*This field is required</FormHelperText>}
              </FormControl>
            </Grid>
          : 
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <InputLabel htmlFor="question-group">Tag</InputLabel>
                <OutlinedInput
                  id="question-group"
                  name="group_name"
                  defaultValue={results.data[0].set_name}
                  inputRef={register({ required: true})}
                  disabled
                  labelWidth={27}
                />
              </FormControl>
            </Grid>
          }
          
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <InputLabel htmlFor="question">Question </InputLabel>
              <OutlinedInput
                id="question"
                name="question"
                error={errors.question && true}
                inputRef={register({ required: true})}
                labelWidth={70}
              />
                {errors.question && <FormHelperText className={classes.errors}>*This field is required</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <FormControl fullWidth variant="outlined">
                <InputLabel ref={inputLabel} id="form-control">
                  Form Control Options
                </InputLabel>
                <Controller
                as={
                <Select
                  labelId="form-control"
                  id="control_id"
                  error={errors.control_id && true}
                  labelWidth={labelWidth}
                >
                  <MenuItem defaultValue="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="1">Input Field</MenuItem>
                  <MenuItem value="2">Text Field</MenuItem>
                  <MenuItem value="3">Radio Button</MenuItem>
                  <MenuItem value="4">Checkbox</MenuItem>
                  <MenuItem value="5">Dropdown Menu</MenuItem>
                </Select>
                }
                rules={{ required: true }}
                control={control}
                name="control_id"
              />
                  {errors.control_id && <FormHelperText className={classes.errors}>*This field is required</FormHelperText>}
              </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <InputLabel htmlFor="response-1">Response 1 </InputLabel>
                <OutlinedInput
                  id="response-1"
                  name="answerA"
                  error={errors.answerA && true}
                  inputRef={register({ required: true})}
                  labelWidth={84}
                />
                  {errors.answerA && <FormHelperText className={classes.errors}>*This field is required</FormHelperText>}
              </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
                <InputLabel htmlFor="response-2">Response 2 </InputLabel>
                <OutlinedInput
                  id="response-2"
                  name="answerB"
                  error={errors.answerB && true}
                  inputRef={register({ required: true})}
                  labelWidth={84}
                />
                 {errors.answerB && <FormHelperText className={classes.errors}>*This field is required</FormHelperText>}
            </FormControl>
          </Grid>
          {(count > 0) &&
          <Grow in={checked} {...(checked ? { timeout: 1000 } : {})} >
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                  <InputLabel htmlFor="response-3">Response 3 </InputLabel>
                  <OutlinedInput
                    id="response-3"
                    name="answerC"
                    inputRef={register({ required: false})}
                    labelWidth={84}
                  />
              </FormControl>
            </Grid>
          </Grow>
          }
          {(count > 1) &&
          <Grow in={checked} {...(checked ? { timeout: 1000 } : {})} >
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                  <InputLabel htmlFor="response-4">Response 4 </InputLabel>
                  <OutlinedInput
                    id="response-3"
                    name="answerD"
                    inputRef={register({ required: false})}
                    labelWidth={84}
                  />
              </FormControl>
            </Grid>
          </Grow>
          }
          {(count > 2) &&
          <Grow in={checked} {...(checked ? { timeout: 1000 } : {})} >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                  <InputLabel htmlFor="response-5">Response 5 </InputLabel>
                  <OutlinedInput
                    id="response-3"
                    name="answerE"
                    inputRef={register({ required: false})}
                    labelWidth={84}
                  />
              </FormControl>
            </Grid>
          </Grow>
          }
          <Grow in={checked} {...(checked ? { timeout: 1000 } : {})} >
            <Grid item xs={12} sm={12} md={12} lg={12}>
                {(count !== 3) && 
                  <Button variant="contained" color="primary" size="small" onClick={handleAdd}>
                    Add Field
                  </Button>
                }{' '}
                {(count > 0) && 
                  <Button className={classes.btnColor} variant="contained" size="small" onClick={handleRemove}>
                    Remove Field
                  </Button>
                }
            </Grid>
          </Grow>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Paper className={classes.questionTypeBox} elevation={0} >
              <FormControl component="fieldset">
                <FormLabel component="legend">Choose Question Type</FormLabel>
                  <RadioGroup aria-label="position" name="position" value="1" row>
                    <FormControlLabel
                      value="1"
                      control={<Radio color="primary" />}
                      label="Profiling"
                      labelPlacement="end"
                    />
                  <FormControlLabel
                    value=""
                    disabled
                    control={<Radio color="primary" />}
                    label="Questionnaire"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>
          <Grid  item xs={12} sm={12} md={12} lg={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Submit
            </Button> 
          </Grid> 
        </Grid>   
      </form>
    </Paper>
  )
}

QuestionForm.propTypes = {
  postNewQuestion: PropTypes.func.isRequired,
  getLastQuestionGroupId: PropTypes.func.isRequired,
  postQuestionWithTagId: PropTypes.func.isRequired,
  questionGroupId: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  questionGroupId: state.questionGroupId,
  questionWithTag: state.questionWithTag,  
  toggleDisable: state.toggleDisable,
  questions: state.questions
})

export default connect(
  mapStateToProps, 
  { postQuestionWithTagId, postNewQuestion, getLastQuestionGroupId }
  )(QuestionForm);