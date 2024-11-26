import { Buildings } from '@/constants/types';
import axios from '@/interceptor';

export const fetchCanteens = async () => {
  try {
    const response = await axios.get('/items/canteens');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching canteens');
  }
};

export const fetchCanteenById = async (id: string) => {
  try {
    const response = await axios.get(`/items/canteens/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching canteen with ID: ${id}`);
  }
};

export const createCanteen = async (canteenData: any) => {
  try {
    const response = await axios.post('/items/canteens', canteenData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating canteen');
  }
};

export const updateCanteen = async (id: string, updatedData: any) => {
  try {
    const response = await axios.patch(`/items/canteens/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating canteen with ID: ${id}`);
  }
};

export const deleteCanteen = async (id: string) => {
  try {
    const response = await axios.delete(`/items/canteens/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting canteen with ID: ${id}`);
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