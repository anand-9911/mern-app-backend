import React from 'react';
import PropTypes from 'prop-types';

const ProfileLinks = (props) => {
  return (
    <>
      <div class='icons my-1'>
        <a href='#' target='_blank' rel='noopener noreferrer'>
          <i class='fas fa-globe fa-2x'></i>
        </a>
        <a href='#' target='_blank' rel='noopener noreferrer'>
          <i class='fab fa-twitter fa-2x'></i>
        </a>
        <a href='#' target='_blank' rel='noopener noreferrer'>
          <i class='fab fa-facebook fa-2x'></i>
        </a>
        <a href='#' target='_blank' rel='noopener noreferrer'>
          <i class='fab fa-linkedin fa-2x'></i>
        </a>
        <a href='#' target='_blank' rel='noopener noreferrer'>
          <i class='fab fa-youtube fa-2x'></i>
        </a>
        <a href='#' target='_blank' rel='noopener noreferrer'>
          <i class='fab fa-instagram fa-2x'></i>
        </a>
      </div>
    </>
  );
};

ProfileLinks.propTypes = {};

export default ProfileLinks;
