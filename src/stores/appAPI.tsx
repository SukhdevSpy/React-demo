import AxiosInstance from "../utils/AxiosInstance";

export const signin = async (data : any) => {
  return await AxiosInstance.post("/auth/login", data);
};

export const getProfile = async () => {
  return await AxiosInstance.get("/auth/me");
};

export const getDashboard = async () => {
  return await AxiosInstance.get("/dashboard");
};
