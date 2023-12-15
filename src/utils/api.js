import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Teachers
export const getAllTeachersAPI = () => axios.get(`${API_URL}/teachers`);
export const getTeacherByIdAPI = (id) => axios.get(`${API_URL}/teachers/${id}`);
export const createTeacherAPI = (data) => axios.post(`${API_URL}/teachers`, data);
export const updateTeacherAPI = (id, data) => axios.put(`${API_URL}/teachers/${id}`, data);
export const deleteTeacherAPI = (id) => axios.delete(`${API_URL}/teachers/${id}`);

// Student Progress
export const getAllStudentProgressAPI = () => axios.get(`${API_URL}/studentprogress`);
export const getAllStudentProgressByIdAPI = (id) => axios.get(`${API_URL}/studentprogress/${id}`);
export const updateStudentProgressByIdAPI = (id, data) => axios.put(`${API_URL}/studentprogress/${id}`, data);
export const createStudentProgressAPI = (data) => axios.post(`${API_URL}/studentprogress`, data);
export const deleteStudentProgressAPI = (id) => axios.delete(`${API_URL}/studentprogress/${id}`);

// Resource Management
export const getAllResourcesAPI = () => axios.get(`${API_URL}/resources`);
export const getAllResourcesByIdAPI = (id) => axios.get(`${API_URL}/resources/${id}`);
export const updateResourcesByIdAPI = (id, data) => axios.put(`${API_URL}/resources/${id}`, data);
export const createResourcesAPI = (data) => axios.post(`${API_URL}/resources`, data);
export const deleteResourcesAPI = (id) => axios.delete(`${API_URL}/resources/${id}`);

// Coaches
export const getAllCoachesAPI = () => axios.get(`${API_URL}/coaches`);
export const getAllCoachesByIdAPI = (id) => axios.get(`${API_URL}/coaches/${id}`);
export const updateCoachesByIdAPI = (id, data) => axios.put(`${API_URL}/coaches/${id}`, data);
export const createCoachesByIdAPI = (data) => axios.post(`${API_URL}/coaches`, data);
export const deleteCoachesByIdAPI = (id) => axios.delete(`${API_URL}/coaches/${id}`);

// Coach-Teacher Interactions
export const getAllInteractionsAPI = () => axios.get(`${API_URL}/interactions`);
export const getAllInteractionsByIdAPI = (id) => axios.get(`${API_URL}/interactions/${id}`);
export const updateInteractionsAPI = (id, data) => axios.put(`${API_URL}/interactions/${id}`, data);
export const createInteractionsAPI = (data) => axios.post(`${API_URL}/interactions`, data);
export const deleteInteractionsAPI = (id) => axios.delete(`${API_URL}/interactions/${id}`);
