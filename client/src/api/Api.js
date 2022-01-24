import axios from "axios";

let url;

if (process.env.NODE_ENV === "production") {
  url = "";
}
if (process.env.NODE_ENV === "development") {
  url = "http://localhost:9000";
}

const api = axios.create({
  baseURL: url,
});
export const getUsers = async () => {
  try {
    let { data } = await api.get("/users");
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
export const getUser = async (id) => {
  try {
    const { data } = await api.get(`/users/${id}`);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
export const updateUser = async (id, obj) => {
  try {
    const { data } = await api.put(`/users/${id}`, obj);
    return data;
  } catch (e) {
    console.log(e.message);
    console.dir(e);
  }
};
export const creatUser = async (obj) => {
  try {
    let { data } = await api.post(`/users`, obj);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
export const deleteUser = async (id) => {
  try {
    let { data } = await api.delete(`/users/${id}`);
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
// import axios from "axios";

// let url;

// if (process.env.NODE_ENV === "production") {
//   url = "";
// }
// if (process.env.NODE_ENV === "development") {
//   url = "http://localhost:9000";
// }

// export default axios.create({
//   baseURL: url,
// });
