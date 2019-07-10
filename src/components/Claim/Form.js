import React from 'react';
import './Form.css';
// import { Link } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, FormControl, FormGroup, InputLabel, Input, FormHelperText } from '@material-ui/core/';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from 'axios';

class Form extends React.Component {

  state = {
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state)
    this.sendAnswers()
  }

  sendAnswers = async () => {
    const response = await axios.post(process.env.REACT_APP_API_URL, this.state);
    console.log(response.data);
  }

  handleChange = (event) => {
    this.setState( { [event.target.id]: event.target.value } )
  }

  render = () => {
    return (
      <>
        <FormGroup>
        <div className="test">
     
          <FormControlLabel
            control={<Checkbox value="checkedA" />}
            label="Misconduct"
          />
          <FormControlLabel
            control={<Checkbox value="checkedA" />}
            label="An improper state of affairs"
          />
          <FormControlLabel
            control={<Checkbox value="checkedA" />}
            label="Bullying"
          />
          <FormControlLabel
            control={<Checkbox value="checkedA" />}
            label="Discrimination"
          />
          </div>
          <div className="test">
          <FormControlLabel
            control={<Checkbox value="checkedA" />}
            label="Harrasment"
          />
          <FormControlLabel
            control={<Checkbox value="checkedA" />}
            label="Health/Safety/Environment issues"
          />
          <FormControlLabel
            control={<Checkbox value="checkedA" />}
            label="Abuse of influence"
          />
          <FormControlLabel
            control={<Checkbox value="checkedA" />}
            label="Bribery"
          />
          </div>
          <div className="test">
          <FormControlLabel
            control={<Checkbox value="checkedA" />}
            label="Corruption"
          />
          <FormControlLabel
            control={<Checkbox value="checkedA" />}
            label="Fraud"
          />
          <FormControlLabel
            control={<Checkbox value="checkedA" />}
            label="Theft"
          />
          <FormControlLabel
            control={<Checkbox value="checkedA" />}
            label="Other"
          />
          </div>
          <div className='answer-container'>
            <p className='question'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab itaque eligendi suscipit quidem nobis doloribus accusantium harum adipisci aliquid. Dolorum quisquam debitis sunt dignissimos, numquam eveniet deserunt nihil eligendi aliquid.</p>
            <FormControlLabel className='answer'
              control={<TextareaAutosize onChange={this.handleChange} id='answer1' className='answer' aria-label="Minimum height" rows={10} placeholder="Minimum 3 rows" />}
              label="Answer"
              labelPlacement='top'
              // style={{textAlign: 'start'}}
            />
          </div>
          
          <Button variant="contained" onClick={this.handleSubmit} color="primary">
            Submit
          </Button>
        </FormGroup>
      </>
    )
  }
}

export default Form;