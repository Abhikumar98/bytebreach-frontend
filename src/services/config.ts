import { AxiosRequestConfig } from 'axios';
import { Cookies } from 'react-cookie';

import { COOKIES } from '@/lib/helper';

const baseAppUrl = `https://dev.api.bytebreach.xyz/api/v1/`;

const setHeaders = (authToken?: string) => {
  const additionalHeaders: Record<string, string> = {};

  const cookies = new Cookies();
  const authCookie = cookies.get('token');

  if (authToken) {
    additionalHeaders['Authorization'] = 'Bearer ' + authToken;
  }

  const cookie = new Cookies();

  additionalHeaders['sessionid'] = cookie.get(COOKIES.token);
  additionalHeaders['csrftoken'] = cookie.get(COOKIES.csrfToken);

  additionalHeaders['Content-Type'] = 'application/json';
  additionalHeaders['Accept'] = 'application/json';

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

  // options.withCredentials = true;

  options.headers = setHeaders(authToken);

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
