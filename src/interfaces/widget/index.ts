import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface WidgetInterface {
  id?: string;
  name: string;
  description?: string;
  style_settings: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface WidgetGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  style_settings?: string;
  organization_id?: string;
}
