import axios from 'axios';
import queryString from 'query-string';
import { TravelOptionInterface, TravelOptionGetQueryInterface } from 'interfaces/travel-option';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTravelOptions = async (
  query?: TravelOptionGetQueryInterface,
): Promise<PaginatedInterface<TravelOptionInterface>> => {
  const response = await axios.get('/api/travel-options', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTravelOption = async (travelOption: TravelOptionInterface) => {
  const response = await axios.post('/api/travel-options', travelOption);
  return response.data;
};

export const updateTravelOptionById = async (id: string, travelOption: TravelOptionInterface) => {
  const response = await axios.put(`/api/travel-options/${id}`, travelOption);
  return response.data;
};

export const getTravelOptionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/travel-options/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTravelOptionById = async (id: string) => {
  const response = await axios.delete(`/api/travel-options/${id}`);
  return response.data;
};
