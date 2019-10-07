import { remoteURL } from 'constants/environment';
import querystring from 'query-string';
import httpMethods from 'constants/httpMethods';
import {
  getJson,
  postJson,
} from './fetchUtils';
import { FetchError, ClientError, ServerError, ServerValidationError } from '../errors';

describe('Fetch Utils', () => {
  let jsonMock;
  let blobMock;

  beforeEach(() => {
    jsonMock = jest.fn(() => Promise.resolve(1));
    blobMock = jest.fn(() => Promise.resolve('file content'));

    window.fetch = jest.fn(() => Promise.resolve({
      json: jsonMock,
      blob: blobMock,
      headers: {
        get: () => {
        },
      },
    }));

    URL.createObjectURL = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getJson()', () => {
    it('should get JSON data', async () => {
      const result = await getJson('/api/test/');
      expect(result).toEqual(1);
      expect(window.fetch)
        .toBeCalledWith(`${remoteURL}/api/test/`, {
          headers: {},
          credentials: 'include',
          method: httpMethods.get,
        });
      expect(jsonMock).toBeCalled();
    });

    it('should get JSON data with queryString object', async () => {
      const testObj = { test_query: [1, 2, 3], a: 123 };
      const testStringify = querystring.stringify(testObj);
      const result = await getJson('/api/test', testObj);
      expect(result).toEqual(1);
      expect(window.fetch)
        .toBeCalledWith(`${remoteURL}/api/test?${testStringify}`, {
          headers: {},
          credentials: 'include',
          method: httpMethods.get,
        });
      expect(jsonMock).toBeCalled();
    });

    it('should throw a FetchError if fetch failed', async () => {
      window.fetch = jest.fn(() => Promise.reject(new Error('TST')));
      expect.assertions(1);

      try {
        await getJson('/api/test/');
      } catch (error) {
        expect(error).toBeInstanceOf(FetchError);
      }
    });

    it('should throw a FetchError if fetch failed', async () => {
      window.fetch = jest.fn(() => Promise.reject(new Error('TST')));
      expect.assertions(1);

      try {
        await getJson('/api/test/');
      } catch (error) {
        expect(error).toBeInstanceOf(FetchError);
      }
    });

    it('should throw a ServerError if response is not 200 or client error', async () => {
      const jsonFn = jest.fn(() => Promise.resolve({ message: 'Fail' }));
      window.fetch = jest.fn(() => Promise.resolve({
        status: 500,
        json: jsonFn,
      }));
      expect.assertions(1);

      try {
        await getJson('/api/test/');
      } catch (error) {
        expect(error).toBeInstanceOf(ServerError);
      }
    });

    it('should throw a ClientError if response is not 200 and error is in 4XX range', async () => {
      const jsonFn = jest.fn(() => Promise.resolve({ message: 'Fail' }));
      window.fetch = jest.fn(() => Promise.resolve({
        status: 403,
        json: jsonFn,
      }));
      expect.assertions(1);

      try {
        await getJson('/api/test/');
      } catch (error) {
        expect(error).toBeInstanceOf(ClientError);
      }
    });
  });

  describe('postJson()', () => {
    it('should post JSON data', async () => {
      const result = await postJson('/api/test/', { tst: 5 });
      expect(result).toEqual(1);
      expect(window.fetch).toBeCalledWith(`${remoteURL}/api/test/`, {
        method: httpMethods.post,
        body: '{"tst":5}',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      expect(jsonMock).toBeCalled();
    });

    it('should throw a FetchError if fetch failed', async () => {
      window.fetch = jest.fn(() => Promise.reject(new Error('TST')));
      expect.assertions(1);

      try {
        await postJson('/api/test/', { tst: 5 });
      } catch (error) {
        expect(error).toBeInstanceOf(FetchError);
      }
    });

    it('should throw a ServerError if response is not 201 and not 4XX range', async () => {
      const jsonFn = jest.fn(() => Promise.resolve({ message: 'Fail' }));
      window.fetch = jest.fn(() => Promise.resolve({
        status: 500,
        json: jsonFn,
      }));
      expect.assertions(1);

      try {
        await postJson('/api/test/', { tst: 5 });
      } catch (error) {
        expect(error).toBeInstanceOf(ServerError);
      }
    });

    it('should throw ServerValidationError if error result has details', async () => {
      const jsonFn = jest.fn(() => Promise.resolve({
        message: 'Fail',
        details: { location: '1' },
      }));
      window.fetch = jest.fn(() => Promise.resolve({
        status: 400,
        json: jsonFn,
      }));
      expect.assertions(1);

      try {
        await postJson('/api/test/');
      } catch (error) {
        expect(error).toBeInstanceOf(ServerValidationError);
      }
    });
  });
});
