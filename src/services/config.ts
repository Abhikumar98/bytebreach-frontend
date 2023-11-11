import { AxiosRequestConfig } from 'axios';
import { Cookies } from 'react-cookie';

const baseAppUrl = process.env.NEXT_PUBLIC_ENVIRONMENT;

console.log({ baseAppUrl });

const setHeaders = (authToken?: string) => {
  const additionalHeaders: Record<string, string> = {};

  const cookies = new Cookies();
  const authCookie = cookies.get('token');

  if (authToken) {
    additionalHeaders['Authorization'] = 'Bearer ' + authToken;
  }

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
