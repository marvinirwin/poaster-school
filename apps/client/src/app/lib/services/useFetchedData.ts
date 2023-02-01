import fetchWithError from "../fetchWithError";
import {useEffect, useState} from "react";
import useFetchWithError from "../fetchWithError";
import {apiUrl} from "../ApiUrl";
import {digitalassetlinks_v1} from "googleapis";

export type UserProfile = {
  name?: string,
  gender?: string,
  location?: string,
  website?: string,
  picture?: string,
  isAdmin: boolean,
  isStudent: boolean,
  isTeacher: boolean,
  students: boolean,

  id: string;

  email: string;
}

export const useFetchedData = <T>(
  {
    url,
    loadingMessage,
    errorMessage,
  }: {
    url: string,
    loadingMessage: string,
    errorMessage: string,
  }) => {
  const fetchWithError = useFetchWithError();
  const [result, setResult] = useState<T | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await fetchWithError({
        fetchParams: [
          url,
        ],
        loadingMessage,
        errorMessage
      });
      setResult(result.result);
      setIsLoading(false);
    })()
  }, [])
  return {
    result,
    isLoading,
  };
}
export const useUsers = () => useFetchedData<UserProfile[]>({
  url: apiUrl('users'),
  loadingMessage: 'Fetching user list',
  errorMessage: "Fetching user list failed.  Please refresh the page or contact us"
})
