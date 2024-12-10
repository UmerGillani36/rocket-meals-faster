import { CHANGE_THEME, SET_SERVER_INFO, SET_SORTING, SET_WARNING } from '@/redux/Types/types';

const initialState = {
  theme: 'dark',
  isWarning: false,
  sortBy: 'none',
  serverInfo: {},
};

const settingReducer = (state = initialState, actions: any) => {
  switch (actions.type) {
    case CHANGE_THEME: {
      return {
        ...state,
        theme: actions.payload,
      };
    }
    case SET_WARNING: {
      return {
        ...state,
        isWarning: actions.payload,
      };
    }
    case SET_SORTING: {
      return {
        ...state,
        sortBy: actions.payload,
      };
    }
    case SET_SERVER_INFO: {
      return {
        ...state,
        serverInfo: actions.payload,
      };
    }
    default:
      return state;
  }
};

export default settingReducer;
