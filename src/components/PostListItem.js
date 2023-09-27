import React from 'react';

const PostListItem = ({ post, onClick }) => {
  return (
    <div onClick={onClick}>
      <h3>{post.title}</h3>
      <p>{post.body.slice(0, 100)}...</p>
      <button>Просмотр</button>
    </div>
  );
};

export default PostListItem;