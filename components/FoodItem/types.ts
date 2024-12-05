import { Foodoffers, Foods } from "@/constants/types";

export interface FoodItemProps {
  item: Foodoffers;
  // handleNavigation: (id: string, foodId: string) => void;
  handleMenuSheet: () => void;
  handleImageSheet: () => void;
  setSelectedFoodId: React.Dispatch<React.SetStateAction<string>>;
}
