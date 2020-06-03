import React from 'react';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/post';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';

const CommentItem = ({ postId, comment, auth, deleteComment }) => {
  const { date, _id, text, name, avatar, user } = comment;
  return (
    <>
      <div class='comments'>
        <div class='post bg-white p-1 my-1'>
          <div>
            <img class='round-img' src={avatar} alt='avatar' />
            <h4>{name}</h4>
          </div>
          <div>
            <p class='my-1'>{text}</p>
            <p class='post-date'>
              Posted on <Moment format='YYYY/MM/DD'>{moment.utc(date)}</Moment>{' '}
            </p>
          </div>
        </div>
        {auth.user._id === user && (
          <button
            type='button'
            class='btn btn-danger'
            onClick={(e) => deleteComment(postId, _id)}>
            <i class='fas fa-times'></i>
          </button>
        )}
      </div>
    </>
  );
};

CommentItem.propTypes = {
  authReducer: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
