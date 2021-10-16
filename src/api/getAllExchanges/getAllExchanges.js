import { restGet } from '../instances/main';

const getAllExchange = async (userId) => {
  const response = await restGet(`/api/wishes/all/${userId}`);
  return response;
};
export default getAllExchange;
