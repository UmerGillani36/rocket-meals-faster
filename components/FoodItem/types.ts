import { Foodoffers, Foods, FoodoffersMarkings } from "@/constants/types";

export interface FoodItemProps {
  item: Foodoffers;
  // handleNavigation: (id: string, foodId: string) => void;
  handleMenuSheet: () => void;
  handleImageSheet: () => void;
  handleEatingHabitsSheet: () => void;
  // setItemMarkings: React.Dispatch<React.SetStateAction<FoodoffersMarkings[]>>;
  setSelectedFoodId: React.Dispatch<React.SetStateAction<string>>;
}
