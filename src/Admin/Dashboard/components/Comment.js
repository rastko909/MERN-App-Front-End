import React from 'react';
import './Comment.css'

export default function Comment({ from, comment, date }) {
  const dateTime = new Date(date)
  return (
    <>
      <div className='comment-container-m'>
        <div className='date'>
          {dateTime.toUTCString()}
        </div>
        <div className='user'>
          {from}
        </div>
        <div className='comment'>
          {comment}
        </div>
      </div>
    </>
  );
}