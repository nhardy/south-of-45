// @flow

import config from 'app/config';


export function makeTitle(title: string): string {
  return `${title} | ${config.siteName}`;
}

export function makeAbsoluteUrl(url: string): string {
  return url.startsWith('data:') ? url : `${config.baseUrl}${url}`;
}
