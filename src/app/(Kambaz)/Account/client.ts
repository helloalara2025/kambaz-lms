// // client functions to display on React Frontend 
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

// Create user
export const createUser = async (user: any) => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};

// findAllUsers function to send a GET request to server and await for server's response conaining array of users in data properrty. 
export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
}
// encodes the role in the query string of URL
export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);
  return response.data;
}
// encodes a name in query str that the server uses to filter user by first and lastName.
export const findUsersByPartialName = async (name: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
  return response.data;
};

// Client function to find user by id
export const findUserById = async (id: string) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};


export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data;
};

export const fetchEnrollments = async (userId: string) => {
  const response = await axiosWithCredentials.get(
    `${USERS_API}/${userId}/enrollments`
  );
  return response.data;
};

export const deleteUser
  = async (userId: string) => {
    const response = await
      axios.delete( `${USERS_API}/${userId}` );
    return response.data;
};
