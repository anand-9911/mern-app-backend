import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createPost } from '../../actions/post';
import { connect } from 'react-redux';

const AddPost = ({ createPost }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    createPost({ text });
    setText('');
  };

  return (
    <>
      <h1 class='large text-primary'>Posts</h1>
      <p class='lead'>
        <i class='fas fa-user'></i> Welcome to the community!
      </p>

      <div class='post-form'>
        <div class='bg-primary p'>
          <h3>Say Something...</h3>
        </div>
        <form class='form my-1' onSubmit={(e) => onSubmit(e)}>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a post'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required></textarea>
          <input type='submit' class='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    </>
  );
};

AddPost.propTypes = {
  createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost })(AddPost);
