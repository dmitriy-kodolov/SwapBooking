// import { useSelector } from 'react-redux';
import { restGet } from '../instances/main';
// здесь надо уточнять как сделает миша
// const userId = useSelector((state) => state.user.userId);
const userId = 1;
const getCategoriesOfBook = async () => {
  const response = await restGet(`/wishes/all/${userId}`);
  return response;
};
export default getCategoriesOfBook;
