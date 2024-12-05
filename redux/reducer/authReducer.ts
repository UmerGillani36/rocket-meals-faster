import {ON_LOGIN, ON_LOGOUT, UPDATE_LOGIN, UPDATE_MANAGEMENT, UPDATE_PROFILE} from '@/redux/Types/types';

const initialState = {
  user: {},
  profile: {},
  loggedIn: false,
  isManagement: false,
};

const authReducer = (state = initialState, actions: any) => {
  switch (actions.type) {
    case ON_LOGIN: {
      return {
        ...state,
        user:  actions.payload,
        loggedIn: true,
      };
    }
    case UPDATE_LOGIN: {
      return {
        ...state,
        user:  actions.payload,
        loggedIn: true,
      };
    }
    case UPDATE_MANAGEMENT: {
      return {
        ...state,
        isManagement: actions.payload,
      };
    }
    case UPDATE_PROFILE: {
      return {
        ...state,
        profile: actions.payload,
      };
    }
    case ON_LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};

export default authReducer;
