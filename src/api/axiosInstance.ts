import axios from 'axios';
import { UserProps, UsersData } from '../interfaces/User';

export const axiosInstance = axios.create({
  baseURL: 'https://dry-savannah-76665.herokuapp.com',
});

export async function getUsers() {
  const { data } = await axiosInstance.get<UsersData[]>('users');

  return data;
}

export async function getUserById(id: string) {
  const { data } = await axiosInstance.get<UsersData>(`users/${id}`);

  return data;
}

export async function createUser(body: UserProps) {
  const { data } = await axiosInstance.post('users', body);

  return data;
}

export async function deleteUser(id: string) {
  const { data } = await axiosInstance.delete<UsersData>(`users/${id}`);

  return data;
}

export async function updateUser(id: string, body: UserProps) {
  const { data } = await axiosInstance.patch(`users/${id}`, body);

  return data;
}
