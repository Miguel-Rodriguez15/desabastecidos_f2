import axios, { AxiosResponse } from "axios";

const API_URL = import.meta.env.VITE_APP_API_BASE_URL;
const token = localStorage.getItem("token");

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const fetchData = async (endpoint: string) => {
  try {
    const response = await axiosInstance.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the data!", error);
    localStorage.removeItem("token");
    return [];
  }
};
export const uploadExcelData = async (jsonDataWithIdUser: any) => {
  try {
    const response = await axiosInstance.post("/excel", jsonDataWithIdUser);
    return response.data;
  } catch (error) {
    if (error) {
      console.error("Error uploading file:");
    } else {
      console.error("Error uploading file:");
    }
    localStorage.removeItem("token");
    throw error;
  }
};

export const signIn = async (
  username: string,
  password: string
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });

    if (response.status === 200) {
      const { access_token, user } = response.data;
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));
      return response;
    } else {
      throw new Error("Fallo al autenticar");
    }
  } catch (error) {
    localStorage.removeItem("token");

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Error desconocido al iniciar sesión";
      console.error("Error al intentar iniciar sesión:", errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error("Error al intentar iniciar sesión:", error);
      throw error;
    }
  }
};

export default axiosInstance;
