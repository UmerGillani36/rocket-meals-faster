import {ON_LOGIN, ON_LOGOUT, UPDATE_LOGIN, UPDATE_MANAGEMENT} from '@/redux/Types/types';

const initialState = {
  user: {
    data: null,
    loggedIn: false,
  },
  auth: {
    access_token: '',
    refresh_token: '',
    expires: null,
    expires_at: null,
  },
  isManagement: false,
};

const authReducer = (state = initialState, actions: any) => {
  switch (actions.type) {
    case ON_LOGIN: {
      return {
        ...state,
        auth: actions.payload || state.auth,
        user: {
          data: null,
          loggedIn: true,
        },
      };
    }
    case UPDATE_LOGIN: {
      return {
        ...state,
        user: {
          data: actions.payload,
          loggedIn: true,
        },
      };
    }
    case UPDATE_MANAGEMENT: {
      return {
        ...state,
        isManagement: actions.payload,
      };
    }
    case ON_LOGOUT: {
      return {
        ...state,
        user: {
          data: null,
          loggedIn: false,
        },
        auth: {
          access_token: '',
          refresh_token: '',
          expires: null,
          expires_at: null,
        },
        isManagement: false,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
