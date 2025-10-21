

export const notificationService = {
  getUnreadCount: async () => {
    try {
     
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
