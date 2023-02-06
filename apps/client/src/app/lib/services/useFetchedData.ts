import fetchWithError from "../fetchWithError";
import {useCallback, useEffect, useMemo, useState} from "react";
import useFetchWithError from "../fetchWithError";
import {apiUrl} from "../ApiUrl";
import {digitalassetlinks_v1} from "googleapis";
import {TopicFrame} from "../../components/SkillModal";

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
  subjectStatuses: Record<string, string>
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
  }, [url])
  return {
    result,
    isLoading,
    setResult
  };
}


export const useFetchWithBodyCallback = <T>(
  {
    url,
    loadingMessage,
    errorMessage,
    method
  }: {
    url: string,
    loadingMessage: string,
    errorMessage: string,
    method: "POST" | "PUT"
  }) => {
  const fetchWithError = useFetchWithError();
  const [isFetchInProgress, setIsFetchInProgress] = useState<boolean>(false);
  return {
    func: useCallback(async (body: any) => {
      setIsFetchInProgress(true);
      const result = await fetchWithError({
        fetchParams: [
          url,
          {
            body: JSON.stringify(body),
            method
          }
        ],
        loadingMessage,
        errorMessage
      });
      setIsFetchInProgress(false);
      return result.result;
    }, []),
    isFetchInProgress
  };
}
export const useUsers = () => useFetchedData<UserProfile[]>({
  url: apiUrl('user/list'),
  loadingMessage: 'Fetching user list',
  errorMessage: "Fetching user list failed.  Please refresh the page or contact us"
})

export const useUser = (userId: string) => {
  return useFetchedData<UserProfile>({
    url: useMemo(() => {
      return apiUrl(`user/${userId}`)
    }, [userId]),
    loadingMessage: 'Fetching user',
    errorMessage: `Fetching user userId: "${userId}" failed.  Please refresh the page or contact us`
  });
}
export type SubjectNode = {
  content: string,
  title: string,
  id: string,
  topicFrames: TopicFrame[]
}
export const useNodes = () => useFetchedData<SubjectNode[]>({
  url: apiUrl('node/list'),
  loadingMessage: 'Fetching node list',
  errorMessage: "Fetching node list failed.  Please refresh the page or contact us"
})

export const useLoggedInUser = () => useFetchedData<UserProfile>({
  url: apiUrl('user/profile'),
  loadingMessage: 'Fetching logged in user',
  errorMessage: "Fetching logged in user failed.  Are you logged in"
})
