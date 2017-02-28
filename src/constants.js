/* global __DEV__ */

export const DEVELOPMENT = __DEV__ || process.env.NODE_ENV !== 'production';

export const Cache = {
  KEY: 'AUDORA_STATE',
};
