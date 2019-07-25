import React from 'react';
import './Comment.css'

export default function Comment({ user, comment, date }) {
  const dateTime = new Date(date)
  let commentStyle;
  if (user === 'Case Manager') {
    commentStyle = 'admin';
  } else {
    commentStyle= 'claimant'
  }
  console.log(commentStyle)
  return (
    <>
      <div className='comment-container-m'>
        <div className='date'>
          {dateTime.toUTCString()}
        </div>
        <div className='user'>
          {user}
        </div>
        <div className={commentStyle}>
          {comment}
        </div>
      </div>
    </>
  );
}