/* eslint-disable quote-props */
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;
const getHeader = (headers = null) => {
  const defaultHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json;charset=UTF-8',
  };

  return headers ? { ...defaultHeaders, ...headers } : defaultHeaders;
};

const axiosConfig = {
  baseURL,
  timeout: 3000,
};

const instance = axios.create(axiosConfig);

export const restGet = (url, config) => instance.get(
  url,
  {
    ...config,
    headers: { ...getHeader() },
  },
);

export const restPost = (url, data, config) => instance.post(url, data, {
  ...config,
  headers: {
    ...getHeader(config && config.headers),
  },
});

export const restPatch = (url, data, config) => instance.patch(url, data, {
  ...config,
  headers: {
    ...getHeader(config && config.headers),

  },
});

export const restDelete = (url, config) => instance.delete(
  url,
  {
    ...config,
    headers: {
      ...getHeader(config && config.headers),
    },
  },
);

export default instance;
