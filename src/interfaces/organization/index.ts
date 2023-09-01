import { DestinationInterface } from 'interfaces/destination';
import { WidgetInterface } from 'interfaces/widget';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  destination?: DestinationInterface[];
  widget?: WidgetInterface[];
  user?: UserInterface;
  _count?: {
    destination?: number;
    widget?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
