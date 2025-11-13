import { defineStore } from "pinia";
import { reactive } from "vue";
import api from "../api"; // use your api instance (handles baseURL + token)


export const useGlobalStore = defineStore("global", () => {

  const user = reactive({
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
  user.isLoading = true;

  if (!token) {
    clearUser();
    user.isLoading = false;
    return;
  }

  try {
    const res = await api.get("/users/details");
    const data = res.data;

    console.log("[getUserDetails] server response:", data);

    const userData = data.user || data;

    user.email = userData.email || null;
    user.firstName = userData.firstName || null;
    user.lastName = userData.lastName || null;
    user.mobileNo = userData.mobileNo || null;

    user.isAdmin =
      userData.isAdmin === true ||
      userData.isAdmin === "true" ||
      userData.isAdmin === 1;

    user.token = token;

    const plainUser = {
      token: user.token,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      mobileNo: user.mobileNo,
      isAdmin: user.isAdmin,
    };

    localStorage.setItem("user", JSON.stringify(plainUser));

    console.log("[getUserDetails] user.isAdmin:", user.isAdmin);
  } catch (error) {
    console.error("[getUserDetails] Error fetching user details:", error);
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

