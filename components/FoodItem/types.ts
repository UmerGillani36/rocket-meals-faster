export interface FoodItemProps {
  item: {
    id: number;
    foodName: string;
    image: string;
    logo: string;
    price: number;
  };
  handleNavigation: () => void;
}
