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
  const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const fetchResponse = await fetchWithError({
        fetchParams: [
          url,
        ],
        loadingMessage,
        errorMessage
      });
      setResult(fetchResponse.result);
      setIsLoading(false);
    })()
  }, [url])
  return {
    result,
    isLoading,
    setResult,
  };
}


export const useFetchWithBodyCallback = <T>(
  {
    url,
    loadingMessage,
    errorMessage,
    method,
    deps
  }: {
    url: string,
    loadingMessage: string,
    errorMessage: string,
    method: "POST" | "PUT",
    deps?: any[]
  }) => {
  const fetchWithError = useFetchWithError();
  const [isFetchInProgress, setIsFetchInProgress] = useState<boolean>(false);
  return {
    func: useCallback(async ({body, url: newUrl}: { body: any, url?: string }): Promise<T> => {
      setIsFetchInProgress(true);
      const result = await fetchWithError({
        fetchParams: [
          newUrl || url,
          {
            body: JSON.stringify(body),
            method,
            headers: {
              'Content-Type': "application/json"
            }
          }
        ],
        loadingMessage,
        errorMessage
      });
      setIsFetchInProgress(false);
      return result.result;
    }, [deps]),
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
