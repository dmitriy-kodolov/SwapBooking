// eslint-disable-next-line import/no-unresolved
import { restGet } from 'api/instances/main';

export const getBooksAPi = async () => {
  const response = await restGet('/posts');
  return response;
};

export const addPosts = async () => [];
