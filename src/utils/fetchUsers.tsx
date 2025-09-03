import axios from "axios";
import { User } from "../types/User";

export const fetchUsers = async (): Promise<User[]> => {
  const res = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users");
  return res.data;
};

export const fetchUserById = async (id: string): Promise<User> => {
  const res = await axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
  return res.data;
};
