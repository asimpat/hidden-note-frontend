import axiosInstance from "./axiosInstance";

// Fetch the current logged-in user's info
export const getUser = async () => {
  try {
    const response = await axiosInstance.get("/dashboard/");
    const user = response.data;

    if (user) {
      localStorage.setItem("dashboard", JSON.stringify(user));
    }

    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error.response?.data || error.message;
  }
};
