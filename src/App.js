import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostsList from './components/PostList';
import PostDetail from './components/PostDetail';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<PostsList />} />  
          <Route path="/post/:postId" element={<PostDetail />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;