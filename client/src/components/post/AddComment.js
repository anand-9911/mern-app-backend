import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../actions/post';
import PropTypes from 'prop-types';

const AddComment = ({ id, createComment }) => {
  const [text, setText] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    createComment(id, { text });
    setText('');
  };
  return (
    <>
      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Leave A Comment</h3>
        </div>
        <form className='form my-1' onSubmit={(e) => onSubmit(e)}>
          <textarea
            name='text'
            cols='30'
            rows='5'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Comment on this post'
            required></textarea>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    </>
  );
};

AddComment.propTypes = {
  createComment: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default connect(null, { createComment })(AddComment);
