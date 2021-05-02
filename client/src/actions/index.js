import ACTION_TYPES from './types';

export const createHeroRequest = ({ hero }) => ({
  type: ACTION_TYPES.CREATE_HERO_REQUEST,
  payload: { hero },
});

export const createHeroSuccess = ({ hero }) => ({
  type: ACTION_TYPES.CREATE_HERO_SUCCESS,
  payload: { hero },
});

export const createHeroError = ({ error }) => ({
  type: ACTION_TYPES.CREATE_HERO_ERROR,
  payload: { error },
});

export const getHeroesRequest = ({ page, limit } = {}) => ({
  type: ACTION_TYPES.GET_HERO_REQUEST,
  payload: { page, limit },
});

export const getHeroesSuccess = ({ heroes } = {}) => ({
  type: ACTION_TYPES.GET_HERO_SUCCESS,
  payload: { heroes },
});

export const getHeroesError = ({ error }) => ({
  type: ACTION_TYPES.GET_HERO_ERROR,
  payload: { error },
});