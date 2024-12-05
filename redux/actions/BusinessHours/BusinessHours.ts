import { CollectionHelper } from '@/helper/collectionHelper'; // Reusing the CollectionHelper
import { ServerAPI } from '@/redux/actions/Auth/Auth'; // API client

export class BusinessHoursHelper extends CollectionHelper<any> {
  constructor(client?: any) {
    // Pass the collection name and API client
    super('businesshours', client || ServerAPI.getClient());
  }

  // Fetch all canteens with optional query overrides
  async fetchBusinessHours(queryOverride: any = {}) {
    const defaultQuery = {
      fields: [' * '],
      limit: -1, // Fetch all
    };

    const query = { ...defaultQuery, ...queryOverride };
    return await this.readItems(query);
  }

  // Fetch a specific canteen by ID
  async fetchBusinessHoursById(id: string, queryOverride: any = {}) {
    const defaultQuery = {
      fields: ['*'],
    };

    const query = { ...defaultQuery, ...queryOverride };
    return await this.readItem(id, query);
  }

  // Create a new canteen
  async createBusinessHours(canteenData: any) {
    return await this.createItem(canteenData);
  }

  // Update an existing canteen
  async updateBusinessHours(id: string, updatedData: any) {
    return await this.updateItem(id, updatedData);
  }

  // Delete a canteen
  async deleteBusinessHours(id: string) {
    return await this.deleteItem(id);
  }
}