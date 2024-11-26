import { legacy_createStore as createStore } from 'redux';
import * as redux from 'redux';
import * as thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reducer} from '@/redux/reducer';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = (state: any, action: any) => reducer(state, action);
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = redux.applyMiddleware(promise, thunk.thunk, logger);

export const configureStore = createStore(
  persistedReducer,
  middleware,
);

export const persistor = persistStore(configureStore);