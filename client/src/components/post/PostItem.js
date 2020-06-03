import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import LikeUnlikePost from './LikeUnlikePost';
import Comment from './Comment';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post';

const PostItem = ({ post, auth, deletePost }) => {
  const { _id, text, name, avatar, user, likes, comments, date } = post;
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
          <LikeUnlikePost like={likes} id={_id} />
          <Comment comment={comments} id={_id} />
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
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { deletePost })(PostItem);
