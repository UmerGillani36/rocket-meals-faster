import {
    SET_BUILDINGS,
    SET_BUSINESS_HOURS,
    SET_CANTEENS,
    SET_FOOD_OFFERS,
    SET_SELECTED_CANTEEN,
    SET_SELECTED_CANTEEN_FOOD_OFFERS,
  } from '@/redux/Types/types';
  
  const initialState = {
    canteens: [],
    buildings: [],
    selectedCanteen: null,
    foodOffers: [],
    selectedCanteenFoodOffers: [],
    businessHours: [],
  };
  
  const canteensReducer = (state = initialState, actions: any) => {
    switch (actions.type) {
      case SET_CANTEENS: {
        return {
          ...state,
          canteens: actions.payload,
        };
      }
      case SET_BUILDINGS: {
        return {
          ...state,
          buildings: actions.payload,
        };
      }
      case SET_SELECTED_CANTEEN: {
        return {
          ...state,
          selectedCanteen: actions.payload,
        };
      }
      case SET_FOOD_OFFERS: {
        return {
          ...state,
          foodOffers: actions.payload,
        };
      }
      case SET_SELECTED_CANTEEN_FOOD_OFFERS: {
        return {
          ...state,
          selectedCanteenFoodOffers: actions.payload,
        };
      }
      case SET_BUSINESS_HOURS: {
        return {
          ...state,
          businessHours: actions.payload,
        };
      }
      default:
        return state;
    }
  };
  
  export default canteensReducer;
  