import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';

import { connect } from 'react-redux';
import { deletePost, removeLike, addLike } from '../../actions/post';

const PostItem = ({ post, auth, deletePost, addLike, removeLike }) => {
  const { _id, text, name, avatar, user, likes, date, comments } = post;
  return (
    <>
      <div class='post bg-white p-1 my-1'>
        <div>
          <Link to='/main-profile'>
            <img class='round-img' src={avatar} alt='avatar' />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p class='my-1'>{text}</p>
          <p class='post-date'>
            Posted on <Moment format='YYYY/MM/DD'>{moment.utc(date)}</Moment>{' '}
          </p>
          <button
            type='button'
            class='btn btn-light'
            onClick={(e) => addLike(_id)}>
            <i class='fas fa-thumbs-up'></i>{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            type='button'
            class='btn btn-light'
            onClick={(e) => removeLike(_id)}>
            <i class='fas fa-thumbs-down'></i>
          </button>
          <Link
            to={{
              pathname: '/discussion',
              state: { id: _id, postFromLink: post },
            }}
            class='btn btn-primary'>
            Discussion{' '}
            <span class='comment-count'>
              {comments.length > 0 ? (
                <span>{comments.length}</span>
              ) : (
                <span>0</span>
              )}
            </span>
          </Link>
          {auth.user._id === user && (
            <button
              type='button'
              class='btn btn-danger'
              onClick={(e) => deletePost(_id)}>
              <i class='fas fa-times'></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
