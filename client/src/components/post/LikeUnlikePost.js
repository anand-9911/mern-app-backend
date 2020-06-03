import React from 'react';
import PropTypes from 'prop-types';

const LikeUnlikePost = (props) => {
  return (
    <>
      <button type='button' class='btn btn-light'>
        <i class='fas fa-thumbs-up'></i>
        <span>4</span>
      </button>
      <button type='button' class='btn btn-light'>
        <i class='fas fa-thumbs-down'></i>
      </button>
    </>
  );
};

LikeUnlikePost.propTypes = {};

export default LikeUnlikePost;
