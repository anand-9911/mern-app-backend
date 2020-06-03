import React from 'react';
import PropTypes from 'prop-types';

const Comment = (props) => {
  return (
    <>
      <a href='post.html' class='btn btn-primary'>
        Discussion <span class='comment-count'>2</span>
      </a>
    </>
  );
};

Comment.propTypes = {};

export default Comment;
