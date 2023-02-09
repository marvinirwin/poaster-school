import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export const useUrlState = <T>(key: string, defaultValue: T): [T, (value: T) => void] => {
  const navigate = useNavigate();
  const {pathname, search} = useLocation();
  const [value, setValue] = useState<T>(() => {
    const urlValue = new URLSearchParams(window.location.search).get(key);
    return urlValue !== null ? JSON.parse(urlValue) : defaultValue;
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, JSON.stringify(value));
    navigate({
      pathname,
      search: searchParams.toString()
    })
  }, [key, value]);

  return [value, setValue];
};
