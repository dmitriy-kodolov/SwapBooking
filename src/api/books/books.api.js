// eslint-disable-next-line import/no-unresolved
import { restGet } from 'api/instances/main';

export const getBooksAPi = async () => {
  const response = await restGet('/posts');
  return response;
};

export const getBooksOffers = async (userID) => {
  const full = await restGet(`/api/offers/full/${userID}`);
  // const partial = await restGet(`/api/offers/partial/${userID}`);
  const another = await restGet(`/api/offers/other/${userID}`);
  return { full: full.data, partial: {}, another: another.data };
};

export const getActiveOffer = async ([userId, offerId]) => {
  const { data } = await restGet(`/api/exchange/${userId}/${offerId}`);
  return data;
};

export const getAllOffersId = async (userId) => {
  const { data } = await restGet(`/api/exchange/${userId}/all`);
  return data;
};

export const addPosts = async () => [];
