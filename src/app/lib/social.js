import config from 'app/config';


export function makeTitle(title) {
  return `${title} | ${config.siteName}`;
}

export function makeAbsoluteUrl(url) {
  return url.startsWith('data:') ? url : `${config.baseUrl}${url}`;
}
