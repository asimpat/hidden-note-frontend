import axiosInstance from "./axiosInstance";

// Fetch the current logged-in user's info (including secret_link)
export const getUser = async () => {
  try {
    const response = await axiosInstance.get("/users/");
    // Your backend returns { count, next, previous, results: [ { userObject } ] }
    const user = response.data?.results?.[0];

    // Save user data in localStorage for reuse
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error.response?.data || error.message;
  }
};
