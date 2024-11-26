import React, { useEffect } from 'react'
import { Redirect } from 'expo-router';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ServerAPI } from '@/redux/actions/Auth/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, persistor } from '@/redux/store';
import { ON_LOGIN, ON_LOGOUT } from '@/redux/Types/types';


const index = () => {
  const dispatch = useDispatch();
  const { user, auth } = useSelector((state: any) => state.authReducer);

  console.log('User: ', auth);

  const createStorage = async () => {
    ServerAPI.createAuthentificationStorage(async () => {
      const storedData = await AsyncStorage.getItem('auth_data');
      return storedData ? JSON.parse(storedData) : null;
    }, async (value) => {
      if (value) {
        await AsyncStorage.setItem('auth_data', JSON.stringify(value));
        dispatch({ type: ON_LOGIN, payload: value });
      } else {
        await AsyncStorage.removeItem('auth_data');
      }
    });
  };


  useEffect(() => {
    createStorage();
  }, [auth]);

  if (user?.loggedIn) {
    return <Redirect href='/(app)' />;
  } else {
    return <Redirect href='/(auth)/login' />;
  }
}

export default index;
