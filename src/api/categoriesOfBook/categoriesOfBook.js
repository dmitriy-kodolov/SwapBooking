import { restGet } from '../instances/main';

const getCategoriesOfBook = async () => {
  const response = await restGet('/albums?_limit=20');
  return response;
};
export default getCategoriesOfBook;
