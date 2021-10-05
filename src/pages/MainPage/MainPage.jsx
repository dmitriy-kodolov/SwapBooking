import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { getBooksAPi } from '../../api/books/books.api';

const initialPosts = [];

const MainPage = () => {
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    (async () => {
      try {
        const response = await getBooksAPi();

        setPosts(response.data);
      } catch (e) {
        alert('произошла ошибка при получении posts');
        setPosts(initialPosts);
      }
    })();
  }, []);

  return (
    <div>
      MainPage container
      {posts?.length > 0 && posts?.map((post) => (
        <Card key={post.id}>
          <CardContent>
            <Typography>
              {post?.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default MainPage;
