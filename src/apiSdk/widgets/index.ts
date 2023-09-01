import axios from 'axios';
import queryString from 'query-string';
import { WidgetInterface, WidgetGetQueryInterface } from 'interfaces/widget';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getWidgets = async (query?: WidgetGetQueryInterface): Promise<PaginatedInterface<WidgetInterface>> => {
  const response = await axios.get('/api/widgets', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createWidget = async (widget: WidgetInterface) => {
  const response = await axios.post('/api/widgets', widget);
  return response.data;
};

export const updateWidgetById = async (id: string, widget: WidgetInterface) => {
  const response = await axios.put(`/api/widgets/${id}`, widget);
  return response.data;
};

export const getWidgetById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/widgets/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteWidgetById = async (id: string) => {
  const response = await axios.delete(`/api/widgets/${id}`);
  return response.data;
};
