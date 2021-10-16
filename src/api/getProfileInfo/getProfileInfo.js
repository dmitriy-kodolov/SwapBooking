import { restGet } from '../instances/main';

const getProfileInfo = async (userId) => {
  const response = await restGet(`/api/profile/${userId}`);
  return response;
};
export default getProfileInfo;
