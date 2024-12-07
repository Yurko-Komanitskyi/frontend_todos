/* eslint-disable */
import useAxiosPrivate from './useAxiosPrivate.js';
import { logout } from '../Helper/requests.js';
import { logoutReducer } from '../redux/authSlice.ts';
import { useAppDispatch } from './useAppDispatch.ts';

const useLogout = () => {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const logoutHook = async () => {
    dispatch(logoutReducer());

    try {
      const response = await logout(axiosPrivate);
    } catch (err) {
      console.error(err);
    }
  };

  return logoutHook;
};

export default useLogout;
