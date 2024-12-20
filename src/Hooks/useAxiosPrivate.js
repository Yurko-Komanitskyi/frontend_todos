/* eslint-disable */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { axiosPrivate } from '../Helper/axios.js';
import useRefreshToken from './useRefreshToken.js';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const auth = useSelector(state => state.auth.auth);
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async config => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.accesToken}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
