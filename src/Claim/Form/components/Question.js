import React from 'react';
import { FormControlLabel } from '@material-ui/core/';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


export default function Question(props) {
  return (
    <div className='answer-container'>
      <div id={'question_' + props.index} className='question'>
        <div className='question-mark'>Q{props.index}</div>
        <div className="question-text">{props.question}</div>
      </div>
      <FormControlLabel className='answer'
        control={<TextareaAutosize
        onBlur={props.handleChange}
        id={'answer_' + props.index}
        className='answer'
        aria-label="Minimum height"
        rows={5} />}
        labelPlacement='top'
      />
    </div>
  )
}