import axiosInstance from "./axiosInstance";

export const notificationService = {
  // Get unread message count
  getUnreadCount: async () => {
    try {
     
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
