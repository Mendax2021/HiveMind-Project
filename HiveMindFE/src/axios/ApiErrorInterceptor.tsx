import axios from "axios";
import toast from "react-hot-toast";
import Icon from "../shared/components/Icon";

export const API = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
});

//interceptor per standardizzzare gli errori del BE
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const formattedError = {
      status: error.response?.status,
      description: error.response?.data.description,
    };
    toast.custom(
      <div className="toaster-animation rounded-xl flex bg-danger items-center p-2 gap-2">
        <div>
          <Icon className="text-2xl" icon="bi-x-circle" />
        </div>
        <div className="toaster-animation flex flex-col items-center pr-3">
          <p>{`${formattedError.description} {Error ${formattedError.status}}`}</p>
        </div>
      </div>,
      { duration: 1000 }
    );
    return Promise.reject(formattedError);
  }
);
