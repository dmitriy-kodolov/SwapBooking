import { restGet } from '../instances/main';

const getArchive = (userId, id) => restGet(`/api/exchange/${userId}/${id}`);

export default getArchive;
