import {
  DELETE_OWN_CANTEEN_FEEDBACK_LABEL_ENTRIES,
    SET_BUILDINGS,
    SET_BUSINESS_HOURS,
    SET_CANTEENS,
    SET_CANTEEN_FEEDBACK_LABELS,
    SET_FOOD_OFFERS,
    SET_OWN_CANTEEN_FEEDBACK_LABEL_ENTRIES,
    SET_SELECTED_CANTEEN,
    SET_SELECTED_CANTEEN_FOOD_OFFERS,
    SET_SELECTED_CANTEEN_FOOD_OFFERS_LOCAL,
    UPDATE_OWN_CANTEEN_FEEDBACK_LABEL_ENTRIES,
  } from '@/redux/Types/types';
  
  const initialState = {
    canteens: [],
    buildings: [],
    selectedCanteen: null,
    foodOffers: [],
    selectedCanteenFoodOffers: [],
    canteenFoodOffers: [],
    businessHours: [],
    canteenFeedbackLabels: [],
    ownCanteenFeedBackLabelEntries: [],
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
      case SET_SELECTED_CANTEEN_FOOD_OFFERS_LOCAL: {
        return {
          ...state,
          canteenFoodOffers: actions.payload,
        };
      }
      case SET_BUSINESS_HOURS: {
        return {
          ...state,
          businessHours: actions.payload,
        };
      }
      case SET_CANTEEN_FEEDBACK_LABELS: {
        return {
          ...state,
          canteenFeedbackLabels: actions.payload,
        };
      }
      case SET_OWN_CANTEEN_FEEDBACK_LABEL_ENTRIES: {
        return {
          ...state,
          ownCanteenFeedBackLabelEntries: actions.payload,
        };
      }
      case UPDATE_OWN_CANTEEN_FEEDBACK_LABEL_ENTRIES: {
        let match = false;
        const entries = state.ownCanteenFeedBackLabelEntries.map((entry: any) => {
            if (entry.label === actions.payload.label) {
              match = true;
                return actions.payload;
            }
            return entry;
        }
        );
        if (!match) {
            entries.push(actions.payload);
        }
        return {
            ...state,
            ownCanteenFeedBackLabelEntries: entries,
        };
    }
    case DELETE_OWN_CANTEEN_FEEDBACK_LABEL_ENTRIES: {
      const entries = state.ownCanteenFeedBackLabelEntries.filter((feedback: any) => feedback.id !== actions.payload);
      return {
          ...state,
          ownCanteenFeedBackLabelEntries: entries,
      };
  }
      default:
        return state;
    }
  };
  
  export default canteensReducer;
  