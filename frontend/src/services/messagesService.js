import axiosInstance from "./axiosInstance";
import { BASE_URL } from "../config/api";


// Send anonymous message to a user via their secret link
export const sendMessage = async (secretLink, messageText) => {
  try {
    const response = await axiosInstance.post(`/message/send/${secretLink}/`, {
      message: messageText,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all messages for authenticated user
export const getMessages = async (url = null, params = {}) => {
  try {
    // If a full pagination URL is provided (next/previous), use it directly
    const response = await axiosInstance.get(url || "/messages/", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a message
export const deleteMessage = async (id) => {
  try {
    const response = await axiosInstance.delete(`/message/${id}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Mark message as read
export const markAsRead = async (id) => {
  try {
    const response = await axiosInstance.patch(`/message/${id}/`, {
      is_read: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


