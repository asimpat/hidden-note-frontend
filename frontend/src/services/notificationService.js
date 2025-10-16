import axiosInstance from "./axiosInstance";

export const notificationService = {
  // Get unread message count
  getUnreadCount: async () => {
    try {
      // const response = await axiosInstance.get("/messages/unread-count/");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
