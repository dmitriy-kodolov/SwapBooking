import { restGet } from '../instances/main';

const getCategoriesOfBook = async () => {
  const response = await restGet('/api/categories');
  return response;
};
export default getCategoriesOfBook;
