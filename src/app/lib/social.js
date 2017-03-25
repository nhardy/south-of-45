import config from 'app/config';


// eslint-disable-next-line import/prefer-default-export
export function makeTitle(title) {
  return `${title} | ${config.siteName}`;
}
