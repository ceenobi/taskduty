import { connect } from "./connect";
const token = JSON.parse(localStorage.getItem("accesstoken"));

export const login = async (username, password) => {
  return connect.post("/user/login", { username, password });
};
export const register = async (username, email, password) => {
  return connect.post("/user/register", { username, email, password });
};

export const authenticateUser = async () => {
  return connect.get("/user", {
    headers: { Authorization: `Bearer: ${token}` },
  });
};

export const createTask = async (title, description, tags) => {
  return connect.post(
    "/task/create-task",
    { title, description, tags },
    {
      headers: { Authorization: `Bearer: ${token}` },
    }
  );
};

export const getMyTask = async () => {
  return connect.get("/task/get", {
    headers: { Authorization: `Bearer: ${token}` },
  });
};
export const getAllTask = async () => {
  return connect.get("/task/");
};

export const deleteMyTask = async (id) => {
  return connect.delete(`task/${id}`, {
    headers: { Authorization: `Bearer: ${token}` },
  });
};

export const updateMyTask = async (id, title, description, tags) => {
  return connect.patch(
    `task/${id}`,
    { title, description, tags },
    {
      headers: { Authorization: `Bearer: ${token}` },
    }
  );
};
