import React from 'react';
import './PostListItem.css';

const PostListItem = ({ post, onClick }) => {
  return (
    <div className="post-item" onClick={onClick}>
      <h3>{post.title}</h3>
      <p>{post.body.slice(0, 100)}...</p>
      <button>Просмотр</button>
    </div>
  );
};

export default PostListItem;