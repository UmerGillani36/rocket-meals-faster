import { ProfilesMarkings } from '@/constants/types';
import { CollectionHelper } from '@/helper/collectionHelper'; // Your helper
import { ServerAPI } from '@/redux/actions/Auth/Auth'; // Your API client

export class ProfileHelper extends CollectionHelper<any> {
  constructor(client?: any) {
    super('profiles', client || ServerAPI.getClient());
  }

  async fetchProfile(queryOverride: any = {}) {
    // Default query structure
    const defaultQuery = {
      fields: [
        '*',
        'markings.*',
        'devices.*',
        'buildings_favorites.*',
        'buildings_last_visited.*',
      ],
      deep: {},
    };

    // Combine default query with overrides (if any)
    const query = { ...defaultQuery, ...queryOverride };

     // Fetch profiles from the server
     return await this.readItems(query);
  }

  async fetchProfileById(id: string, queryOverride: any = {}) {
    // Default query structure
    const defaultQuery = {
      fields: [
        '*',
        'markings.*',
        'devices.*',
        'buildings_favorites.*',
        'buildings_last_visited.*',
      ],
      deep: {},
    };

    // Combine default query with overrides (if any)
    const query = { ...defaultQuery, ...queryOverride };

    // Fetch profile by ID from the server
    return await this.readItem(id, query);
  }

  async updateProfile(profileData: any) {

    // Update profile data
    return await this.updateItem(profileData?.id, profileData);
    // return profileData;
  }
}