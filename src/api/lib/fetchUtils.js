import * as R from 'ramda';
import querystring from 'query-string';
import { remoteURL } from 'constants/environment';
import { OK, CREATED } from 'constants/httpCodes';
import httpMethods from 'constants/httpMethods';
import { FetchError, ClientError, ServerError, ServerValidationError } from '../errors';

const jsonFetch = async (url, method, dataOrQuery) => {
  let result;
  let response;
  const headers = {};

  if (method !== httpMethods.get) {
    headers.Accept = 'application/json, text/plain, */*';
    headers['Content-Type'] = 'application/json';
  }

  try {
    if (method === httpMethods.get) {
      if (!R.isEmpty(dataOrQuery)) {
        response =
          await fetch(`${remoteURL}${url}?${querystring.stringify(dataOrQuery)}`, {
            headers,
            credentials: 'include',
            method,
          });
      } else {
        response = await fetch(`${remoteURL}${url}`, {
          headers,
          credentials: 'include',
          method,
        });
      }
    } else {
      response = await fetch(`${remoteURL}${url}`, {
        headers,
        credentials: 'include',
        method,
        body: JSON.stringify(dataOrQuery),
      });
    }
    result = await response.json();
  } catch (e) {
    throw new FetchError(e.message);
  }

  // Server returned 400 or similar
  if ((response.status !== CREATED && response.status !== OK) && result.message) {
    if (result.details) {
      throw new ServerValidationError(result.message, response.status, { fields: result.details });
    }

    if (response.status >= 400 && response.status < 500) {
      throw new ClientError(result.message, response.status);
    }

    throw new ServerError(result.message);
  }

  return result;
};

export const getJson = R.curry(async (url, query = {}) =>
  jsonFetch(url, httpMethods.get, query));

export const postJson = R.curry(async (url, data = {}) =>
  jsonFetch(url, httpMethods.post, data));
