// eslint-disable-next-line import/no-unresolved
import { restGet, restPost } from 'api/instances/main';

export const getBooksAPi = async () => {
  const response = await restGet('/posts');
  return response;
};

export const exchangeConfirm = async (firstId, secondId) => {
  const response = await restPost('/api/offer/confirm', {
    OfferID1: firstId,
    OfferID2: secondId,
  });
  return response;
};

export const getBooksOffers = async (userID) => {
  let full = {};
  let partial = {};
  let another = {};
  try {
    full = await restGet(`/api/offers/full/${userID}`);
  } catch (err) {
    full.data = null;
  }

  try {
    partial = await restGet(`/api/offers/partial/${userID}`);
  } catch (err) {
    partial.data = null;
  }
  try {
    another = await restGet(`/api/offers/other/${userID}`);
  } catch (err) {
    another.data = null;
  }
  return { full: full.data, partial: partial.data, another: another.data };
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
