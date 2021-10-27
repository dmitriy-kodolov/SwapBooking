import { restGet } from '../instances/main';

const getArchive = (userId, id) => restGet(`/api/archive/${userId}/${id}`);

export default getArchive;
