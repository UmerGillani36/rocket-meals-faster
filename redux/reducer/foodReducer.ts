import { DELETE_FOOD_FEEDBACK_LOCAL, DELETE_OWN_FOOD_FEEDBACK_LABEL_ENTRIES_LOCAL, UPDATE_FOOD_FEEDBACK_LABELS, UPDATE_FOOD_FEEDBACK_LOCAL, UPDATE_MARKINGS, UPDATE_OWN_FOOD_FEEDBACK, UPDATE_OWN_FOOD_FEEDBACK_LABEL_ENTRIES, UPDATE_OWN_FOOD_FEEDBACK_LABEL_ENTRIES_LOCAL } from '@/redux/Types/types';
  
  const initialState = {
    foodFeedbackLabels: [],
    ownFoodFeedbacks: [],
    ownfoodFeedbackLabelEntries: [],
    markings: [],
  };
  
  const foodReducer = (state = initialState, actions: any) => {
    switch (actions.type) {
      case UPDATE_FOOD_FEEDBACK_LABELS: {
        return {
          ...state,
          foodFeedbackLabels: actions.payload,
        };
      }
      case UPDATE_OWN_FOOD_FEEDBACK: {
        return {
          ...state,
          ownFoodFeedbacks: actions.payload,
        };
      }
      case UPDATE_FOOD_FEEDBACK_LOCAL: {
        let match = false;
        const feedbacks = state.ownFoodFeedbacks.map((feedback: any) => {
            if (feedback.food_id === actions.payload.food_id) {
              match = true;
                return actions.payload;
            }
            return feedback;
        }
        );
        if (!match) {
            feedbacks.push(actions.payload);
        }
        return {
            ...state,
            ownFoodFeedbacks: feedbacks,
        };
    }
    case DELETE_FOOD_FEEDBACK_LOCAL: {
        const feedbacks = state.ownFoodFeedbacks.filter((feedback: any) => feedback.id !== actions.payload);
        return {
            ...state,
            ownFoodFeedbacks: feedbacks,
        };
    }
    case UPDATE_OWN_FOOD_FEEDBACK_LABEL_ENTRIES: {
        return {
            ...state,
            ownfoodFeedbackLabelEntries: actions.payload,
        };
    }
    case UPDATE_OWN_FOOD_FEEDBACK_LABEL_ENTRIES_LOCAL: {
        let match = false;
        const entries = state.ownfoodFeedbackLabelEntries.map((entry: any) => {
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
            ownfoodFeedbackLabelEntries: entries,
        };
    }
    case DELETE_OWN_FOOD_FEEDBACK_LABEL_ENTRIES_LOCAL: {
      const entries = state.ownfoodFeedbackLabelEntries.filter((feedback: any) => feedback.id !== actions.payload);
      return {
          ...state,
          ownfoodFeedbackLabelEntries: entries,
      };
  }
  case UPDATE_MARKINGS: {
    return {
        ...state,
        markings: actions.payload,
    };
}
      default:
        return state;
    }
  };
  
  export default foodReducer;
  