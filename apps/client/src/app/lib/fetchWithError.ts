import {useState, useContext, useCallback} from 'react';
import {ErrorContext, useError} from './ErrorContext';
import * as url from "url";
import {LoadingContext} from "./UseLoadingContext";

const useFetchWithError = () => {
  const {addError} = useError();
  const {addLoadingMessage} = useContext(LoadingContext);
  return useCallback(async (
    {
      fetchParams,
      errorMessage,
      loadingMessage
    }: {
      fetchParams: Parameters<typeof fetch>,
      errorMessage: string | ((e: Error) => string),
      loadingMessage: string
    }) => {
    const onLoadingFinished = addLoadingMessage(loadingMessage);
    try {
      if (fetchParams[1]) {
        if (!fetchParams[1].headers) {
          fetchParams[1].headers = {};
        }
        // @ts-ignore
        fetchParams[1].headers['Content-Type'] = "application/json"
      }

      const response = await fetch(...fetchParams);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    } catch (error: any) {
      addError({
        message: typeof errorMessage === 'function' ?
          errorMessage(error) :
          errorMessage,
        id: Math.random()
      });
      throw error;
    } finally {
      onLoadingFinished()
    }
  }, [addError, addLoadingMessage]);
};

export default useFetchWithError;
