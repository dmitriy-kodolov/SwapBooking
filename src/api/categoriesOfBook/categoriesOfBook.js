import { restGet } from '../instances/main';

const getCategoriesOfBook = async () => {
  const response = await restGet('/categories');
  return response;
};
export default getCategoriesOfBook;
