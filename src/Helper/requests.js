/* eslint-disable */
import { client, clientPrivate } from './api.js';

export const getAllTodos = async axiosPrivate => {
  const { data } = await clientPrivate.get('/todo/', axiosPrivate);
  return data;
};

export const login = async postData => {
  const { data } = await client.post('/login', postData);
  return data;
};

export const register = async postData => {
  const { data } = await client.post('/register', postData);
  return data;
};

export const logout = async axiosPrivate => {
  const { data } = await clientPrivate.post('/logout', axiosPrivate);
  return data;
};

export const postData = async (axiosPrivate, postData) => {
  const { data } = await clientPrivate.post('/todo/', axiosPrivate, postData);
  return data;
};

export const deleteData = async (id, axiosPrivate) => {
  const { data } = await clientPrivate.delete(`/todo/${id}/`, axiosPrivate);
  return data;
};

export const editData = async (category, id, axiosPrivate, request) => {
  const { data } = await clientPrivate.patch(
    `/todo/${id}/`,
    axiosPrivate,
    request,
  );
  return data;
};
