import qs from 'qs';

export const paramsSerialize = <T>(url: string, params?: T): string => {
  return `${url}?${qs.stringify(params, { arrayFormat: 'comma', encode: false })}`;
};
