import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import PostListItem from './PostListItem';
import axios from 'axios';

const PostsList = () => {
  const navigate = useNavigate();
  const PAGE_SIZE = 10;

  const fetchPosts = async ({ pageParam = 1 }) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${PAGE_SIZE}`
    );
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery('posts', fetchPosts, {
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return nextPage;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
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
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default PostsList;
