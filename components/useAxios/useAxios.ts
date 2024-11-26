import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setAuthorizationToken } from '@/interceptor'; // Path to the axiosInstance file
// import { RootState } from '@/redux/store'; // Update this with the path to your Redux store types

const useAxiosAuthorization = () => {
  const token = useSelector((state: any) => state.authReducer.auth.access_token);

  useEffect(() => {
    setAuthorizationToken(token);
  }, [token]);
};

export default useAxiosAuthorization;
