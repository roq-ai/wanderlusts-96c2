import axios from 'axios';
import queryString from 'query-string';
import { DestinationInterface, DestinationGetQueryInterface } from 'interfaces/destination';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getDestinations = async (
  query?: DestinationGetQueryInterface,
): Promise<PaginatedInterface<DestinationInterface>> => {
  const response = await axios.get('/api/destinations', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createDestination = async (destination: DestinationInterface) => {
  const response = await axios.post('/api/destinations', destination);
  return response.data;
};

export const updateDestinationById = async (id: string, destination: DestinationInterface) => {
  const response = await axios.put(`/api/destinations/${id}`, destination);
  return response.data;
};

export const getDestinationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/destinations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDestinationById = async (id: string) => {
  const response = await axios.delete(`/api/destinations/${id}`);
  return response.data;
};
