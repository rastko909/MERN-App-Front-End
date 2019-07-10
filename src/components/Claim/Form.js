import React from 'react';
import './Form.css';
// import { Link } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core/';
import axios from 'axios';

class Form extends React.Component {

  state = {
    complete: false,
    authorized: false,
    businessID: null
  }

  handleClick = (event) => {
    event.preventDefault();
    console.log('gtest')
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
          <Button variant="contained" onClick={this.handleClick} color="primary">
            Submit
          </Button>
        </FormGroup>
      </>
    )
  }
}

export default Form;