import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import PostListItem from './PostListItem';
import axios from 'axios';

const PAGE_SIZE = 10;

const fetchPosts = async (key, page = 1) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PAGE_SIZE}`
  );
  return response.data;
};

const PostsList = () => {
  const navigate = useNavigate(); 

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery('posts', fetchPosts, {
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length + 1;
      return nextPage <= allPages.length ? nextPage : false;
    },
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`); // Используйте navigate для перехода
  };

  return (
    <div>
      {data.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.map((post) => (
            <PostListItem
              key={post.id}
              post={post}
              onClick={() => handlePostClick(post.id)}
            />
          ))}
        </React.Fragment>
      ))}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Загрузка...' : 'Загрузить еще'}
        </button>
      )}
    </div>
  );
};

export default PostsList;