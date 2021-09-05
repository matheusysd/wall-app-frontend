import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

export const login = async (email, password) => {
  try {
    const { data, status } = await api.post("/user/login", { email, password });

    return { data, status };
  } catch (error) {
    return {
      message: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const createUser = async (userData) => {
  try {
    const { data, status } = await api.post("/user/register", { ...userData });

    return { data, status };
  } catch (error) {
    return {
      data: error.response.data,
      status: error.response.status,
    };
  }
};

export const getPosts = async () => {
  try {
    const { data, status } = await api.get("/post");
    return { data, status };
  } catch (error) {
    return {
      data: error.response.data,
      status: error.response.status,
    };
  }
};

export const createPost = async (postData, token) => {
  try {
    const { data, status } = await api.post(
      "/post",
      { ...postData },
      { headers: { Authorization: token } }
    );

    return { data, status };
  } catch (error) {
    return {
      data: error.response.data,
      status: error.response.status,
    };
  }
};
