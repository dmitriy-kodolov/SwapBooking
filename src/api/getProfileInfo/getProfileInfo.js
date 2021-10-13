import { useSelector } from 'react-redux';
import { restGet } from '../instances/main';
// здесь надо уточнять как сделает миша
const userId = useSelector((state) => state.user.userId);
const getProfileInfo = async () => {
  const response = await restGet(`/profile/${userId}`);
  return response;
};
export default getProfileInfo;
