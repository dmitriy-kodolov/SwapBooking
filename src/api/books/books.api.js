/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-unresolved
import { restGet } from 'api/instances/main';

export const getBooksAPi = async () => {
  const response = await restGet('/posts');
  return response;
};
