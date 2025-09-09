// src/services/legalAidService.js
import api from './api';

export const submitLegalAid = (payload) => api.post('/legalAid', payload);
export const fetchLegalAids  = () => api.get('/legalAid');
export const deleteLegalAid  = (id) => api.delete(`/legalAid/${id}`);
