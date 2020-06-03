import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getAllPosts } from '../../actions/post';
import AddPost from './AddPost';
import PostItem from './PostItem';

const PostComponent = ({ getAllPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <>
      <AddPost />
      {posts === null || loading ? (
        <Spinner />
      ) : (
        <>
          <div class='posts'>
            {posts && posts.map((post) => <PostItem post={post} />)}
          </div>
        </>
      )}
    </>
  );
};

PostComponent.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.postReducer,
});

export default connect(mapStateToProps, { getAllPosts })(PostComponent);
