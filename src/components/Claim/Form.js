import React from 'react';
import './Form.css';
import { Button, Checkbox, FormControlLabel, FormGroup, OutlinedInput } from '@material-ui/core/';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from 'axios';
import { DropzoneArea } from 'material-ui-dropzone'

const questions = [
  'Are you or anyone else in physical danger? If so, please call 000 immediately',
  'What is the concern/incident that you wish to disclose? Please provide a full description of your concerns/incident and why you identify them as the type of disclosure that you have, above?',
  'When did this concern occur? Please provide exact dates/times, did it arise in work hours/after hours?', 
  'Where did the issue occur? Please be as specific as possible – was it on the organisation’s premises? If so, exactly where? Via email or social media? During/after work hours? At a social event?', 
  'Who was involved? What were the names and positions of those involved, if known?',
  'Who do you consider is responsible for the conduct you wish to report? What were the names and positions of those responsible, if known?',
  'Were there any witnesses? What were the names and positions of those involved, if known?',
  'How did this incident occur? Please explain the process/steps?',
  'Is there any physical documentation or evidence of the incident occurring? (What? Where?)',
  'Have you reported the incident/s internally, or through any other channels?',
  'Who would you normally report this incident to within the organisation?',
  'Have you raised this issue with someone in the organisation? If so, with whom have you raised the issue?',
  'Have you reported this to any external agencies or government departments? If so, which departments? What is the status of the complaint within the agency or department?',
  'Has this issue occurred before? (If so, with what frequency and during what period of time? Please provide as much detail as possible.',
  'Will follow-up action identify you as the person reporting the incident? If so, how might this arise?',
  'Is this incident contrary to your organisation’s policies or procedures? If so, which policies or procedures (eg Code of Conduct? Anti-Sexual Harassment Policy? Anti-Bullying Policy? Conflict of Interest Policy?)',
  'Has anyone been injured as a result of this or similar issues?',
] 

class Form extends React.Component {

  state = {
    pagination: {
      page: {
        currentPage: 0,
        maxPage: 10
      },
    },
    newClaim: {
      business_id: "",
      answers: {},
      categories: {}
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.sendAnswers();
  }

  sendAnswers = async () => {
    const response = await axios.post(process.env.REACT_APP_API_URL + "/claim/new", this.state.newClaim, { withCredentials: true });
    console.log(response.data);
  }

  handleBusinessID = (event) => {
    let newState = this.state;
    newState.newClaim[event.target.id] = event.target.value
    this.setState(newState)
  }

  handleChange = (event) => {
    if (event.target.type === "checkbox") {
      let newState = this.state;

      if (newState.newClaim.categories[event.target.id]) {
        newState.newClaim.categories[event.target.id] = event.target.checked;
      } else {
        newState.newClaim.categories[event.target.id] = !newState.newClaim.categories[event.target.id];
      }
      this.setState(newState);
    } else {
      let newState = this.state;
      newState.newClaim.answers[event.target.id] = event.target.value;
      this.setState(newState);
    }
  }

  handleCancel = () => {
    window.location.pathname = '/';
  }

  render = () => {
    return (
      <>
        <FormGroup className="form-container">
        <div className="claim-heading">Business ID</div>
          <div className="business-id-container">
          <FormControlLabel className='answer'
                control={<OutlinedInput id="business_id" 
                autoFocus={true} 
                fullWidth={true}
                onChange={this.handleBusinessID}
                placeholder='Please use the Business ID supplied by your company, or call our hotline for help.' />}
                labelPlacement='top'
                required={true}
              />
          </div>
          <div className="category-container">
            <div className="claim-heading">Categories</div>
            <p className="category-text">Please select any of the following cateogires that apply to your claim: </p>
            <div className="categories">
              <div className="category-column">
                <FormControlLabel
                  control={<Checkbox onChange={this.handleChange} id="misconduct" value="off" />}
                  label="Misconduct"
                />
                <FormControlLabel
                  control={<Checkbox onChange={this.handleChange} id="improper" value="off" />}
                  label="An improper state of affairs"
                />
                <FormControlLabel
                  control={<Checkbox onChange={this.handleChange} id="bullying" value="off" />}
                  label="Bullying"
                />
                <FormControlLabel
                  control={<Checkbox onChange={this.handleChange} id="discrimination" value="off" />}
                  label="Discrimination"
                />
              </div>
              <div className="category-column">
                <FormControlLabel
                  control={<Checkbox onChange={this.handleChange} id="harrasment" value="off" />}
                  label="Harrasment"
                />
                <FormControlLabel
                  control={<Checkbox onChange={this.handleChange} id="health" value="off" />}
                  label="Health/Safety/Environment issues"
                />
                <FormControlLabel
                  control={<Checkbox onChange={this.handleChange} id="influence" value="off" />}
                  label="Abuse of influence"
                />
                <FormControlLabel
                  control={<Checkbox onChange={this.handleChange} id="bribery" value="off" />}
                  label="Bribery"
                />
              </div>
              <div className="category-column">
                <FormControlLabel
                  control={<Checkbox onChange={this.handleChange} id="corruption" value="off" />}
                  label="Corruption"
                />
                <FormControlLabel
                  control={<Checkbox onChange={this.handleChange} id="fraud" value="off" />}
                  label="Fraud"
                />
                <FormControlLabel
                  control={<Checkbox onChange={this.handleChange} id="theft" value="off" />}
                  label="Theft"
                />
                <FormControlLabel
                  control={<Checkbox onChange={this.handleChange} id="other" value="off" />}
                  label="Other"
                />
              </div>
            </div>

          </div>
          <div className="questions-container">
            <div className="claim-heading">Questions</div>
            <div className='answer-container'>
              <p id="question_1" className='question'>
                Q1. {questions[0]}
                </p>
              <FormControlLabel className='answer'
                control={<TextareaAutosize onChange={this.handleChange} id='answer_1' className='answer' aria-label="Minimum height" rows={5} />}
                labelPlacement='top'
              />
            </div>
            <div className='answer-container'>
              <p id="question_2" className='question'>
                Q2. {questions[1]}
                </p>
              <FormControlLabel className='answer'
                control={<TextareaAutosize onChange={this.handleChange} id='answer_2' className='answer' aria-label="Minimum height" rows={5} />}
                labelPlacement='top'
              />
            </div>
            <div className='answer-container'>
              <p id="question_3" className='question'>
                Q3. {questions[2]}</p>
              <FormControlLabel className='answer'
                control={<TextareaAutosize onChange={this.handleChange} id='answer_3' className='answer' aria-label="Minimum height" rows={5} />}
                labelPlacement='top'
              />
            </div>
            <div className='answer-container'>
              <p id="question_4" className='question'>
                Q4. {questions[3]}</p>
              <FormControlLabel className='answer'
                control={<TextareaAutosize onChange={this.handleChange} id='answer_4' className='answer' aria-label="Minimum height" rows={5} />}
                labelPlacement='top'
              />
            </div>
            <div className='answer-container'>
              <p id="question_5" className='question'>
                Q5. {questions[4]}</p>
              <FormControlLabel className='answer'
                control={<TextareaAutosize onChange={this.handleChange} id='answer_5' className='answer' aria-label="Minimum height" rows={5} />}
                labelPlacement='top'
              />
            </div>
            <div className='answer-container'>
              <p id="question_6" className='question'>
                Q6. {questions[5]}</p>
              <FormControlLabel className='answer'
                control={<TextareaAutosize onChange={this.handleChange} id='answer_6' className='answer' aria-label="Minimum height" rows={5} />}
                labelPlacement='top'
              />
            </div>
            <div className='answer-container'>
              <p id="question_7" className='question'>
                Q7. {questions[6]}</p>
              <FormControlLabel className='answer'
                control={<TextareaAutosize onChange={this.handleChange} id='answer_7' className='answer' aria-label="Minimum height" rows={5} />}
                labelPlacement='top'
              />
            </div>

            <div className='answer-container'>
              <p id="question_8" className='question'>
                Q8. {questions[7]}</p>
              <FormControlLabel className='answer'
                control={<TextareaAutosize onChange={this.handleChange} id='answer_8' className='answer' aria-label="Minimum height" rows={5} />}
                labelPlacement='top'
              />
            </div>

            <div className='answer-container'>
              <p id="question_9" className='question'>
                Q9. {questions[8]}</p>
              <FormControlLabel className='answer'
                control={<TextareaAutosize onChange={this.handleChange} id='answer_9' className='answer' aria-label="Minimum height" rows={5} />}
                labelPlacement='top'
              />
            </div>

            <div className='answer-container'>
              <p id="question_10" className='question'>
                Q10. {questions[9]} </p>
              <FormControlLabel className='answer'
                control={<TextareaAutosize onChange={this.handleChange} id='answer_10' className='answer' aria-label="Minimum height" rows={5} />}
                labelPlacement='top'
              />
            </div>

            <div className='answer-container'>
              <p id="question_11" className='question'>
                Q11. {questions[10]}</p>
              <FormControlLabel className='answer'
                control={<TextareaAutosize onChange={this.handleChange} id='answer_11' className='answer' aria-label="Minimum height" rows={5} />}
                labelPlacement='top'
              />
            </div>

            <div className='answer-container'>
              <p id="question_12" className='question'>
                Q12. {questions[11]}</p>
              <FormControlLabel className='answer'
                control={<TextareaAutosize onChange={this.handleChange} id='answer_12' className='answer' aria-label="Minimum height" rows={5} />}
                labelPlacement='top'
              />
            </div>

            <div className='answer-container'>
              <p id="question_13" className='question'>
                Q13. {questions[12]}</p>
              <FormControlLabel className='answer'
                control={<TextareaAutosize onChange={this.handleChange} id='answer_13' className='answer' aria-label="Minimum height" rows={5} />}
                labelPlacement='top'
              />
            </div>

            <div className='answer-container'>
              <p id="question_14" className='question'>
                Q14. {questions[13]}</p>
              <FormControlLabel className='answer'
                control={<TextareaAutosize onChange={this.handleChange} id='answer_14' className='answer' aria-label="Minimum height" rows={5} />}
                labelPlacement='top'
              />
            </div>

            <div className='answer-container'>
              <p id="question_15" className='question'>
                Q15. {questions[14]}</p>
              <FormControlLabel className='answer'
                control={<TextareaAutosize onChange={this.handleChange} id='answer_15' className='answer' aria-label="Minimum height" rows={5} />}
                labelPlacement='top'
              />
            </div>

            <div className='answer-container'>
              <p id="question_16" className='question'>
                Q16. {questions[15]}</p>
              <FormControlLabel className='answer'
                control={<TextareaAutosize onChange={this.handleChange} id='answer_16' className='answer' aria-label="Minimum height" rows={5} />}
                labelPlacement='top'
              />
            </div>

            <div className='answer-container'>
              <p id="question_17" className='question'>
                Q17. {questions[16]}</p>
              <FormControlLabel className='answer'
                control={<TextareaAutosize onChange={this.handleChange} id='answer_17' className='answer' aria-label="Minimum height" rows={5} />}
                labelPlacement='top'
              />
            </div>
            <div className="claim-heading">Attachments</div>
            <div className="dropzone-container">
            <p id="dropzone-description" className='question'>
                Please attach any relevant documents below:</p>
            <DropzoneArea 
                showPreviews={true}
                showPreviewsInDropzone={false}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                dropzoneText={''}
                dropzoneClass={'dropzone-custom'}
                maxFileSize={25000000}
              />
            </div>
            <div className="button-row">
              <Button className="submit-btn" variant="contained" onClick={this.handleSubmit} color="primary">
                Submit
              </Button>
              <Button className="cancel-btn" variant="contained" onClick={this.handleCancel} color="secondary">
                Cancel
              </Button>
            </div>

          </div>

        </FormGroup>
      </>
    )
  }
}

export default Form;