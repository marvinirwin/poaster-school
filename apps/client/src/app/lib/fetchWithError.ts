import {useState, useContext} from 'react';
import {ErrorContext, useError} from './ErrorContext';
import * as url from "url";

const useFetchWithError = () => {
  const {addError} = useError();
  return async (
    {
      fetchParams,
      errorMessage,
      loadingMessage
    }: {
      fetchParams: Parameters<typeof fetch>,
      errorMessage: string | ((e: Error) => string),
      loadingMessage: string
    }) => {
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
          errorMessage
      });
      throw error;
    }
  };
};

export default useFetchWithError;
