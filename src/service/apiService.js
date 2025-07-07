import { json } from "react-router-dom";
import axios from "../utils/axiosCustomize";

const postLogin = (userEmail, userPassword) => {
  axios.defaults.withCredentials = true;
  return axios.post(
    `auth/login`,
    { username: userEmail, password: userPassword },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const postLogout = () => {
  axios.defaults.withCredentials = true;
  return axios.post(
    `auth/logout`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
const postRegister = (
  userEmail,
  userPassword,
  userName,
  userPhone,
  userRole,
  userWallet,
  userDateOfBirth,
  userNationalIdNo,
  userAddress,
  userDrivingLicense,
) => {
  return axios.post(`users/register`, {
    email: userEmail,
    name: userName,
    password: userPassword,
    phoneNo: userPhone,
    dateOfBirth: userDateOfBirth,
    nationalIdNo: userNationalIdNo,
    address: userAddress,
    drivingLicense: userDrivingLicense,
    role: { name: userRole } ,
    wallet: userWallet,
  });
};

const refreshToken = () => {
  axios.defaults.withCredentials = true;
  return axios.get(`auth/refresh`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getUserCars = () => {
  axios.defaults.withCredentials = true;
  return axios.get(`cars/user-cars`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getUserCarsPaginate = (page, size) => {
  axios.defaults.withCredentials = true;
  return axios.get(`cars/user-cars?page=${page}&size=${size}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const getUsersDetail = (userId) => {
  if (!userId) {
    throw new Error("userId is required to fetch car details");
  }

  try {
    axios.defaults.withCredentials = true;
    console.log(`users/${userId}`);
    const response = axios.get(`users/${userId}`, {
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    return response;
  } catch (error) {
    console.error("Error in getUserDetail:", error.message);
    throw error;
  }
};
const updateProfile = (userId, basicInfo, details, newPassword = null) => {
  const payload = {
    name: basicInfo.name,
    dateOfBirth: basicInfo.dateOfBirth,
    phoneNo: basicInfo.phoneNo,
    email: basicInfo.email,
    nationalIdNo: details.nationalIdNo,
    drivingLicense: details.drivingLicense,
    address: details.address,
  };

  if (newPassword) {
    payload.password = newPassword;
  }

  return axios.put(`users/update/${userId}`, payload);
};
const confirmDeposit = async (bookingId) => {
  try {
    axios.defaults.withCredentials = true;
    const url = `/bookings/${bookingId}/confirm-deposit`;
    const response = await axios.patch(url);
    return response.data;
  } catch (error) {
    console.error("Error in API confirmDeposit:", error);
    throw error;
  }
};
const confirmPickup = async (bookingId) => {
  try {
    axios.defaults.withCredentials = true;
    const url = `bookings/${bookingId}/confirm-pickup`;
    const response = await axios.patch(url);
    return response.data;
  } catch (error) {
    console.error("Error in API confirmDeposit:", error);
    throw error;
  }
};
const confirmRefund = async (bookingId) => {
  try {
    axios.defaults.withCredentials = true;
    const url = `bookings/${bookingId}/confirm-refund`;
    const response = await axios.patch(url);
    return response.data;
  } catch (error) {
    console.error("Error in API confirmDeposit:", error);
    throw error;
  }
};
const completeBooking = async (bookingId, paymentMethod) => {
  try {
    axios.defaults.withCredentials = true;
    const url = `/bookings/complete/${bookingId}?paymentMethod=${paymentMethod}`;
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    console.error("Error in API completeBooking:", error);
    throw error;
  }
};
const refundBooking = async (bookingId, paymentMethod) => {
  try {
    axios.defaults.withCredentials = true;
    const url = `/bookings/refund/${bookingId}?paymentMethod=${paymentMethod}`;
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    console.error("Error in API completeBooking:", error);
    throw error;
  }
};

const checkEmailExistAPI = async (email) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(`/users/check-email?email=${email}`);
    return response.data;
  } catch (error) {
    console.error("Error in checkEmailExistAPI:", error.message);
    throw error;
  }
};
const getBookingDetail = (bookingId) => {
  if (!bookingId) {
    throw new Error("bookingId is required to fetch car details");
  }

  try {
    axios.defaults.withCredentials = true;
    console.log(`/bookings/booking-detail/${bookingId}`);
    const response = axios.get(`/bookings/booking-detail/${bookingId}`);
    return response;
  } catch (error) {
    console.error("Error in get booking detail:", error.message);
    throw error;
  }
};

const updateCarDetail = (carId, metadata, images) => {
  const formData = new FormData();

  formData.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    })
  );
  const imagesArray = Object.values(images).filter((file) => file !== null);

  if (Array.isArray(imagesArray)) {
    imagesArray.forEach((file) => {
      formData.append("images", file);
    });
  } else {
    console.error("carImages is not an array:", images);
    return;
  }

  return axios.put(`/cars/update/${carId}`, formData, {
    withCredentials: true,
  });
};

const getUserCarsDetail = (carId) => {
  if (!carId) {
    throw new Error("carId is required to fetch car details");
  }

  try {
    axios.defaults.withCredentials = true;
    console.log(`cars/user-cars/${carId}`);
    const response = axios.get(`cars/user-cars/${carId}`, {
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    return response;
  } catch (error) {
    console.error("Error in getUserCarsDetail:", error.message);
    throw error;
  }
};
const getTransaction = (userId) => {
  if (!userId) {
    throw new Error("userId is required to fetch car details");
  }

  try {
    axios.defaults.withCredentials = true;
    console.log(`/users/transactions/${userId}`);
    const response = axios.get(`/users/transactions/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error in getTransaction:", error.message);
    throw error;
  }
};
const cancelBooking = (bookingId) => {
  if (!bookingId) {
    throw new Error("bookingId is required to cancel booking");
  }
  try {
    axios.defaults.withCredentials = true;
    console.log(`/cancel/${bookingId}`);
    const response = axios.post(
      `bookings/cancel/${bookingId}`,
      {}, // body rỗng
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (e) {
    console.error("Error in cancelBooking:", e.message);
    throw e;
  }
};

const postAddNewCar = (metadata, documents, images) => {
  axios.defaults.withCredentials = true;

  const formData = new FormData();
  const imagesArray = Object.values(images).filter((file) => file !== null);

  formData.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    })
  );
  console.log(JSON.stringify(metadata));

  if (Array.isArray(documents)) {
    documents.forEach((file) => {
      formData.append("documents", file);
      console.log("tao la document");
      console.log(file);
    });
  } else {
    console.error("carImages is not an array:", images);
    return;
  }

  if (Array.isArray(imagesArray)) {
    imagesArray.forEach((file) => {
      formData.append("images", file);
    });
  } else {
    console.error("carImages is not an array:", images);
    return;
  }

  return axios.post(`cars/create`, formData, {
    withCredentials: true,
  });
};

const postANewBooking = (carId, bookingInfo) => {
  axios.defaults.withCredentials = true;

  const formData = new FormData();
  formData.append(
    "bookingInfo",
    new Blob([JSON.stringify(bookingInfo)], {
      type: "application/json",
    })
  );

  // Không gửi driver nữa

  return axios.post(`bookings/new-booking?carId=${carId}`, formData, {
    withCredentials: true,
  });
};

const getSearchCarsPaginate = (
  pickupDate,
  dropoffDate,
  location,
  page,
  size
) => {
  axios.defaults.withCredentials = true;
  return axios.get(
    `cars/search?startDate=${pickupDate}&endDate=${dropoffDate}&address=${location}&page=${page}&size=${size}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const postConfirmBooking = (bookingId, paymentMethod) => {
  axios.defaults.withCredentials = true;
  return axios.post(
    `bookings/confirm/${bookingId}?paymentMethod=${paymentMethod}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
const postConfirmPayment = (bookingId) => {
  axios.defaults.withCredentials = true;
  return axios.patch(`bookings/${bookingId}/confirm-payment`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const postConfirmBooking2 = (bookingId, paramsObject) => {
  axios.defaults.withCredentials = true;
  return axios.post(`payment/call-back/${bookingId}`, paramsObject, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const getUsersBooking = () => {
  try {
    axios.defaults.withCredentials = true;

    const response = axios.get(`bookings/all-booking`, {});
    return response;
  } catch (error) {
    console.error("Error in getBooking:", error.message);
    throw error;
  }
};
const getOwnersBooking = () => {
  try {
    axios.defaults.withCredentials = true;

    const response = axios.get(`bookings/owner-booking`, {});
    return response;
  } catch (error) {
    console.error("Error in getBooking:", error.message);
    throw error;
  }
};
export const createFeedback = (bookingId, feedback) => {
  return axios.post(`/feedbacks/create-feedback?bookingId=${bookingId}`, feedback);
};
export const checkHasFeedback = (bookingId, userId) => {
  axios.defaults.withCredentials = true;
  return axios.get(`/feedbacks/has-feedback?bookingId=${bookingId}&userId=${userId}`);
};
export const updateFeedback = (feedbackId, feedback) => {
  return axios.put(`/feedbacks/${feedbackId}`, feedback);
};
export const getFeedbackByBookingId = (bookingId) => {
  axios.defaults.withCredentials = true;
  return axios.get(`/feedbacks/by-booking-id?bookingId=${bookingId}`);
};
const getAllFeedBack = async (carId) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(`/feedbacks/all?carId=${carId}`);
    return response.data;
  } catch (error) {
    console.error("Error in getAllFeedBack:", error.message);
    throw error;
  }
};

const getAverageRating = async (carId) => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(`/feedbacks/average-rating?carId=${carId}`);
    return response.data;
  } catch (error) {
    console.error("Error in getAverageRating:", error.message);
    throw error;
  }
};


const getAllUser = async () => {
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.get(`/users`);
    // Lọc chỉ lấy user có role là RENTER
    if (response.data && Array.isArray(response.data)) {
      return response.data.filter(user => user.role?.name === "RENTER");
    }
    return [];
  } catch (error) {
    console.error("Error in getAllUser:", error.message);
    throw error;
  }
};

const deleteUser = async (userId) => {
  if (!userId) {
    throw new Error("userId is required to delete user");
  }
  try {
    axios.defaults.withCredentials = true;
    const response = await axios.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error in deleteUser:", error.message);
    throw error;
  }
};

export {
  postLogin,
  postLogout,
  postRegister,
  getUserCars,
  refreshToken,
  postAddNewCar,
  getUserCarsDetail,
  getUsersDetail,
  updateProfile,
  getTransaction,
  postANewBooking,
  getUserCarsPaginate,
  getSearchCarsPaginate,
  postConfirmBooking,
  postConfirmBooking2,
  getUsersBooking,
  cancelBooking,
  updateCarDetail,
  confirmDeposit,
  confirmPickup,
  completeBooking,
  getBookingDetail,
  getOwnersBooking,
  postConfirmPayment,
  confirmRefund,
  refundBooking,
  getAllUser,
  deleteUser,
  getAllFeedBack,
  getAverageRating,
  checkEmailExistAPI,
};
