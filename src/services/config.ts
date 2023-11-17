import { AxiosRequestConfig } from 'axios';
import { Cookies } from 'react-cookie';

import { COOKIES } from '@/lib/helper';

const baseAppUrl = `https://dev.api.bytebreach.xyz/api/v1/`;

const setHeaders = (authToken?: string) => {
  const additionalHeaders: Record<string, string> = {};

  if (authToken) {
    additionalHeaders['Authorization'] = 'Bearer ' + authToken;
  }

  const cookie = new Cookies('csrftoken');

  console.log(cookie.getAll());

  // additionalHeaders['sessionid'] = cookie.get(COOKIES.token);

  console.log(COOKIES.csrfToken, cookie.get('csrftoken'));

  additionalHeaders['X-CSRFToken'] = cookie.get(COOKIES.browserCsrf) ?? 'test';

  // additionalHeaders.cookie = `sessionid=${cookie.get(
  //   COOKIES.token
  // )}; csrftoken=${cookie.get(COOKIES.csrfToken)}`;

  additionalHeaders['Content-Type'] = 'application/json';
  additionalHeaders['Accept'] = 'application/json';

  console.log({ additionalHeaders });

  return additionalHeaders;
};

export const postRequest = (
  url: string,
  data: any,
  authToken?: string
): AxiosRequestConfig => {
  const options: AxiosRequestConfig = {
    method: 'POST',
    baseURL: baseAppUrl,
    url: url,
  };

  if (data) {
    options.data = data;
  }

  options.withCredentials = true;

  options.headers = setHeaders(authToken);

  console.log({ options });

  return options;
};

export const getRequest = (
  url: string,
  apiKey?: string,
  secretKey?: string
): AxiosRequestConfig => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    baseURL: baseAppUrl,
    url: url,
  };

  options.headers = setHeaders();

  return options;
};

export const putRequest = (url: string, data: any): AxiosRequestConfig => {
  const options: AxiosRequestConfig = {
    method: 'PUT',
    baseURL: baseAppUrl,
    url: url,
  };

  if (data) {
    options.data = data;
  }

  options.headers = setHeaders();

  return options;
};

export const deleteRequest = (url: string, data: any) => {
  const options: AxiosRequestConfig = {
    method: 'DELETE',
    baseURL: baseAppUrl,
    url: url,
  };
  if (data) {
    options.data = data;
  }
  options.headers = setHeaders();
  return options;
};

export const patchRequest = (url: string, data: any) => {
  const options: AxiosRequestConfig = {
    method: 'PATCH',
    baseURL: baseAppUrl,
    url: url,
  };
  if (data) {
    options.data = data;
  }
  options.headers = setHeaders();
  return options;
};
