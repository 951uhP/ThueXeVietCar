import axios from "axios";
import nProgress from "nprogress";
import { toast } from "react-toastify";
import { logoutUser } from "../redux/action/userAction";
import { store } from "../redux/store";

const instance = axios.create({
  baseURL: "http://localhost:9999/",
});

nProgress.configure({
  showSpinner: false,
  easing: "ease",
  speed: 500,
  trickle: true,
  trickleSpeed: 100,
});

//biến lưu trạng thái của refresh token
let isRefreshing = false;
let failedQueue = [];

// xử lý queue các request bị lỗi khi đang refresh-token
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
};

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    nProgress.start();

    // gắn access_token vào header Authorization
    const token = localStorage.getItem("access_token");
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    nProgress.done();
    console.log(">>> interceptor: ", response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    nProgress.done();
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const originalRequest = error.config; // Lưu lại request gốc

    // Kiểm tra nếu lỗi 401 và không phải là request refresh token
    console.log(error);

    // if (error.response?.status === 403) {
    //   originalRequest._retry = true;
    //   window.location.href = "/403";
    // }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu request đã xử lý retry

      if (!isRefreshing) {
        isRefreshing = true;

        return new Promise(async (resolve, reject) => {
          // Gửi request làm mới token
          await axios
            .get("http://localhost:8386/auth/refresh", {
              withCredentials: true,
            })
            .then((res) => {
              const access_token = res.data.data.access_token;
              localStorage.setItem("access_token", access_token); // Lưu access_token mới

              instance.defaults.headers.Authorization = `Bearer ${access_token}`; // Cập nhật header
              processQueue(null, access_token); // Tiếp tục các request bị treo
              resolve(instance(originalRequest)); // Thực hiện lại request ban đầu
            })
            .catch((err) => {
              console.log(">>error" + err);
              processQueue(err, null); // Báo lỗi cho các request trong hàng đợi

              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              localStorage.removeItem("user");

              //const dispatch = useDispatch();
              store.dispatch(logoutUser());

              toast.error("Your session are expire, please login again");
              window.location.href = "/auth";
              reject(err);
            })
            .finally(() => {
              isRefreshing = false; // Kết thúc trạng thái refresh
            });
        });
      }

      // Nếu đang refresh token, thêm request vào hàng đợi
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      });
    }
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
