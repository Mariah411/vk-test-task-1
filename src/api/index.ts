import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const getPage = async (page = 1, options = {}) => {
  const response = await api.get(`/posts?_page= ${page}`, options);
  return response.data;
};
