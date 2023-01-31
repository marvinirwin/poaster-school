import { useState, useContext } from 'react';
import {ErrorContext, useError} from './ErrorContext';
import * as url from "url";

const useFetchWithError = () => {
  const { addError } = useError();
  return async ({fetchParams, errorMessage}:{fetchParams:  Parameters<typeof fetch>, errorMessage: string | ( (e: Error) => string )}) => {
    try {
      const response = await fetch(...fetchParams);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    } catch (error: any) {
      addError({ message: typeof errorMessage === 'function' ? errorMessage(error) : errorMessage });
      throw error;
    }
  };
};

export default useFetchWithError;
