import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './exampleCounterSlice.ts';
import { useGetListQuery } from '../../api/genericApi.ts';

const ExamplePostApi: React.FC = () => {
  // Redux counter state
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch<any>();

  // RTK Query hook to fetch posts

   const { data: posts , isLoading, error} = useGetListQuery({ resource: "posts" });

  return (
    <div style={{ padding: '2rem' }}>
      {/* Counter Section */}
      <h2>Counter: {count}</h2>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => dispatch(decrement())} style={{ marginRight: '0.5rem' }}>
          - Decrement
        </button>
        <button onClick={() => dispatch(increment())} style={{ marginRight: '0.5rem' }}>
          + Increment
        </button>
        <button onClick={() => dispatch(incrementByAmount(5))}>
          + Increment by 5
        </button>
      </div>

      {/* Posts Section */}
      <h2>Posts</h2>
      {isLoading && <p>Loading posts...</p>}
      {error && <p>Error loading posts</p>}
      <ul>
        {posts?.map((post) => (
          <li key={post.id} style={{ marginBottom: '1rem' }}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamplePostApi;
