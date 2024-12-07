/* eslint-disable */
import { useDispatch } from 'react-redux';
import axios from '../Helper/axios.js';
import { loginReducer } from '../redux/authSlice.ts';

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    try {
      const response = await axios.get('/refresh');
      console.log('refresh');

      console.log(response.data);

      dispatch(loginReducer(response.data));

      return response.data.accesToken;
    } catch (error) {
      console.log(error);

      return null;
    }
  };

  return refresh;
};

export default useRefreshToken;
