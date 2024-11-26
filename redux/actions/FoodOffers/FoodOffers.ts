import { Buildings } from '@/constants/types';
import axios from '@/interceptor';

export const fetchFoodOffers = async () => {
  try {
    const response = await axios.get('/items/foodoffers', {
        params: {
            fields: '*.*',
            limit: -1
        }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching Food Offers');
  }
};

export const fetchFoodOffersByCanteen = async (canteenId: string) => {
    try {
      const response = await axios.get('/items/foodoffers', {
        params: {
          fields: '*.*',       // Fetch all fields, including related ones
          limit: -1,           // Remove limit to fetch all results
          filter: {
            canteen: {
              _eq: canteenId   // Filter where "canteen" equals the provided ID
            }
          }
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Error fetching Food Offers');
    }
  };
  

export const fetchFood = async (id: string) => {
  try {
    const response = await axios.get(`/items/canteens/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching canteen with ID: ${id}`);
  }
};

export const fetchBuildings = async () => {
    try {
        const response = await axios.get('/items/buildings?fields=*&limit=-1');
        return response.data;
      } catch (error) {
        throw new Error(`Error Fetching Buildings`);
      }
}