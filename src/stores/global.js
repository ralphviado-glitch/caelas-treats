import { defineStore } from "pinia";
import { reactive } from "vue";
import axios from "axios";

export const useGlobalStore = defineStore("global", () => {
  let user = reactive({
    token: localStorage.getItem("token"),
    email: null,
    firstName: null,
    lastName: null,
    mobileNo: null,
    isAdmin: null,
    isLoading: false,
  });


  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    Object.assign(user, JSON.parse(storedUser));
  }

  async function getUserDetails(token) {
    if (!token) {
      clearUser();
      return;
    }

    user.isLoading = true;

    try {
      const { data } = await axios.get("http://localhost:4000/users/details", {
        headers: { Authorization: `Bearer ${token}` },
      });

      user.email = data.email;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.mobileNo = data.mobileNo;
      user.isAdmin = data.isAdmin;
      user.token = token;

      
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Error fetching user details:", error);
      clearUser();
    } finally {
      user.isLoading = false;
    }
  }

  function clearUser() {
    user.token = null;
    user.email = null;
    user.firstName = null;
    user.lastName = null;
    user.mobileNo = null;
    user.isAdmin = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  function updateUserProfile(updatedData) {
    Object.assign(user, updatedData);
    localStorage.setItem("user", JSON.stringify(user));
  }

  return {
    user,
    getUserDetails,
    clearUser,
    updateUserProfile,
  };
});
