import AxiosInstance from "../../utils/AxiosInstance";

export const getProducts = async (params: string = "") => {
  return await AxiosInstance.get(`/products${params}`);
};

export const getProductCategories = async () => {
  return await AxiosInstance.get("/products/categories");
};
