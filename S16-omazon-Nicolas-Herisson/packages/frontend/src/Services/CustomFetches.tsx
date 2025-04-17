import { useState, useEffect } from 'react';
import { httpRequester } from './Requests';
import { useErrorsContext } from '@contexts/requestsAndServerError';
import { AxiosRequestConfig } from 'axios';

export function useFetch<T>(endpoint: string, trigger: string[]) {
  const { setIsLoading, setIsRequestError, setIsServerError } =
    useErrorsContext();
  const [data, setData] = useState<T>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setIsRequestError(false);
      setIsServerError(false);

      try {
        const { data } = await httpRequester.get<T>(endpoint);
        if (!data) {
          setIsRequestError(true);
        }
        setData(data);

        setIsRequestError(false);
        setIsServerError(false);
      } catch (error) {
        setIsServerError(true);
      }
      setIsLoading(false);
    }

    fetchData();
  }, trigger);

  return { data };
}

export function useFetchParams<T>(
  endpoint: string,
  trigger: string[],
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  parameters: any,
) {
  const { setIsLoading, setIsRequestError, setIsServerError } =
    useErrorsContext();
  const [data, setData] = useState<T>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setIsRequestError(false);
      setIsServerError(false);

      console.log('inn');
      try {
        const { data } = await httpRequester.get<T>(endpoint, {
          params: parameters,
        });

        if (!data) {
          setIsRequestError(true);
        }
        setData(data);

        setIsRequestError(false);
        setIsServerError(false);
      } catch (error) {
        setIsServerError(true);
      }
      setIsLoading(false);
    }

    fetchData();
  }, trigger);

  return { data };
}
