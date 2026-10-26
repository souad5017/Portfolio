import { initials } from './format.js';

export const getIdentity = ({ firstName = '', lastName = '' }) => {
  const name = `${firstName} ${lastName}`.trim();
  return { name, initials: initials(name) };
};