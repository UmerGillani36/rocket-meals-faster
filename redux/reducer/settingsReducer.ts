import { CHANGE_THEME, SET_WARNING } from '@/redux/Types/types';

const initialState = {
  theme: 'dark',
  isWarning: false,
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
    default:
      return state;
  }
};

export default settingReducer;
