import api from './axios';

/**
 * Ride API Service
 * All ride-related API calls
 */
export const rideApi = {
  /**
   * Create a new ride offer
   * POST /api/rides/
   * @param {Object} rideData - Ride data matching RideCreate schema
   * @returns {Promise} - Created ride response
   */
  createRide: async (rideData) => {
    try {
      const response = await api.post(`rides/`, rideData);
      return response.data;
    } catch (error) {
      console.error('Error creating ride:', error);
      throw error;
    }
  },

}

export default rideApi;