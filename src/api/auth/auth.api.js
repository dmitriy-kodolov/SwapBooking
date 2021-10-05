// eslint-disable-next-line import/no-unresolved
import { restPost } from 'api/instances/main';

export const loginApi = async () => {
  const response = await restPost('/posts');
  return response;
};

export const addPosts = async () => [];
